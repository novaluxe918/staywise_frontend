import React from 'react';

function Home() {
    return (
      <div>
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0a1526] via-[#0f1d33] to-[#14233c] px-6 pb-28 pt-16 text-white lg:pb-36">

        {/* Ánh sáng nền */}
        <div className="pointer-events-none absolute -top-32 left-1/4 h-[38rem] w-[38rem] rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/15 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 top-1/4 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tl from-amber-500/20 to-teal-500/15 blur-3xl" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(20,184,166,0.15),rgba(10,21,38,0.85)_75%)]" />

        {/* NỘI DUNG HERO */}
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-200">
              Kỳ nghỉ thảnh thơi cùng StayWise
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Tìm Kiếm Chốn Dừng Chân Lý Tưởng
            <br className="hidden sm:inline" />

            <span className="bg-gradient-to-r from-teal-300 via-emerald-200 to-amber-300 bg-clip-text text-transparent">
              {" "}Cho Chuyến Đi Của Bạn
            </span>
          </h1>

          <p className="mb-10 mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Khám phá hàng ngàn homestay ấm cúng, biệt thự nghỉ dưỡng
            và chốn ẩn mình tuyệt đẹp khắp Việt Nam với mức giá
            minh bạch, tốt nhất.
          </p>

     
          <div className="w-full max-w-5xl rounded-3xl border border-white/80 bg-white p-5 text-left shadow-2xl lg:p-7">

            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
              <button
                type="button"
                className="shrink-0 rounded-full bg-teal-700 px-4 py-2 text-xs font-medium text-white"
              >
                Tất cả chỗ nghỉ
              </button>

              <button
                type="button"
                className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-teal-50"
              >
                Villa có hồ bơi
              </button>
            </div>

            
            <div className="rounded-2xl border border-slate-200 p-5 text-sm text-slate-500">
              Khu vực tìm kiếm homestay
            </div>

          </div>
        </div>
      </section>

     
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Khám phá những chốn nghỉ dưỡng nổi bật
          </h2>

          <p className="mt-3 text-slate-600">
            Những homestay tuyệt vời đang chờ bạn khám phá.
          </p>

        </div>
      </section>
    </div>
    );
}

export default Home;