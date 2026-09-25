"use client";

import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";


export default function BlankPage() {
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
            <div className="flex items-center gap-5">
              {/* PAGE ICON */}
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-blue-600"
                >
                  <path d="M6 3h9l4 4v14H6V3Z" />
                  <path d="M14 3v5h5" />
                </svg>
              </div>

              <div>
                <div className="mb-1 text-sm font-bold tracking-wide text-blue-600">
                  STARTER
                </div>

                <h1 className="text-[36px] font-bold leading-tight text-[#071a36]">
                  Blank
                </h1>

                <p className="mt-1 text-[18px] text-slate-500">
                  A clean starter page for new admin screens.
                </p>
              </div>
            </div>
          </section>

          {/* BLANK CARD */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex min-h-[515px] flex-col items-center justify-center px-6 py-16 text-center">
              {/* ROBOT */}
              <div className="mb-7">
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Antenna */}
                  <path
                    d="M50 14V7"
                    stroke="#94A3B8"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="50"
                    cy="5"
                    r="3"
                    fill="#38BDF8"
                  />

                  {/* Head */}
                  <rect
                    x="29"
                    y="17"
                    width="42"
                    height="32"
                    rx="12"
                    fill="#E2E8F0"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />

                  {/* Face */}
                  <rect
                    x="34"
                    y="24"
                    width="32"
                    height="17"
                    rx="7"
                    fill="#0F172A"
                  />

                  {/* Eyes */}
                  <circle cx="43" cy="32" r="3" fill="#22D3EE" />
                  <circle cx="57" cy="32" r="3" fill="#22D3EE" />

                  {/* Body */}
                  <rect
                    x="35"
                    y="50"
                    width="30"
                    height="30"
                    rx="11"
                    fill="#E2E8F0"
                    stroke="#CBD5E1"
                    strokeWidth="2"
                  />

                  {/* Arms */}
                  <path
                    d="M35 57L25 66"
                    stroke="#CBD5E1"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M65 57L75 66"
                    stroke="#CBD5E1"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />

                  {/* Legs */}
                  <path
                    d="M43 80V88"
                    stroke="#CBD5E1"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />

                  <path
                    d="M57 80V88"
                    stroke="#CBD5E1"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />

                  {/* Ground glow */}
                  <ellipse
                    cx="50"
                    cy="94"
                    rx="13"
                    ry="3"
                    fill="#A7F3D0"
                    opacity="0.8"
                  />
                </svg>
              </div>

              {/* TITLE */}
              <h2 className="text-[28px] font-semibold text-[#071a36]">
                Blank Page
              </h2>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-[560px] text-[18px] leading-7 text-slate-500">
                Start a new admin screen from this clean, responsive page
                shell.
              </p>

              {/* BUTTON */}
              <Link
                href="/admin/components"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-[17px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="4" y="4" width="4" height="4" rx="1" />
                  <rect x="10" y="4" width="4" height="4" rx="1" />
                  <rect x="16" y="4" width="4" height="4" rx="1" />

                  <rect x="4" y="10" width="4" height="4" rx="1" />
                  <rect x="10" y="10" width="4" height="4" rx="1" />
                  <rect x="16" y="10" width="4" height="4" rx="1" />

                  <rect x="4" y="16" width="4" height="4" rx="1" />
                  <rect x="10" y="16" width="4" height="4" rx="1" />
                  <rect x="16" y="16" width="4" height="4" rx="1" />
                </svg>

                Browse Components
              </Link>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <Footer/>
      </div>
    </div>
  );
}