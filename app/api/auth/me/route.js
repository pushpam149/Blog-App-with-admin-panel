import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

export async function GET(request) {
  try {
    await connectDB();

    const session = request.cookies.get("admin_session")?.value;

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const user = await User.findById(session)
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          team: user.team,
          status: user.status,
          avatar: user.avatar || "",
          bio: user.bio || "",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("AUTH ME ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to get current user",
      },
      { status: 500 }
    );
  }
}