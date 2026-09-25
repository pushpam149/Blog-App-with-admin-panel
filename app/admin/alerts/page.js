
"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="lg:ml-[290px]">
        {/* TOPBAR */}
        <AdminTopbar />

        <main className="px-6 py-8">
          {/* PAGE HEADER */}
          <section className="mb-7">
            <div className="mb-2 text-sm font-bold tracking-wide text-blue-600">
              FEEDBACK
            </div>

            <div className="flex items-center gap-5">
              {/* HEADER ICON */}
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-blue-50">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-blue-600"
                >
                  <path d="M12 3L2.8 20h18.4L12 3z" />
                  <path d="M12 9v5" />
                  <circle cx="12" cy="17.5" r="0.8" fill="currentColor" />
                </svg>
              </div>

              <div>
                <h1 className="text-[36px] font-bold leading-tight text-[#071a36]">
                  Alerts
                </h1>

                <p className="mt-1 text-[18px] text-slate-500">
                  System feedback states for success, warning, info, and error
                  messages.
                </p>
              </div>
            </div>
          </section>

          {/* ALERT STYLES CARD */}
          <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            {/* CARD HEADER */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-blue-600"
                >
                  <path d="M12 3L2.8 20h18.4L12 3z" />
                  <path d="M12 9v5" />
                  <circle cx="12" cy="17.5" r="0.8" fill="currentColor" />
                </svg>
              </div>

              <h2 className="text-[25px] font-semibold text-[#071a36]">
                Alert Styles
              </h2>
            </div>

            <p className="mb-7 text-[18px] text-slate-500">
              Common notification patterns for admin workflows.
            </p>

            {/* INFO */}
            <div className="mb-5 rounded-lg border border-blue-300 bg-blue-100 px-5 py-6 text-[18px] text-[#071a36]">
              <strong>Info:</strong> New dashboard reports are ready to review.
            </div>

            {/* SUCCESS */}
            <div className="mb-5 rounded-lg border border-emerald-300 bg-emerald-100 px-5 py-6 text-[18px] text-[#071a36]">
              <strong>Success:</strong> User permissions were updated
              successfully.
            </div>

            {/* WARNING */}
            <div className="mb-5 rounded-lg border border-amber-300 bg-amber-100 px-5 py-6 text-[18px] text-[#071a36]">
              <strong>Warning:</strong> Billing information needs attention.
            </div>

            {/* ERROR */}
            <div className="rounded-lg border border-red-300 bg-red-100 px-5 py-6 text-[18px] text-[#071a36]">
              <strong>Error:</strong> Some integrations could not sync.
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    </div>
  );
}

