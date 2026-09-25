import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminAuth({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return children;
}