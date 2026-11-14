import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  ConciergeBell,
  Star,
  Building2,
  CalendarDays,
  LayoutGrid,
  HandPlatter,
  Home,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

const menus = [
  {
    title: "Nghiệp vụ vận hành",
    items: [
      { name: "Tổng quan", path: "/tong-quan", icon: LayoutDashboard },
      { name: "Quản lý Phòng", path: "/quan-ly-phong", icon: BedDouble },
      { name: "Bảng giá & Mùa vụ", path: "/bang-gia", icon: CalendarDays },
      { name: "Quản lý Đặt phòng", path: "/quan-ly-dat-phong", icon: CalendarCheck },
     
    ],
  },
  {
    title: "Khách hàng & Cơ sở",
    items: [
      { name: "Tiện ích cơ sở", path: "/tien-ichcs", icon: LayoutGrid },
      { name: "Đánh giá từ khách", path: "/admin/danh-gia-tu-khach", icon: Star },
      { name: "Hồ sơ Homestay", path: "/admin/ho-so-homestay", icon: Building2 },
    ],
  },
];

export default function OwnerSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200/80 bg-white shadow-sm">
      {/* Brand Header */}
      <div className="flex items-center gap-3.5 border-b border-slate-100 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white shadow-md shadow-emerald-700/20">
          <Home className="h-6 w-6 stroke-[2.2]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-black tracking-tight text-slate-800">
              STAY<span className="text-emerald-600">WISE</span>
            </span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              Host
            </span>
          </div>
          <p className="text-xs text-slate-400">Hệ thống quản trị cơ sở lưu trú</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-slate-200">
        {menus.map((menu) => (
          <div key={menu.title}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {menu.title}
            </p>

            <div className="space-y-1">
              {menu.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <Icon
                            size={19}
                            className={`transition-colors duration-200 ${isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-emerald-600"
                              }`}
                          />
                          <span>{item.name}</span>
                        </div>

                        {isActive ? (
                          <ChevronRight size={16} className="text-emerald-200" />
                        ) : null}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Property Status Card */}
      <div className="border-t border-slate-100 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
          <div className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-semibold text-slate-800">Đang hoạt động</p>
              <ShieldCheck size={14} className="text-emerald-600" />
            </div>
            <p className="truncate text-[11px] text-slate-400">
              Hệ thống đã xác thực an toàn
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}