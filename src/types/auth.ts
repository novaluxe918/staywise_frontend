export type VaiTro = "USER" | "OWNER";

export interface DangKyDTO{
    hoTen: string,
    email: string,
    soDienThoai: string;
  matKhau: string;
  xacNhanMatKhau: string;
  vaiTro: VaiTro;
  
}