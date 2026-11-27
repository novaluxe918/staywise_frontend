

export interface TheLoaiHomeStayResponse {
  value: string;
  label: string;
}

export interface HinhAnhHomeStay {
  id: number;
  duongDan: string;
  laAnhDaiDien: boolean
}

export interface HomeStayRequest {
  tenHomeStay: string;
  moTa: string;
  phuongXa: string;
  tinhThanh: string;
  diaChi: string;
  soDienThoai: string;
  email: string;
  theLoaiHomeStay: string;

}


export interface HomeStay {
  id: number;
  tenHomeStay: string;
  tenChuHomeStay: string;
  tenTheLoaiHomeStay: string | null;
  moTa: string;
  phuongXa: string;
  tinhThanh: string;
  diaChi: string;
  soDienThoai: string;
  email: string;
  trangThaiHomeStay: string;
  ngayDangKy?: string;
  danhSachTienIchHS: number[];
  danhSachDichVuHS: number[];
  theLoaiHomeStay: string;
  tienIchHienThi: string[];
  dichVuHienThi: string[];
  danhSachHinhAnh: HinhAnhHomeStay[];
  giaThapNhat: number | null;
}

export interface AnhHomeStay {
  id: string;
  file: File;
  url: string;
}


export interface HomeStayOption {
  id: number;
  tenHomeStay: string;
}

