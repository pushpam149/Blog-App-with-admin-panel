
import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/admin", icon: "▦" },
  { name: "Users", href: "/admin/users", icon: "♧" },
  { name: "Add User", href: "/admin/add-user", icon: "♙" },
   { name: "Blogs", href: "/admin/blogs", icon: "✎" },
  { name: "Add Blog", href: "/admin/add-blog", icon: "＋" },
  { name: "Profile", href: "/admin/profile", icon: "▣" },
  /*{ name: "Charts", href: "/admin/charts", icon: "▥" },
  { name: "Tables", href: "/admin/tables", icon: "▦" },
  { name: "Forms", href: "/admin/forms", icon: "⊞" },
  { name: "Components", href: "/admin/components", icon: "▦" },
  { name: "Alerts", href: "/admin/alerts", icon: "△" },
  { name: "Modals", href: "/admin/modals", icon: "▤" },
  { name: "Settings", href: "/admin/settings", icon: "⚙" },
  { name: "Blank Page", href: "/admin/blank", icon: "□" },*/
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 overflow-y-auto border-r border-slate-200 bg-white lg:block">

      {/* LOGO */}
      <div className="border-b border-slate-200 px-6 py-6">
        <Link
          href="/admin"
          className="text-xl font-bold text-slate-900"
        >
          adminHMD
        </Link>

        <p className="mt-1 text-sm text-slate-500">
          Professional dashboard
        </p>
      </div>

      {/* MENU */}
      <nav className="px-4 py-7">

        <p className="mb-4 px-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
          Menu
        </p>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center gap-4 rounded-xl px-3 py-3 text-lg font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
            >
              {/* ICON */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg text-blue-600">
                {item.icon}
              </span>

              {/* NAME */}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        {/* PROFILE CARD */}
        <div className="mt-6 border-t border-slate-200 pt-5">

          <div className="rounded-xl border border-slate-200 bg-[#eef4ff] px-4 py-4 text-center">

            {/* AVATAR */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-emerald-400 bg-gray-300 text-xl font-bold text-slate-900">
              P
            </div>

            {/* NAME */}
            <p className="mt-2 text-lg font-bold text-slate-900">
              Pushpam
            </p>

            {/* WORKSPACE */}
            <p className="text-sm text-slate-500">
              Active Workspace
            </p>

          </div>

          {/* SYSTEM STATUS */}
          <div className="mt-5 border-t border-slate-200 pt-5">
            <div className="flex items-center gap-3 px-1 text-sm text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              <span>System running smoothly</span>
            </div>
          </div>

        </div>

      </nav>
    </aside>
  );
}