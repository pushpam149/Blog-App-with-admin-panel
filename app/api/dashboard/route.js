
import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();

    const totalUsers = await User.countDocuments();

    const totalBlogs = await Blog.countDocuments();

    const publishedBlogs = await Blog.countDocuments({
      status: "Published",
    });

    const draftBlogs = await Blog.countDocuments({
      status: "Draft",
    });

    const recentBlogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalBlogs,
        publishedBlogs,
        draftBlogs,
      },
      recentBlogs,
    });
  } catch (error) {
    console.error("DASHBOARD API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard data",
      },
      { status: 500 }
    );
  }
}