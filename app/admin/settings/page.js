"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import Footer from "@/components/website/Footer";


export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("adminHMD Workspace");
  const [language, setLanguage] = useState("English");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN AREA */}
      <div className="lg:ml-[290px]">
        {/* TOPBAR */}
        <AdminTopbar />

        <main className="px-6 py-8">
          {/* PAGE HEADER */}
          <section className="mb-7">
            <div className="mb-2 text-sm font-bold tracking-wide text-blue-600">
              WORKSPACE
            </div>

            <div className="flex items-center gap-5">
              {/* ICON */}
              <div className="flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-blue-50">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="text-blue-600"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.7 1.7-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20h-2.4v-.2a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-1.7-1.7.06-.06A1.7 1.7 0 0 0 8.46 15a1.7 1.7 0 0 0-1.56-1.03H6.7v-2.4h.2A1.7 1.7 0 0 0 8.46 10a1.7 1.7 0 0 0-.34-1.88l-.06-.06 1.7-1.7.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 12.73 5.2V5h2.4v.2a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.7 1.7-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.97 11h.2v2.4h-.2A1.7 1.7 0 0 0 19.4 15Z" />
                </svg>
              </div>

              <div>
                <h1 className="text-[36px] font-bold leading-tight text-[#071a36]">
                  Settings
                </h1>

                <p className="mt-1 text-[18px] text-slate-500">
                  Customize workspace defaults, security options, and
                  notification preferences.
                </p>
              </div>
            </div>
          </section>

          {/* SETTINGS CARDS */}
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* GENERAL SETTINGS */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              {/* CARD HEADER */}
              <div className="mb-2 flex items-center gap-3">
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
                    <path d="M4 6h16" />
                    <path d="M4 12h16" />
                    <path d="M4 18h16" />
                    <circle cx="8" cy="6" r="2" fill="white" />
                    <circle cx="15" cy="12" r="2" fill="white" />
                    <circle cx="10" cy="18" r="2" fill="white" />
                  </svg>
                </div>

                <h2 className="text-[25px] font-semibold text-[#071a36]">
                  General Settings
                </h2>
              </div>

              <p className="mb-7 text-[17px] text-slate-500">
                Configure workspace identity and defaults.
              </p>

              {/* WORKSPACE NAME */}
              <div className="mb-5">
                <label className="mb-2 block text-[17px] font-medium text-[#071a36]">
                  Workspace name
                </label>

                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[18px] text-[#071a36] outline-none focus:border-blue-500"
                />
              </div>

              {/* LANGUAGE */}
              <div className="mb-5">
                <label className="mb-2 block text-[17px] font-medium text-[#071a36]">
                  Default language
                </label>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[18px] text-[#071a36] outline-none focus:border-blue-500"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>

              {/* SAVE BUTTON */}
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-[17px] font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8 12 2.5 2.5L16 9" />
                </svg>

                Save Settings
              </button>
            </div>

            {/* PREFERENCES */}
            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              {/* CARD HEADER */}
              <div className="mb-2 flex items-center gap-3">
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
                    <circle cx="8" cy="8" r="3" />
                    <circle cx="16" cy="16" r="3" />
                    <path d="M10.5 10.5 13.5 13.5" />
                    <path d="M16 5v4" />
                    <path d="M14 7h4" />
                  </svg>
                </div>

                <h2 className="text-[25px] font-semibold text-[#071a36]">
                  Preferences
                </h2>
              </div>

              <p className="mb-7 text-[17px] text-slate-500">
                Control notifications and security options.
              </p>

              {/* EMAIL ALERTS */}
              <label className="mb-4 flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] px-5 py-5">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#071a36]">
                    Email alerts
                  </h3>

                  <p className="mt-1 text-[16px] text-slate-500">
                    Receive important account updates.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-5 w-5 cursor-pointer accent-blue-600"
                />
              </label>

              {/* WEEKLY REPORTS */}
              <label className="mb-4 flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] px-5 py-5">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#071a36]">
                    Weekly reports
                  </h3>

                  <p className="mt-1 text-[16px] text-slate-500">
                    Send summary reports every Monday.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={weeklyReports}
                  onChange={(e) => setWeeklyReports(e.target.checked)}
                  className="h-5 w-5 cursor-pointer accent-blue-600"
                />
              </label>

              {/* TWO FACTOR */}
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-[#f8fafc] px-5 py-5">
                <div>
                  <h3 className="text-[18px] font-semibold text-[#071a36]">
                    Two-factor authentication
                  </h3>

                  <p className="mt-1 text-[16px] text-slate-500">
                    Require extra verification for admins.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="h-5 w-5 cursor-pointer accent-blue-600"
                />
              </label>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <Footer/>
      </div>
    </div>
  );
}