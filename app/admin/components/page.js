"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";

export default function ComponentsPage() {
  const [openItem, setOpenItem] = useState(0);

  const toggleAccordion = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN AREA */}
      <div className="lg:ml-[290px]">
        {/* TOPBAR */}
        <AdminTopbar />

        {/* CONTENT */}
        <main className="px-6 py-8">
          {/* PAGE HEADER */}
          <section className="mb-7">
            <div className="mb-2 text-sm font-bold tracking-wide text-blue-600">
              UI KIT
            </div>

            <div className="flex items-center gap-5">
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-blue-50">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-blue-600"
                >
                  <rect x="4" y="4" width="5" height="5" rx="1" />
                  <rect x="15" y="4" width="5" height="5" rx="1" />
                  <rect x="4" y="15" width="5" height="5" rx="1" />
                  <rect x="15" y="15" width="5" height="5" rx="1" />
                </svg>
              </div>

              <div>
                <h1 className="text-[36px] font-bold leading-tight text-[#071a36]">
                  Components
                </h1>

                <p className="mt-1 text-[18px] text-slate-500">
                  Buttons, badges, progress, accordions, and reusable interface
                  blocks.
                </p>
              </div>
            </div>
          </section>

          {/* BUTTONS + PROGRESS */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* BUTTONS */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <span className="text-xl text-blue-600">➤</span>
                </div>

                <h2 className="text-[25px] font-semibold text-[#071a36]">
                  Buttons
                </h2>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="rounded-lg bg-blue-600 px-4 py-3 text-[17px] font-semibold text-white">
                  Primary
                </button>

                <button className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-[17px] font-semibold text-[#071a36]">
                  Secondary
                </button>

                <button className="rounded-lg bg-emerald-600 px-4 py-3 text-[17px] font-semibold text-white">
                  Success
                </button>

                <button className="rounded-lg bg-red-500 px-4 py-3 text-[17px] font-semibold text-white">
                  Danger
                </button>

                <button className="rounded-lg bg-amber-400 px-4 py-3 text-[17px] font-semibold text-black">
                  Warning
                </button>
              </div>

              <h3 className="mt-7 mb-4 text-[25px] font-medium text-[#071a36]">
                Badges
              </h3>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  Primary
                </span>

                <span className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
                  Success
                </span>

                <span className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black">
                  Warning
                </span>

                <span className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white">
                  Danger
                </span>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  📊
                </div>

                <h2 className="text-[25px] font-semibold text-[#071a36]">
                  Progress
                </h2>
              </div>

              <div className="space-y-5">
                <div className="relative h-6 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-blue-600 pr-3"
                    style={{ width: "72%" }}
                  >
                    <span className="text-sm font-bold text-white">72%</span>
                  </div>
                </div>

                <div className="relative h-6 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-emerald-600 pr-3"
                    style={{ width: "58%" }}
                  >
                    <span className="text-sm font-bold text-white">58%</span>
                  </div>
                </div>

                <div className="relative h-6 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="flex h-full items-center justify-end rounded-full bg-amber-400 pr-3"
                    style={{ width: "42%" }}
                  >
                    <span className="text-sm font-bold text-white">42%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ACCORDION */}
          <section className="mt-5 rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                📋
              </div>

              <h2 className="text-[25px] font-semibold text-[#071a36]">
                Accordion
              </h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-slate-200">
              {/* FIRST */}
              <button
                onClick={() => toggleAccordion(0)}
                className="flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5 text-left text-[18px] text-[#071a36]"
              >
                <span>Reusable layout</span>

                <span className="text-2xl">
                  {openItem === 0 ? "⌃" : "⌄"}
                </span>
              </button>

              {openItem === 0 && (
                <div className="border-b border-slate-200 px-6 py-6 text-[18px] text-[#071a36]">
                  Use the admin shell, panel, metric-card, and table styles for
                  consistent pages.
                </div>
              )}

              {/* SECOND */}
              <button
                onClick={() => toggleAccordion(1)}
                className="flex w-full items-center justify-between bg-white px-6 py-5 text-left text-[18px] text-[#071a36]"
              >
                <span>Responsive behavior</span>

                <span className="text-2xl">
                  {openItem === 1 ? "⌃" : "⌄"}
                </span>
              </button>

              {openItem === 1 && (
                <div className="border-t border-slate-200 px-6 py-6 text-[18px] text-[#071a36]">
                  Pages automatically adapt to smaller screens while keeping
                  the same visual structure.
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer/>
      </div>
    </div>
  );
}