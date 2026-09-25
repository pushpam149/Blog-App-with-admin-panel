"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";


export default function ModalsPage() {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="lg:ml-[290px] min-h-screen flex flex-col">
        
        {/* TOPBAR */}
        <AdminTopbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 px-6 py-8">
          
          {/* PAGE HEADER */}
          <section className="mb-7">
            <div className="mb-2 text-sm font-bold tracking-wide text-blue-600">
              OVERLAY
            </div>

            <div className="flex items-center gap-5">
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
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 9h10" />
                  <path d="M7 13h6" />
                </svg>
              </div>

              <div>
                <h1 className="text-[36px] font-bold leading-tight text-[#071a36]">
                  Modals
                </h1>

                <p className="mt-1 text-[18px] text-slate-500">
                  Modal dialogs for confirmations and compact workflows.
                </p>
              </div>
            </div>
          </section>

          {/* TWO CARDS */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">

            {/* MODAL EXAMPLES */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
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
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M7 9h10" />
                    <path d="M7 13h6" />
                  </svg>
                </div>

                <h2 className="text-[25px] font-semibold text-[#071a36]">
                  Modal Examples
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveModal("confirm")}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-[17px] font-semibold text-white shadow-sm"
                >
                  Open Confirm Modal
                </button>

                <button
                  onClick={() => setActiveModal("form")}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-[17px] font-semibold text-[#071a36]"
                >
                  Open Form Modal
                </button>
              </div>
            </div>

            {/* USAGE */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 10v6" />
                    <circle cx="12" cy="7" r="0.8" fill="currentColor" />
                  </svg>
                </div>

                <h2 className="text-[25px] font-semibold text-[#071a36]">
                  Usage
                </h2>
              </div>

              <p className="text-[18px] leading-7 text-slate-500">
                Use modals for focused confirmations, compact forms, and
                high-priority decisions without leaving the page.
              </p>
            </div>

          </section>
        </main>

        {/* FOOTER */}
        <Footer/>
      </div>

      {/* CONFIRM MODAL */}
      {activeModal === "confirm" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-md rounded-xl bg-white p-7 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#071a36]">
              Confirm Action
            </h2>

            <p className="mt-3 text-[17px] leading-6 text-slate-500">
              Are you sure you want to continue with this action?
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-[#071a36]"
              >
                Cancel
              </button>

              <button
                onClick={closeModal}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {activeModal === "form" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
          <div className="w-full max-w-md rounded-xl bg-white p-7 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#071a36]">
              Compact Form
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-[16px] font-medium text-[#071a36]">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter name"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-[16px] font-medium text-[#071a36]">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-7 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="rounded-lg border border-slate-200 bg-white px-5 py-3 font-semibold text-[#071a36]"
              >
                Cancel
              </button>

              <button
                onClick={closeModal}
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}