import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Blog from "@/models/Blog";

// GET SINGLE BLOG
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findById(id).lean();

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
    console.error("GET BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}

// UPDATE BLOG
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      description,
      content,
      image,
      status,
      author,
    } = body;

    if (!title || !slug || !description) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, slug and description are required",
        },
        { status: 400 }
      );
    }

    // Check duplicate slug
    const existingBlog = await Blog.findOne({
      slug,
      _id: { $ne: id },
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug,
        description,
        content: content || "",
        image: image || "",
        status: status || "Published",
        author: author || "Pushpam",
      },
      {
        new: true,
        runValidators: true,
      }
    );

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
        message: "Blog updated successfully",
        blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("UPDATE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update blog",
      },
      { status: 500 }
    );
  }
}

// DELETE BLOG
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const blog = await Blog.findByIdAndDelete(id);

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
        message: "Blog deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}