import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import crypto from "crypto";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const email = body?.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select(
      "+resetPasswordToken +resetPasswordExpires"
    );

    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been generated.",
      });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expires = new Date(Date.now() + 15 * 60 * 1000);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = expires;

    await user.save();

    // IMPORTANT: database se dobara read karke verify
    const savedUser = await User.findById(user._id).select(
      "+resetPasswordToken +resetPasswordExpires"
    );

    console.log("=================================");
    console.log("PASSWORD RESET EMAIL:", email);
    console.log("RESET TOKEN:", resetToken);
    console.log("HASHED TOKEN:", hashedToken);
    console.log("SAVED TOKEN:", savedUser?.resetPasswordToken);
    console.log("TOKEN MATCH:",
      savedUser?.resetPasswordToken === hashedToken
    );
    console.log("SAVED EXPIRY:", savedUser?.resetPasswordExpires);
    console.log("=================================");

    const resetUrl =
      `${request.nextUrl.origin}/admin/reset-password?token=${resetToken}`;

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been generated.",
      resetUrl,
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}