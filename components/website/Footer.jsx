
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f4f7fb]">
      <div className="grid grid-cols-1 gap-4 px-7 py-7 text-sm text-slate-500 md:grid-cols-3 md:items-center">

        {/* LEFT */}
        <div>
          <p>Copyright 2026 adminHMD.</p>

          <p className="mt-1">
            Developed by{" "}
            <span className="font-semibold text-emerald-600">
              pushpam singh
            </span>{" "}
            <span className="text-slate-400">•</span>{" "}
            Distributed by{" "}
            <span className="font-semibold text-emerald-600">
              ThemeWagon
            </span>
          </p>
        </div>

        {/* CENTER */}
        <div className="text-center">
          Professional dashboard template.
        </div>

        {/* RIGHT */}
        <div className="text-left md:text-right">
          Validated user creation form.
        </div>

      </div>
    </footer>
  );
}

