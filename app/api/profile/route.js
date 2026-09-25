import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

const ADMIN_EMAIL =
  "pushpam.22scse101019p06@galgotiasuniversity.edu.in";

export async function GET() {
  try {
    await connectDB();

    const user = await User.findOne({
      email: ADMIN_EMAIL,
    }).lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin user not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("PROFILE GET ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, bio } = body;

    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      {
        email: ADMIN_EMAIL,
      },
      {
        name,
        email,
        bio: bio || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin user not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      { status: 500 }
    );
  }
}