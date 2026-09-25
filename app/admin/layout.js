import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      <AdminSidebar />

      <div className="lg:ml-64">

        <AdminTopbar />

        <main>
          {children}
        </main>
        <Footer/>

      </div>

    </div>
  );
}