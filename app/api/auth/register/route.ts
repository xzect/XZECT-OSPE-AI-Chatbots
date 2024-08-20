import bcrypt from "bcrypt";
import prisma from "@/lib/dbClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });

      return NextResponse.json(
        { message: "User created successfully", newUser },
        { status: 201 },
      );
    } else {
      return NextResponse.json(
        { message: "Email already registered." },
        { status: 409 },
      );
    }
  } catch (err) {
    console.log("Error while registering user: ", err);
    return NextResponse.json(
      { message: "Couldn't register user" },
      { status: 500 },
    );
  }
}
