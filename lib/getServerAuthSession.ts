// lib/getServerAuthSession.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const getServerAuthSession = () => getServerSession(authOptions);