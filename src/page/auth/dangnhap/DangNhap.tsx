import React from 'react';
import DangNhapForm from '../../../components/auth/dangnhap/DangNhapForm';

function DangNhap() {
    return (
       <main className='min-h-screen  bg-[#F5F6F1] p-4 md:p-8'>
           <div className='mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2'>
              <section className='flex flex-col justify-center  p-8 text-white md:p-12' style={{backgroundImage: "url('https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200')"}}>
                  <h1 className='text-4xl font-bold'>Mỗi chuyến đi, một nơi để nhớ</h1>

                    <p className="mt-5  leading-7 text-emerald-100">
            Khám phá những HomeStay tuyệt vời cùng StayWise.
          </p>
              </section>
              <section className='flex items-center justify-center p-6 md:p-12 '>
                   <DangNhapForm />
              </section>
           </div>
       </main>
    );
}

export default DangNhap;