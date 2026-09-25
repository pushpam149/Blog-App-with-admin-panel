import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { slug } = await params;

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET BLOG BY SLUG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}