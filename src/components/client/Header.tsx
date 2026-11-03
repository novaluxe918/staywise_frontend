import { ChevronDown, Heart, LogIn, Menu, UserRound, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
    const [menu, setMenu] = useState(false);
   const { nguoiDung, token, dangXuat } = useAuth();

  const tenNguoiDung = nguoiDung?.hoTen;

    const navItems = [
        { label: "Trang chủ", path: "/" },
        { label: "Khám phá", path: "/kham-pha" },
        { label: "Ưu đãi", path: "/uu-dai" },
        { label: "Về chúng tôi", path: "/ve-chung-toi" },
    ];

    const navClass = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition-colors duration-200 ${isActive ? "text-teal-300"
            : "text-white/80 hover:text-teal-300"} `
    return (
         <header className="relative z-50 w-full bg-[#0a1526]/95 text-white shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* LOGO */}
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-lg shadow-teal-500/20">
            <span className="text-xl font-extrabold text-white">
              S
            </span>
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight">
              Stay<span className="text-teal-400">Wise</span>
            </h1>
            <p className="text-[10px] tracking-widest text-slate-400">
              YOUR PERFECT STAY
            </p>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={navClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/yeu-thich"
            aria-label="Danh sách yêu thích"
            className="rounded-full p-2.5 text-white/80 transition hover:bg-white/10 hover:text-teal-300"
          >
            <Heart size={20} />
          </Link>

          {token ? (
            <Link
              to="/tai-khoan"
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 transition hover:bg-white/10"
            >
              <UserRound size={18} className="text-teal-300" />

              <span className="max-w-32 truncate text-sm font-medium">
                {tenNguoiDung || nguoiDung?.email || "Tài khoản của tôi"}
              </span>

              <ChevronDown size={16} />
            </Link>
          ) : (
            <>
              <Link
                to="/dang-nhap"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/90 transition hover:text-teal-300"
              >
                <LogIn size={17} />
                Đăng nhập
              </Link>

              <Link
                to="/dang-ky"
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal-900/30 transition hover:bg-teal-500"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* BUTTON MOBILE */}
        <button
          type="button"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Đóng menu" : "Mở menu"}
          aria-expanded={menu}
          className="rounded-lg p-2 transition hover:bg-white/10 md:hidden"
        >
          {menu ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      {menu && (
        <div className="border-t border-white/10 bg-[#0a1526] px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMenu(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-teal-500/10 text-teal-300"
                      : "text-white/80 hover:bg-white/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            {token ? (
              <Link
                to="/tai-khoan"
                onClick={() => setMenu(false)}
                className="rounded-xl bg-teal-600 px-4 py-3 text-center text-sm font-bold"
              >
                {tenNguoiDung || "Tài khoản của tôi"}
              </Link>
            ) : (
              <>
                <Link
                  to="/dang-nhap"
                  onClick={() => setMenu(false)}
                  className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-semibold"
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/dang-ky"
                  onClick={() => setMenu(false)}
                  className="rounded-xl bg-teal-600 px-4 py-3 text-center text-sm font-bold"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
    );
}

export default Header;