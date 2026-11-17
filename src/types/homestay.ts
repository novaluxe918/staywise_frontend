

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
  moTa: string;
  phuongXa: string;
  tinhThanh: string;
  diaChi: string;
  soDienThoai: string;
  email: string;
  trangThaiHomeStay: string;
  tienIchHienThi: string[];
  dichVuHienThi: string[];
  danhSachHinhAnh: HinhAnhHomeStay[];
}

export interface AnhHomeStay {
  id: string;
  file: File;
  url: string;
}

