import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  ShieldCheck,
  House,
  ImagePlus,
  Upload,
  Trash2,
  Star,
  FileText,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { dangKyHomeStay } from "../../../services/homestayService";
import type { PhuongXa, TinhThanh } from "../../../types/diaChi";
import { layDanhSachPhuongXa, layDanhSachTinhThanh } from "../../../services/diaChiService";

interface AnhHomeStay {
  id: string;
  file: File;
  url: string;
}

export default function DangKyThongTin() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [anhList, setAnhList] = useState<AnhHomeStay[]>([]);
  const [anhBia, setAnhBia] = useState<string | null>(null);
  const [danhSachTinhThanh, setDanhSachTinhThanh] =
    useState<TinhThanh[]>([]);

  const [danhSachPhuongXa, setDanhSachPhuongXa] =
    useState<PhuongXa[]>([]);

  const [form, setForm] = useState({
    tenHomeStay: "",
    moTa: "",
    theLoaiHomeStay: "",
    soDienThoai: "",
    email: "",
    tinhThanh: "",
    quanHuyen: "",
    phuongXa: "",
    diaChi: "",
  });


  useEffect(() => {
    const taiTinhThanh = async () => {
      try {
        const data = await layDanhSachTinhThanh();
        setDanhSachTinhThanh(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách tỉnh/thành:", error);
      }

    };
    taiTinhThanh();
  }, [])

  useEffect(() => {
    const taiPhuongXa = async () => {
      const tinhDuocChon = danhSachTinhThanh.find(
        (tinh) => tinh.name === form.tinhThanh
      );

      if (!tinhDuocChon) {
        setDanhSachPhuongXa([]);
        return;
      }

      try {
        const data = await layDanhSachPhuongXa(
          Number(tinhDuocChon.code)
        );
        setDanhSachPhuongXa(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách phường/xã:", error);
        setDanhSachPhuongXa([]);
      }
    };

    taiPhuongXa();
  }, [form.tinhThanh, danhSachTinhThanh]);


  const xuLyThayDoi = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const xuLyChonAnh = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    const anhHopLe = files.filter(
      (file) =>
        ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
        file.size <= 10 * 1024 * 1024
    );

    setAnhList((prev) => {
      const conDuocThem = Math.max(0, 20 - prev.length);
      const anhMoi = anhHopLe.slice(0, conDuocThem).map((file) => ({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
      }));

      if (!anhBia && anhMoi.length > 0) {
        setAnhBia(anhMoi[0].id);
      }

      return [...prev, ...anhMoi];
    });

    // Cho phép chọn lại cùng một file.
    e.target.value = "";
  };

  const xoaAnh = (id: string) => {
    const anhCanXoa = anhList.find((anh) => anh.id === id);

    if (anhCanXoa) {
      URL.revokeObjectURL(anhCanXoa.url);
    }

    const danhSachMoi = anhList.filter((anh) => anh.id !== id);

    setAnhList(danhSachMoi);

    if (anhBia === id) {
      setAnhBia(danhSachMoi[0]?.id ?? null);
    }
  };

  const xuLyGuiForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (anhList.length < 5) {
      alert("Vui lòng tải lên ít nhất 5 ảnh HomeStay.");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value)
    });

    anhList.forEach((anh) => {
      formData.append("files", anh.file)
    });

    try {
      const response = await dangKyHomeStay(formData);
      alert(response.data);
 
} catch (error: any) {
  console.error("Lỗi đăng ký HomeStay:", error);
  console.log("Status:", error.response?.status);
  console.log("Response data:", error.response?.data);
  console.log("Response headers:", error.response?.headers);

  alert(
    "Mã lỗi: " + (error.response?.status ?? "Không nhận được phản hồi") +
    "\nNội dung: " +
    (typeof error.response?.data === "string"
      ? error.response.data
      : JSON.stringify(error.response?.data, null, 2))
  );
}

  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-4 focus:ring-emerald-600/10";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white px-5 py-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                Hồ sơ đăng ký lưu trú
              </span>

              <span className="flex items-center gap-2 text-xs text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Đang đăng ký trực tuyến
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Đăng ký cơ sở HomeStay đối tác
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Hoàn tất thông tin cơ sở lưu trú và hình ảnh để tham gia
              mạng lưới đối tác StayWise.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
            <ShieldCheck size={30} className="shrink-0 text-emerald-700" />

            <div>
              <p className="text-xs text-gray-500">Bảo mật thông tin</p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                Thông tin được bảo vệ an toàn
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-5 py-8 lg:px-12">
        <form onSubmit={xuLyGuiForm}>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* CỘT TRÁI */}
            <div className="flex flex-col gap-8 lg:col-span-8">
              {/* THÔNG TIN HOMESTAY */}
              <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-start gap-4 border-b border-gray-100 bg-gray-50 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                    <House size={23} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold">
                      1. Thông tin cơ sở HomeStay
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Thông tin nhận diện và địa chỉ cơ sở lưu trú.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-8">
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Tên cơ sở HomeStay <span className="text-red-500">*</span>
                    </label>

                    <input
                      required
                      name="tenHomeStay"
                      value={form.tenHomeStay}
                      onChange={xuLyThayDoi}
                      className={inputClass}
                      placeholder=" Pine Hill Serenity Villa Đà Lạt"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Mô tả giới thiệu HomeStay{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      required
                      rows={4}
                      name="moTa"
                      value={form.moTa}
                      onChange={xuLyThayDoi}
                      className={`${inputClass} resize-y`}
                      placeholder="Giới thiệu không gian, kiến trúc và cảnh quan..."
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Thể loại cơ sở <span className="text-red-500">*</span>
                    </label>

                    <select
                      required
                      name="theLoaiHomeStay"
                      value={form.theLoaiHomeStay}
                      onChange={xuLyThayDoi}
                      className={inputClass}
                    >
                      <option value="">Chọn thể loại</option>
                      <option value="NGHI_DUONG">Nghỉ dưỡng</option>
                      <option value="GIA_DINH">HomeStay gia đình</option>
                      <option value="GAN_BIEN">HomeStay gần biển</option>
                      <option value="VUNG_NUI">HomeStay vùng núi</option>
                      <option value="TRUNG_TAM_THANH_PHO">HomeStay trung tâm thành phố</option>
                      <option value="NHA_VUON">Nhà vườn</option>
                      <option value="CAN_HO">Căn hộ</option>
                      <option value="NHA_GO">Nhà gỗ</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>

                    <input
                      required
                      type="tel"
                      name="soDienThoai"
                      value={form.soDienThoai}
                      onChange={xuLyThayDoi}
                      className={inputClass}
                      placeholder="09xxxxxxxx"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Email liên hệ <span className="text-red-500">*</span>
                    </label>

                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={xuLyThayDoi}
                      className={inputClass}
                      placeholder="homestay@example.com"
                    />
                  </div>

                  <div>
                    <label className={labelClass}>
                      Tỉnh / Thành phố{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      required
                      name="tinhThanh"
                      value={form.tinhThanh}
                      onChange={(e) => {
                        setForm((prev) => ({
                          ...prev,
                          tinhThanh: e.target.value,
                          phuongXa: "",
                        }));
                      }}
                      className={inputClass}
                    >
                      <option value="">Chọn tỉnh/thành phố</option>
                      {danhSachTinhThanh.map((tinh) => (
                        <option key={tinh.code} value={tinh.name}>
                          {tinh.name}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div>
                    <label className={labelClass}>
                      Phường / Xã <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="phuongXa"
                      value={form.phuongXa}
                      onChange={xuLyThayDoi}
                      required
                      disabled={!form.tinhThanh}
                      className={inputClass}
                    >
                      <option value="">Chọn phường/xã</option>

                      {danhSachPhuongXa.map((phuong) => (
                        <option key={phuong.code} value={phuong.name}>
                          {phuong.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>
                      <MapPin size={14} className="mr-1 inline" />
                      Địa chỉ chi tiết{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      required
                      name="diaChi"
                      value={form.diaChi}
                      onChange={xuLyThayDoi}
                      className={inputClass}
                      placeholder="Số nhà, tên đường..."
                    />
                  </div>
                </div>
              </section>

              {/* HÌNH ẢNH HOMESTAY */}
              <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex flex-col justify-between gap-4 border-b border-gray-100 bg-gray-50 p-6 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white">
                      <ImagePlus size={23} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold">
                        2. Hình ảnh thực tế HomeStay
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Tải lên ít nhất 5 ảnh, tối đa 20 ảnh.
                      </p>
                    </div>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {anhList.length}/20 ảnh
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <input
                    ref={inputFileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={xuLyChonAnh}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => inputFileRef.current?.click()}
                    className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center transition hover:border-emerald-600 hover:bg-emerald-50/50"
                  >
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Upload size={26} />
                    </div>

                    <p className="text-sm font-semibold text-gray-800">
                      <span className="text-emerald-700">
                        Nhấn để chọn ảnh
                      </span>{" "}
                      từ máy tính
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Hỗ trợ JPG, PNG, WEBP · Tối đa 10MB mỗi ảnh
                    </p>
                  </button>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold">
                      Danh sách ảnh đã chọn
                    </h3>

                    <span className="text-xs text-gray-500">
                      {anhList.length} ảnh
                    </span>
                  </div>

                  {anhList.length === 0 ? (
                    <div className="mt-4 rounded-xl border border-gray-100 px-4 py-8 text-center">
                      <ImagePlus
                        size={32}
                        className="mx-auto text-gray-300"
                      />

                      <p className="mt-3 text-sm text-gray-500">
                        Chưa có ảnh nào. Hãy chọn ảnh HomeStay của bạn.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                      {anhList.map((anh) => (
                        <div
                          key={anh.id}
                          className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200"
                        >
                          <img
                            src={anh.url}
                            alt="Ảnh HomeStay"
                            className="h-full w-full object-cover"
                          />

                          {anhBia === anh.id && (
                            <span className="absolute left-2 top-2 rounded-md bg-emerald-700 px-2 py-1 text-[10px] font-bold text-white">
                              Ảnh bìa
                            </span>
                          )}

                          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100">
                            <button
                              type="button"
                              title="Đặt làm ảnh bìa"
                              onClick={() => setAnhBia(anh.id)}
                              className="rounded-lg bg-white p-2 text-emerald-700 hover:bg-emerald-50"
                            >
                              <Star size={16} />
                            </button>

                            <button
                              type="button"
                              title="Xóa ảnh"
                              onClick={() => xoaAnh(anh.id)}
                              className="rounded-lg bg-white p-2 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {anhList.length > 0 && anhList.length < 5 && (
                    <p className="mt-4 text-sm text-amber-700">
                      Bạn cần tải thêm {5 - anhList.length} ảnh để đủ số
                      lượng tối thiểu.
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* CỘT PHẢI */}
            <aside className="flex flex-col gap-6 lg:col-span-4">
              <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <FileText size={21} />
                  </div>

                  <h2 className="font-bold">Thông tin hồ sơ</h2>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        Thông tin HomeStay
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Cung cấp thông tin chính xác về cơ sở lưu trú.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ImagePlus
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold">Hình ảnh cơ sở</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Chuẩn bị tối thiểu 5 ảnh thực tế.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <div>
                      <p className="text-sm font-semibold">Xét duyệt hồ sơ</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Hồ sơ sẽ được xử lý theo quy trình của StayWise.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
                <ShieldCheck size={28} className="text-emerald-700" />

                <h3 className="mt-3 font-bold text-emerald-900">
                  Lưu ý khi đăng ký
                </h3>

                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  Hãy kiểm tra thông tin liên hệ, địa chỉ và hình ảnh trước
                  khi gửi hồ sơ. Các trường bắt buộc cần được điền đầy đủ.
                </p>
              </section>

              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold">Số ảnh hiện tại</p>

                <div className="mt-3 flex items-end justify-between">
                  <span className="text-3xl font-bold text-emerald-700">
                    {anhList.length}
                  </span>

                  <span className="text-sm text-gray-500">/ 20 ảnh</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{
                      width: `${(anhList.length / 20) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* NÚT CUỐI TRANG */}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:p-6">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Quay lại
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-600/20"
            >
              Gửi hồ sơ đăng ký
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}