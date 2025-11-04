#!/usr/bin/env node
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in .env');
    process.exit(2);
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    const testEmail = `testuser_${Date.now()}@example.com`;
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      country: 'Testland',
      countryCode: '+00',
      phoneNumber: '0000000000',
      email: testEmail,
      password: 'password123',
      confirmPassword: 'password123',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Inserting test user...', testEmail);
    const insertRes = await users.insertOne(testUser);
    const insertedId = insertRes.insertedId;
    console.log('Inserted id:', String(insertedId));

    console.log('Fetching user by email...');
    const fetched = await users.findOne({ email: testEmail });
    if (!fetched) {
      console.error('ERROR: inserted user could not be found');
      process.exitCode = 1;
      return;
    }

    console.log('Verifying password...');
    if (fetched.password !== testUser.password) {
      console.error('ERROR: password mismatch');
      process.exitCode = 1;
    } else {
      console.log('SUCCESS: password verified');
    }

    // Clean up
    console.log('Cleaning up (deleting test user)...');
    await users.deleteOne({ _id: new ObjectId(insertedId) });
    console.log('Done.');
  } catch (err) {
    console.error('Test script error:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

main();
