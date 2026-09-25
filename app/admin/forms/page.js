"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";
export default function FormsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#0b1b35]">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* RIGHT SIDE */}
      <div className="min-h-screen lg:ml-[290px]">

        {/* TOPBAR */}
       

        {/* PAGE CONTENT */}
        <main className="px-5 py-8 lg:px-8">

          {/* PAGE HEADER */}
          <div className="mb-8 flex items-start gap-5">

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff]">
              <div className="grid grid-cols-2 gap-1">
                <span className="h-3 w-3 rounded-[3px] border-2 border-blue-600 bg-blue-600"></span>
                <span className="h-3 w-3 rounded-[3px] border-2 border-blue-600"></span>
                <span className="h-3 w-3 rounded-[3px] border-2 border-blue-600"></span>
                <span className="h-3 w-3 rounded-[3px] border-2 border-blue-600"></span>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold uppercase tracking-wide text-blue-600">
                INPUTS
              </div>

              <h1 className="mt-1 text-4xl font-bold leading-tight">
                Forms
              </h1>

              <p className="mt-2 text-lg text-slate-500">
                Reusable form controls, validation states, and field layouts.
              </p>
            </div>

          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

            {/* ================= VALIDATION FORM ================= */}
            <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">

              {/* CARD HEADER */}
              <div className="mb-7 flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff]">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="h-2.5 w-2.5 rounded-[2px] border-2 border-blue-600 bg-blue-600"></span>
                    <span className="h-2.5 w-2.5 rounded-[2px] border-2 border-blue-600"></span>
                    <span className="h-2.5 w-2.5 rounded-[2px] border-2 border-blue-600"></span>
                    <span className="h-2.5 w-2.5 rounded-[2px] border-2 border-blue-600"></span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">
                    Validation Form
                  </h2>

                  <p className="mt-1 text-base text-slate-500">
                    Bootstrap-ready fields with custom validation feedback.
                  </p>
                </div>

              </div>

              <form onSubmit={handleSubmit}>

                {/* NAME + EMAIL */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-lg">
                      Full name
                    </label>

                    <input
                      type="text"
                      required
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-lg outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-lg">
                      Email
                    </label>

                    <input
                      type="email"
                      required
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-lg outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                </div>

                {/* PLAN + BUDGET */}
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-lg">
                      Plan
                    </label>

                    <select
                      required
                      defaultValue=""
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-lg outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Choose plan
                      </option>

                      <option value="basic">
                        Basic
                      </option>

                      <option value="pro">
                        Pro
                      </option>

                      <option value="enterprise">
                        Enterprise
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-lg">
                      Budget
                    </label>

                    <input
                      type="number"
                      className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-lg outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                </div>

                {/* MESSAGE */}
                <div className="mt-5">

                  <label className="mb-2 block text-lg">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />

                </div>

                {/* BUTTON */}
                <div className="mt-6 flex justify-end">

                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
                  >
                    ➤ Submit Form
                  </button>

                </div>

                {submitted && (
                  <div className="mt-4 text-right font-medium text-green-600">
                    Form submitted successfully.
                  </div>
                )}

              </form>

            </section>

            {/* ================= INPUT STATES ================= */}
            <section className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">

              {/* CARD HEADER */}
              <div className="mb-7 flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-xl text-blue-600">
                  ⛶
                </div>

                <h2 className="text-2xl font-semibold">
                  Input States
                </h2>

              </div>

              <div className="space-y-5">

                {/* DEFAULT INPUT */}
                <input
                  type="text"
                  value="Default input"
                  readOnly
                  className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-lg outline-none"
                />

                {/* VALID INPUT */}
                <div className="relative">

                  <input
                    type="text"
                    value="Valid input"
                    readOnly
                    className="h-12 w-full rounded-lg border border-green-500 bg-white px-4 pr-12 text-lg outline-none"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-green-600">
                    ✓
                  </span>

                </div>

                {/* INVALID INPUT */}
                <div className="relative">

                  <input
                    type="text"
                    value="Invalid input"
                    readOnly
                    className="h-12 w-full rounded-lg border border-red-500 bg-white px-4 pr-12 text-lg outline-none"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-red-500 text-xs font-bold text-red-500">
                    !
                  </span>

                </div>

                {/* CHECKBOX */}
                <label className="flex cursor-pointer items-center gap-3 text-lg">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-blue-600"
                  />

                  <span>
                    Sample checkbox
                  </span>

                </label>

              </div>

            </section>

          </div>

        </main>
        <Footer />
      </div>
    </div>
  );
}