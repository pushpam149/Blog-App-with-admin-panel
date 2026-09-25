import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const email = body?.email?.trim().toLowerCase();
    const password = body?.password;

    // =========================
    // VALIDATION
    // =========================
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // =========================
    // FIND USER
    // =========================
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // =========================
    // PASSWORD CHECK
    // =========================
    if (!user.password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This account does not have a password. Please create a new user with a password.",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // =========================
    // ACCOUNT STATUS
    // =========================
    if (user.status !== "Active") {
      return NextResponse.json(
        {
          success: false,
          message: `Your account is ${user.status}. Please contact admin.`,
        },
        { status: 403 }
      );
    }

    // =========================
    // LOGIN RESPONSE
    // =========================
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // =========================
    // SESSION COOKIE
    // =========================
    response.cookies.set(
      "admin_session",
      user._id.toString(),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Login failed. Please try again.",
      },
      { status: 500 }
    );
  }
}