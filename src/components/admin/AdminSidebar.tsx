
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  ConciergeBell,
  Star,
  Building2,
  CalendarDays,
} from "lucide-react";
import path from "path";

const menus = [
  {
    title: "Nghiệp vụ vận hành",
    items: [
      { name: "Tổng quan", path: "/tong-quan", icon: LayoutDashboard },
      { name: "Quản lý Phòng", path: "/quan-ly-phong", icon: BedDouble },
      {name: "Bảng giá & mùa vụ ", path:"bang-gia", icon: CalendarDays},
      { name: "Quản lý Đặt phòng", path: "/quan-ly-dat-phong", icon: CalendarCheck },
      { name: "Tiện ích & Dịch vụ", path: "/tien-ich", icon: ConciergeBell },
    ],
  },
  {
    title: "Khách hàng & Cơ sở",
    items: [
      { name: "Đánh giá từ khách", path: "/admin/danh-gia-tu-khach", icon: Star },
      { name: "Hồ sơ HomeStay", path: "/admin/ho-so-homestay", icon: Building2 },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-xl font-bold text-emerald-700">
          HOST HUB
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Cổng thông tin quản trị cơ sở lưu trú
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {menus.map((menu) => (
          <div key={menu.title}>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-gray-400">
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
                      `flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
                        isActive
                          ? "bg-emerald-700 font-medium text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Trạng thái */}
      <div className="m-4 rounded-xl bg-gray-50 p-4">
        <p className="text-xs font-semibold text-gray-500">
          TRẠNG THÁI
        </p>
        <p className="mt-2 text-sm font-medium text-emerald-700">
          ● Đang hoạt động
        </p>
        <p className="mt-2 text-xs text-gray-500">
          Cơ sở đã được xác thực an toàn
        </p>
      </div>
    </aside>
  );
}
