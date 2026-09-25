import { cookies } from "next/headers";
import connectDB from "@/lib/connectDB";
import User from "@/models/user";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("admin_session")?.value;

    if (!sessionId) {
      return null;
    }

    await connectDB();

    const user = await User.findById(sessionId)
      .select("-password")
      .lean();

    if (!user) {
      return null;
    }

    if (user.status !== "Active") {
      return null;
    }

    return user;
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);
    return null;
  }
}