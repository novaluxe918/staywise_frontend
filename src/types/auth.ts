export type VaiTro = "USER" | "OWNER" | "ADMIN";

export interface DangKyDTO{
    hoTen: string,
    email: string,
    soDienThoai: string;
  matKhau: string;
  xacNhanMatKhau: string;
  vaiTro: VaiTro;
  
}

export interface DangNhapRequest{
    email : string;
    matKhau : string;
}

export interface DangNhapResponse{
    token: string;
    id: number;
    email: string;
     vaiTro: "USER" | "OWNER" |  "ADMIN"; 
    hoTen: string;
     anhDaiDien: string | null;
}