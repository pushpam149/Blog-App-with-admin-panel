import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const token = body?.token?.trim();
    const password = body?.password;

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Token and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    console.log("=================================");
    console.log("RESET TOKEN RECEIVED:", token);
    console.log("RESET HASH:", hashedToken);
    console.log("=================================");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: {
        $gt: new Date(),
      },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) {
      console.log("❌ RESET USER NOT FOUND");

      return NextResponse.json(
        {
          success: false,
          message: "Reset link is invalid or has expired.",
        },
        { status: 400 }
      );
    }

    console.log("✅ RESET USER FOUND:", user.email);

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    console.log("✅ PASSWORD RESET SUCCESS");

    return NextResponse.json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to reset password. Please try again.",
      },
      { status: 500 }
    );
  }
}