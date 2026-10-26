import React from 'react';
import DangKyForm from '../../../components/auth/dangky/DangKyForm';
import { Sparkles } from 'lucide-react';

function DangKy() {
    return (
          <main className="min-h-screen bg-white lg:grid lg:grid-cols-2">
      {/* Bên trái: Hình ảnh HomeStay */}
      <section
        className="relative hidden min-h-screen bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(8,45,34,0.85), rgba(8,45,34,0.05)), url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1200&q=85')",
        }}
      >
        <div className="relative flex min-h-screen flex-col justify-between p-10 text-white">
          <div className="flex items-center gap-3">
            <Sparkles size={32} />
            <span className="text-3xl font-bold">StayWise</span>
          </div>

          <div className="max-w-lg pb-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest">
              Welcome to StayWise
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              Mỗi hành trình,
              <br />
              một nơi để trở về.
            </h1>

            <p className="mt-5 text-lg leading-8 text-white/85">
              Khám phá những HomeStay tuyệt vời hoặc bắt đầu
              hành trình kinh doanh chỗ ở của riêng bạn.
            </p>
          </div>

          <p className="text-sm text-white/75">
            © 2026 StayWise
          </p>
        </div>
      </section>

      {/* Bên phải: Form đăng ký */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <span className="text-2xl font-bold text-emerald-900">
              StayWise
            </span>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-800">
            Chào mừng bạn
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Đăng ký tài khoản
          </h2>

          <p className="mb-7 mt-3 text-sm leading-6 text-gray-500">
            Tham gia StayWise để tìm kiếm nơi nghỉ dưỡng
            hoặc quản lý HomeStay của bạn.
          </p>

          <DangKyForm />

          <p className="mt-6 text-center text-xs leading-5 text-gray-400">
            Vui lòng cung cấp thông tin chính xác khi đăng ký.
          </p>
        </div>
      </section>
    </main>
    );
}

export default DangKy;