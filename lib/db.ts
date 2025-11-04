// lib/db.ts
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

// This prevents this code from being imported on the client side
export const dynamic = "force-dynamic";

// Mark this file as server-only
export const runtime = "nodejs";

function toId(id: any) {
  // We will keep IDs as strings in the returned objects. Internally, when matching
  // against MongoDB ObjectId values, accept string ObjectId values and convert.
  if (!id) return id;
  try {
    return typeof id === "string" && ObjectId.isValid(id) ? new ObjectId(id) : id;
  } catch (e) {
    return id;
  }
}

function mapId(doc: any) {
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { id: _id ? String(_id) : undefined, ...rest };
}

async function usersCollection() {
  const db = await getDb();
  return db.collection("users");
}

async function cryptoCollection() {
  const db = await getDb();
  return db.collection("cryptoData");
}

async function coinCollection() {
  const db = await getDb();
  return db.collection("coinData");
}

async function chartCollection() {
  const db = await getDb();
  return db.collection("chartData");
}

export const db = {
  user: {
    async findUnique({ where }: any) {
      const col = await usersCollection();
      if (where?.email) {
        const doc = await col.findOne({ email: where.email });
        return mapId(doc);
      }
      if (where?.id) {
        const id = toId(where.id);
        const doc = await col.findOne({ _id: id });
        return mapId(doc);
      }
      return null;
    },
    async findMany({ select, orderBy }: any = {}) {
      const col = await usersCollection();
      const cursor = col.find();
      if (orderBy?.createdAt === "desc") cursor.sort({ createdAt: -1 });
      const docs = await cursor.toArray();
      const mapped = docs.map(mapId);
      if (select) {
        return mapped.map((d) => {
          const out: any = {};
          Object.keys(select).forEach((k) => {
            if (d[k] !== undefined) out[k] = d[k];
          });
          return out;
        });
      }
      return mapped;
    },
    async create({ data }: any) {
      const col = await usersCollection();
      const now = new Date();
      const toInsert = { ...data, createdAt: now, updatedAt: now };
      const result = await col.insertOne(toInsert as any);
      const created = await col.findOne({ _id: result.insertedId });
      return mapId(created);
    },
  },

  cryptoData: {
    async findUnique({ where, include }: any) {
      const col = await cryptoCollection();
      let filter: any = {};
      if (where?.userId) filter.userId = String(where.userId);
      if (where?.id) filter._id = toId(where.id);
      const doc = await col.findOne(filter);
      if (!doc) return null;
      const mapped = mapId(doc);
      if (include?.coinData) {
        const coins = await (await coinCollection()).find({ cryptoDataId: mapped.id }).toArray();
        mapped.coinData = coins.map(mapId);
      }
      if (include?.chartData) {
        const order = include.chartData.orderBy?.date === "asc" ? 1 : -1;
        const charts = await (await chartCollection()).find({ cryptoDataId: mapped.id }).sort({ date: order }).toArray();
        // convert stored dateStr or date back to Date objects
        mapped.chartData = charts.map((c: any) => {
          // chart entries may store date as ISO string or Date
          const date = c.date ? new Date(c.date) : null;
          return mapId({ ...c, date });
        });
      }
      return mapped;
    },
    async create({ data, include }: any) {
      const col = await cryptoCollection();
      const coinsCol = await coinCollection();
      const chartsCol = await chartCollection();
      const now = new Date();
      const toInsert: any = { ...data, createdAt: now, updatedAt: now };
      // ensure userId is a string
      if (toInsert.userId) toInsert.userId = String(toInsert.userId);
      const result = await col.insertOne(toInsert);
      const created = await col.findOne({ _id: result.insertedId });
      const mapped = mapId(created);

      // handle nested coinData.createMany
      if (data?.coinData?.createMany?.data) {
        const docs = data.coinData.createMany.data.map((d: any) => ({
          ...d,
          cryptoDataId: mapped.id,
          createdAt: now,
          updatedAt: now,
        }));
        if (docs.length) await coinsCol.insertMany(docs as any);
        mapped.coinData = (await coinsCol.find({ cryptoDataId: mapped.id }).toArray()).map(mapId);
      }

      // handle nested chartData.createMany
      if (data?.chartData?.createMany?.data) {
        const docs = data.chartData.createMany.data.map((d: any) => ({
          ...d,
          cryptoDataId: mapped.id,
          createdAt: now,
          updatedAt: now,
        }));
        if (docs.length) await chartsCol.insertMany(docs as any);
        mapped.chartData = (await chartsCol.find({ cryptoDataId: mapped.id }).sort({ date: 1 }).toArray()).map((c: any) => mapId({ ...c, date: c.date }));
      }

      return mapped;
    },
    async update({ where, data }: any) {
      const col = await cryptoCollection();
      const filter: any = {};
      if (where?.userId) filter.userId = String(where.userId);
      if (where?.id) filter._id = toId(where.id);
      const now = new Date();
      const updateDoc: any = { ...data, updatedAt: now };
      await col.updateOne(filter, { $set: updateDoc });
      const updated = await col.findOne(filter);
      return mapId(updated);
    },
  },

  coinData: {
    async upsert({ where, update, create }: any) {
      const col = await coinCollection();
      const key = where.cryptoDataId_name;
      const filter = { cryptoDataId: String(key.cryptoDataId), name: key.name };
      const now = new Date();
      const updateDoc = { ...update, updatedAt: now };
      const createDoc = { ...create, createdAt: now, updatedAt: now };
      const res = await col.findOneAndUpdate(filter, { $set: updateDoc }, { upsert: true, returnDocument: "after" as any });
      if (res.value) return mapId(res.value);
      // If upsert didn't return value, insert createDoc
      const insertRes = await col.insertOne(createDoc as any);
      const doc = await col.findOne({ _id: insertRes.insertedId });
      return mapId(doc);
    },
    async createMany({ data }: any) {
      if (!Array.isArray(data) || data.length === 0) return;
      const col = await coinCollection();
      const now = new Date();
      const docs = data.map((d: any) => ({ ...d, createdAt: now, updatedAt: now }));
      await col.insertMany(docs as any);
    },
  },

  chartData: {
    async upsert({ where, update, create }: any) {
      const col = await chartCollection();
      const key = where.cryptoDataId_date;
      const filter = { cryptoDataId: String(key.cryptoDataId), date: new Date(key.date) };
      const now = new Date();
      const updateDoc = { ...update, updatedAt: now };
      const createDoc = { ...create, createdAt: now, updatedAt: now };
      const res = await col.findOneAndUpdate(filter, { $set: updateDoc }, { upsert: true, returnDocument: "after" as any });
      if (res.value) return mapId(res.value);
      const insertRes = await col.insertOne(createDoc as any);
      const doc = await col.findOne({ _id: insertRes.insertedId });
      return mapId(doc);
    },
    async createMany({ data }: any) {
      if (!Array.isArray(data) || data.length === 0) return;
      const col = await chartCollection();
      const now = new Date();
      const docs = data.map((d: any) => ({ ...d, createdAt: now, updatedAt: now }));
      await col.insertMany(docs as any);
    },
  }
};
