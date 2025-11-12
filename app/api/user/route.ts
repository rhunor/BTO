import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface FormData {
  firstName: string;
  lastName: string;
  country: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      country,
      countryCode,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = body as FormData;

    // Check email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Check username already exists
    // const existingUserByUsername = await db.user.findUnique({
    //   where: { username: username },
    // });
    // if (existingUserByUsername) {
    //   return NextResponse.json(
    //     { user: null, message: "User with this username already exists" },
    //     { status: 409 }
    //   );
    // }

    // Ensure every newly created user gets a default role of 'user'
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        country,
        countryCode,
        phoneNumber,
        email,
        password,
        confirmPassword,
        role: "user",
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Something went wrong! Please try again later." },
      { status: 500 }
    );
  }
}

