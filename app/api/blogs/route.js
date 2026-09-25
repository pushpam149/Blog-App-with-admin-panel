import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";

// =========================
// GET ALL BLOGS
// =========================
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load blogs",
      },
      { status: 500 }
    );
  }
}

// =========================
// CREATE BLOG
// =========================
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const title = body?.title?.trim();
    const slug = body?.slug?.trim().toLowerCase();
    const description = body?.description?.trim();
    const content = body?.content?.trim();
    const image = body?.image || "";
    const author = body?.author?.trim() || "Pushpam";
    const status = body?.status || "Published";

    // =========================
    // VALIDATION
    // =========================
    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Title is required",
        },
        { status: 400 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Slug is required",
        },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Description is required",
        },
        { status: 400 }
      );
    }

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          message: "Content is required",
        },
        { status: 400 }
      );
    }

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog image is required",
        },
        { status: 400 }
      );
    }

    // =========================
    // CHECK IMAGE SIZE
    // =========================
    const imageSizeInMB =
      Buffer.byteLength(image, "utf8") / (1024 * 1024);

    if (imageSizeInMB > 3) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is too large. Please select a smaller image.",
        },
        { status: 400 }
      );
    }

    // =========================
    // CHECK DUPLICATE SLUG
    // =========================
    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    // =========================
    // CREATE BLOG
    // =========================
    const blog = await Blog.create({
      title,
      slug,
      description,
      content,
      image,
      author,
      status,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE BLOG ERROR:", error);

    // Duplicate key protection
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create blog",
      },
      { status: 500 }
    );
  }
}