import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  House,
  ImagePlus,
  Upload,
  Trash2,
  Star,
  MapPin,
  Sparkles,
  ConciergeBell,
  Check,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { dangKyHomeStay, getAllTheLoaiHomeStay } from "../../../services/homestayService";
import type { PhuongXa, TinhThanh } from "../../../types/diaChi";
import {
  layDanhSachPhuongXa,
  layDanhSachTinhThanh,
} from "../../../services/diaChiService";
import type { HomeStayRequest, TheLoaiHomeStayResponse } from "../../../types/homestay";
import type { DichVu } from "../../../types/dichVu";
import { searchDichVu } from "../../../services/dichVuService";
import type { TienIch } from "../../../types/tienIch";
import { getAllTienIch } from "../../../services/tienIchService";
import { useUploadAnh } from "../../../hooks/useUploadAnh";
import { toast } from "../../../utils/toast";


const emeraldFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#fff",
    fontSize: 14,
    "& fieldset": { borderColor: "#e2e8f0" },
    "&:hover fieldset": { borderColor: "#94a3b8" },
    "&.Mui-focused fieldset": { borderColor: "#07845f", borderWidth: 1.5 },
  },
  "& .MuiInputLabel-root": { fontSize: 13 },
  "& .MuiInputLabel-root.Mui-focused": { color: "#07845f" },
};

const sectionSx = {
  border: "1px solid #e7ece9",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 5px 20px rgba(15, 23, 42, 0.035)",
  backgroundColor: "#fff",
};

function SectionHeading({
  number,
  icon,
  title,
  description,
  trailing,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  trailing?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: { xs: 2, md: 2.5 },
        py: 1.8,
        borderBottom: "1px solid #edf1ee",
        background: "linear-gradient(110deg, #fbfdfc 0%, #f5faf7 100%)",
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: "center", minWidth: 0 }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "12px",
            bgcolor: "#e5f5ed",
            color: "#087653",
          }}
        >
          {icon}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 15, fontWeight: 750, color: "#172b24" }}>
            <Box component="span" sx={{ color: "#07845f", mr: 0.7 }}>
              {number}.
            </Box>
            {title}
          </Typography>
          <Typography sx={{ mt: 0.25, fontSize: 12, color: "#718078" }}>
            {description}
          </Typography>
        </Box>
      </Stack>
      {trailing}
    </Box>
  );
}

export default function DangKyThongTin() {
  const [form, setForm] = useState<HomeStayRequest>({
    tenHomeStay: "",
    moTa: "",
    theLoaiHomeStay: "",
    soDienThoai: "",
    email: "",
    tinhThanh: "",
    phuongXa: "",
    diaChi: "",
  });

  const {
    anhList,
    anhBia,
    handleChonAnh,
    xoaAnh,
    xoaTatCaAnh,
    chonAnhBia,
  } = useUploadAnh({
    nhieuAnh: true,
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
    dinhDang: ["image/jpeg", "image/png", "image/webp"],
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [dangLuu, setDangLuu] = useState(false);
  const [danhSachTinhThanh, setDanhSachTinhThanh] = useState<TinhThanh[]>([]);
  const [danhSachPhuongXa, setDanhSachPhuongXa] = useState<PhuongXa[]>([]);

  const [danhSachTienIch, setDanhSachTienIch] = useState<TienIch[]>([]);
  const [tienIchDaChon, setTienIchDaChon] = useState<number[]>([]);
  const [dangTaiTienIch, setDangTaiTienIch] = useState(false);

  const [danhSachDichVu, setDanhSachDichVu] = useState<DichVu[]>([])
  const [dichVuDaChon, setDichVuDaChon] = useState<number[]>([]);
  const [dangTaiDichVu, setDangTaiDichVu] = useState(false);

  const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiHomeStayResponse[]>([]);
  const [dangTaiTheLoai, setDangTaiTheLoai] = useState(false);

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
  }, []);

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
        const data = await layDanhSachPhuongXa(Number(tinhDuocChon.code));
        setDanhSachPhuongXa(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách phường/xã:", error);
        setDanhSachPhuongXa([]);
      }
    };
    taiPhuongXa();
  }, [form.tinhThanh, danhSachTinhThanh]);

  useEffect(() => {
    const taiDanhSachTienIch = async () => {
      try {
        setDangTaiTienIch(true);

        const response = await getAllTienIch("", 0, 5);

        setDanhSachTienIch(response.content);
      } catch (error) {
        console.error("Lỗi lấy danh sách tiện ích:", error);
      } finally {
        setDangTaiTienIch(false);
      }
    };

    taiDanhSachTienIch();
  }, []);

  useEffect(() => {
    const taiDanhSachDichVu = async () => {
      try {

        setDangTaiDichVu(true);
        const response = await searchDichVu("", 0, 5);

        setDanhSachDichVu(response.content);
      } catch (error) {
        console.error("Lỗi lấy danh sách dịch vụ:", error);
      } finally {
        setDangTaiDichVu(false)
      }
    };
    taiDanhSachDichVu();
  }, []);

  useEffect(() => {
    const layDanhSachTheLoai = async () => {
      try {
        setDangTaiTheLoai(true);

        const data = await getAllTheLoaiHomeStay();

        setDanhSachTheLoai(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách thể loại HomeStay:", error);
        toast.error("Không thể tải danh sách thể loại HomeStay!");
      } finally {
        setDangTaiTheLoai(false);
      }
    };

    layDanhSachTheLoai();
  }, []);
  const xuLyThayDoi = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTienIch = (id: number) => {
    setTienIchDaChon((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleDichVu = (id: number) => {
    setDichVuDaChon((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id])
  };





  const xuLyGuiForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dangLuu) return;

    if (anhList.length < 5) {
      toast.warning("Vui lòng tải lên ít nhất 5 ảnh HomeStay!");
      return;
    }

    if (!anhBia) {
      toast.warning("Vui lòng chọn ảnh bìa HomeStay!");
      return;
    }

    setDangLuu(true);

    try {
      const data = new FormData();

      // Thông tin HomeStay
      Object.entries(form).forEach(([key, value]) => {
        data.append(key, String(value ?? ""));
      });

      // Danh sách ảnh
      anhList.forEach((anh) => {
        data.append("files", anh.file);
      });

      // Vị trí ảnh bìa
      const viTriAnhBia = anhList.findIndex(
        (anh) => anh.id === anhBia
      );

      data.append("anhBiaIndex", String(viTriAnhBia));

      // Danh sách tiện ích
      tienIchDaChon.forEach((id) => {
        data.append("danhSachTienIchHS", String(id));
      });

      // Danh sách dịch vụ
      dichVuDaChon.forEach((id) => {
        data.append("danhSachDichVuHS", String(id));
      });

      // KIỂM TRA DỮ LIỆU TRƯỚC KHI GỬI
      console.log("========== DỮ LIỆU ĐĂNG KÝ ==========");
      data.forEach((value, key) => {
        console.log(key, value);
      });
      console.log("====================================");

      const response = await dangKyHomeStay(data);

      console.log("KẾT QUẢ BACKEND:", response.data);

      toast.success("Đăng ký HomeStay thành công!");

      setForm({
        tenHomeStay: "",
        moTa: "",
        phuongXa: "",
        tinhThanh: "",
        diaChi: "",
        soDienThoai: "",
        email: "",
        theLoaiHomeStay: "",
      });

      xoaTatCaAnh();
      setTienIchDaChon([]);
      setDichVuDaChon([]);

    } catch (error: any) {
      console.error("LỖI ĐĂNG KÝ HOMESTAY:", error);

      console.log("Error message:", error.message);
      console.log("Error code:", error.code);
      console.log("Error response:", error.response);
      console.log("Error request:", error.request);

      const message =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message ??
          "Không thể kết nối đến máy chủ. Vui lòng thử lại.";

      toast.error(message);

    } finally {
      setDangLuu(false);
    }
  };



  const soBuocHoanThanh = (form.tenHomeStay.trim() && form.moTa.trim() && form.email.trim() ? 1 : 0)
    + (anhList.length >= 5 ? 1 : 0)
    + (tienIchDaChon.length > 0 || dichVuDaChon.length > 0 ? 1 : 0);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f8f6", pb: 12 }}>
      {/* Header gọn, có phân cấp rõ ràng */}
      <Box sx={{ bgcolor: "#fff", borderBottom: "1px solid #e7ece9" }}>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          <Stack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "13px",
                  bgcolor: "#087653",
                  color: "#fff",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <House size={22} />
              </Box>
              <Box>
                <Typography
                  component="h1"
                  sx={{ fontSize: { xs: 19, md: 22 }, fontWeight: 800, color: "#18352a", letterSpacing: "-0.5px" }}
                >
                  Đăng ký HomeStay
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: "#718078", mt: 0.2 }}>
                  Cung cấp thông tin để bắt đầu kinh doanh trên StayWise
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <ShieldCheck size={17} color="#07845f" />
              <Typography sx={{ fontSize: 12, color: "#64756c" }}>
                Thông tin của bạn được bảo mật
              </Typography>
            </Stack>
          </Stack>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
            {[
              { label: "Thông tin", done: !!(form.tenHomeStay.trim() && form.moTa.trim() && form.email.trim()) },
              { label: "Hình ảnh", done: anhList.length >= 5 },
              { label: "Tiện ích", done: tienIchDaChon.length > 0 || dichVuDaChon.length > 0 },
            ].map((step, index) => (
              <Box key={step.label} sx={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0, gap: 0.8 }}>
                <Box
                  sx={{
                    width: 23,
                    height: 23,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    bgcolor: step.done ? "#087653" : "#edf2ef",
                    color: step.done ? "#fff" : "#84928a",
                    fontSize: 11,
                    fontWeight: 750,
                  }}
                >
                  {step.done ? <Check size={13} /> : index + 1}
                </Box>
                <Typography sx={{ fontSize: 11.5, fontWeight: 650, color: step.done ? "#087653" : "#7b8981", whiteSpace: "nowrap" }}>
                  {step.label}
                </Typography>
                {index < 2 && <Box sx={{ height: 1, flex: 1, bgcolor: "#e2e9e4", minWidth: 12 }} />}
              </Box>
            ))}
            <Typography sx={{ fontSize: 11, color: "#7b8981", whiteSpace: "nowrap", ml: 0.5 }}>
              {soBuocHoanThanh}/3
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pt: 2.5, px: { xs: 1.5, sm: 2.5 } }}>
        <form onSubmit={xuLyGuiForm}>
          <Grid container spacing={2}>
            {/* Cột trái */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Stack spacing={2}>
                <Paper elevation={0} sx={sectionSx}>
                  <SectionHeading
                    number="01"
                    icon={<House size={20} />}
                    title="Thông tin cơ sở"
                    description="Thông tin nhận diện và địa chỉ HomeStay của bạn"
                  />
                  <Box sx={{ p: { xs: 2, md: 2.5 } }}>
                    <Grid container spacing={1.8}>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth required size="small" label="Tên cơ sở HomeStay" name="tenHomeStay" value={form.tenHomeStay} onChange={xuLyThayDoi} placeholder="Ví dụ: Pine Hill Serenity Villa Đà Lạt" sx={emeraldFieldSx} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth required size="small" multiline rows={3} label="Mô tả giới thiệu HomeStay" name="moTa" value={form.moTa} onChange={xuLyThayDoi} placeholder="Giới thiệu không gian, kiến trúc và cảnh quan..." sx={emeraldFieldSx} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          select
                          fullWidth
                          required
                          size="small"
                          label="Thể loại cơ sở"
                          name="theLoaiHomeStay"
                          value={form.theLoaiHomeStay}
                          onChange={xuLyThayDoi}
                          sx={emeraldFieldSx}
                          disabled={dangTaiTheLoai}
                        >
                          <MenuItem value="" disabled>
                            {dangTaiTheLoai
                              ? "Đang tải thể loại..."
                              : "Chọn thể loại"}
                          </MenuItem>

                          {danhSachTheLoai.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth required size="small" type="tel" label="Số điện thoại" name="soDienThoai" value={form.soDienThoai} onChange={xuLyThayDoi} placeholder="09xxxxxxxx" sx={emeraldFieldSx} />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth required size="small" type="email" label="Email liên hệ" name="email" value={form.email} onChange={xuLyThayDoi} placeholder="homestay@example.com" sx={emeraldFieldSx} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth required size="small" label="Tỉnh / Thành phố" name="tinhThanh" value={form.tinhThanh} onChange={(e) => setForm((prev) => ({ ...prev, tinhThanh: e.target.value, phuongXa: "" }))} sx={emeraldFieldSx}>
                          <MenuItem value="" disabled>Chọn tỉnh/thành phố</MenuItem>
                          {danhSachTinhThanh.map((tinh) => <MenuItem key={tinh.code} value={tinh.name}>{tinh.name}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField select fullWidth required size="small" label="Phường / Xã" name="phuongXa" value={form.phuongXa} onChange={xuLyThayDoi} disabled={!form.tinhThanh} sx={emeraldFieldSx}>
                          <MenuItem value="" disabled>Chọn phường/xã</MenuItem>
                          {danhSachPhuongXa.map((phuong) => <MenuItem key={phuong.code} value={phuong.name}>{phuong.name}</MenuItem>)}
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <TextField fullWidth required size="small" label="Địa chỉ chi tiết" name="diaChi" value={form.diaChi} onChange={xuLyThayDoi} placeholder="Số nhà, tên đường..." slotProps={{ input: { startAdornment: <MapPin size={16} style={{ marginRight: 8, color: "#94a3b8", flexShrink: 0 }} /> } }} sx={emeraldFieldSx} />
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>

                <Paper elevation={0} sx={sectionSx}>
                  <SectionHeading
                    number="02"
                    icon={<ImagePlus size={20} />}
                    title="Hình ảnh HomeStay"
                    description="Tải lên từ 5 đến 20 hình ảnh thực tế"
                    trailing={
                      <Chip
                        label={`${anhList.length}/20`}
                        size="small"
                        sx={{ bgcolor: "#e7f6ee", color: "#087653", fontWeight: 750, borderRadius: 2 }}
                      />
                    }
                  />
                  <Box sx={{ p: { xs: 2, md: 2.5 } }}>
                    <input ref={inputFileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleChonAnh} style={{ display: "none" }} />
                    <Box
                      onClick={() => inputFileRef.current?.click()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") inputFileRef.current?.click();
                      }}
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: { xs: 2, md: 2.5 },
                        border: "1px dashed #9ccdb7",
                        borderRadius: "12px",
                        bgcolor: "#f7fcf9",
                        transition: "0.2s",
                        "&:hover": { borderColor: "#07845f", bgcolor: "#eff9f3" },
                      }}
                    >
                      <Box sx={{ width: 46, height: 46, flexShrink: 0, display: "grid", placeItems: "center", borderRadius: "12px", bgcolor: "#e1f4e9", color: "#087653" }}>
                        <Upload size={21} />
                      </Box>
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 750, color: "#234236" }}>
                          Chọn ảnh từ thiết bị
                        </Typography>
                        <Typography sx={{ fontSize: 11.5, color: "#7b8981", mt: 0.35 }}>
                          JPG, PNG hoặc WEBP · Tối đa 10MB mỗi ảnh
                        </Typography>
                      </Box>
                      <Button size="small" variant="outlined" sx={{ display: { xs: "none", sm: "inline-flex" }, borderColor: "#b7d9c6", color: "#087653", borderRadius: 2, textTransform: "none", fontWeight: 700 }}>
                        Duyệt ảnh
                      </Button>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2, mb: 1.2 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 750, color: "#263b32" }}>Ảnh đã tải lên</Typography>
                      <Typography sx={{ fontSize: 11.5, color: "#819087" }}>{anhList.length} ảnh đã chọn</Typography>
                    </Box>

                    {anhList.length === 0 ? (
                      <Box sx={{ py: 3, textAlign: "center", border: "1px solid #edf1ee", borderRadius: 2.5 }}>
                        <ImagePlus size={25} color="#b7c5bd" />
                        <Typography sx={{ mt: 0.8, fontSize: 12, color: "#819087" }}>Ảnh bạn chọn sẽ hiển thị tại đây</Typography>
                      </Box>
                    ) : (
                      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", xl: "repeat(4, minmax(0, 1fr))" }, gap: 1.3 }}>
                        {anhList.map((anh) => (
                          <Box key={anh.id} sx={{ position: "relative", aspectRatio: "4 / 3", overflow: "hidden", border: anhBia === anh.id ? "2px solid #07845f" : "1px solid #e4ebe6", borderRadius: 2.5, "&:hover .image-actions": { opacity: 1 } }}>
                            <Box component="img" src={anh.url} alt="Ảnh HomeStay" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            {anhBia === anh.id && <Chip label="Ảnh đại diện" size="small" icon={<Star size={12} />} sx={{ position: "absolute", top: 7, left: 7, height: 23, fontSize: 10, fontWeight: 750, bgcolor: "#087653", color: "#fff", "& .MuiChip-icon": { color: "#fff" } }} />}
                            <Box className="image-actions" sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 1, bgcolor: "rgba(12, 30, 22, 0.42)", opacity: { xs: 1, sm: 0 }, transition: "0.2s" }}>
                              <Tooltip title="Đặt làm ảnh đại diện"><IconButton size="small" onClick={() => chonAnhBia(anh.id)} sx={{ bgcolor: "#fff", color: "#087653", "&:hover": { bgcolor: "#e8f6ed" } }}><Star size={15} /></IconButton></Tooltip>
                              <Tooltip title="Xóa ảnh"><IconButton size="small" onClick={() => xoaAnh(anh.id)} sx={{ bgcolor: "#fff", color: "#dc2626", "&:hover": { bgcolor: "#fef2f2" } }}><Trash2 size={15} /></IconButton></Tooltip>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    )}
                    {anhList.length > 0 && anhList.length < 5 && (
                      <Typography sx={{ mt: 1.3, fontSize: 11.5, color: "#b7791f", fontWeight: 650 }}>
                        Cần thêm {5 - anhList.length} ảnh để đạt số lượng tối thiểu.
                      </Typography>
                    )}
                  </Box>
                </Paper>
              </Stack>
            </Grid>

            {/* Cột phải */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Box sx={{ position: { lg: "sticky" }, top: { lg: 16 } }}>
                <Paper elevation={0} sx={sectionSx}>
                  <SectionHeading
                    number="03"
                    icon={<Sparkles size={20} />}
                    title="Tiện ích & dịch vụ"
                    description="Tạo trải nghiệm tốt hơn cho khách"
                  />
                  <Box sx={{ p: { xs: 2, md: 2.2 } }}>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 0.9 }}>
                      {dangTaiTienIch ? (
                        <Typography sx={{ fontSize: 12, color: "#64748b", py: 2 }}>
                          Đang tải danh sách tiện ích...
                        </Typography>
                      ) : danhSachTienIch.length === 0 ? (
                        <Typography sx={{ fontSize: 12, color: "#64748b", py: 2 }}>
                          Chưa có tiện ích nào.
                        </Typography>
                      ) : (
                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                            gap: 0.9,
                          }}
                        >
                          {danhSachTienIch
                            .filter((item) => item.trangThai === "DANG_HOAT_DONG")
                            .map((item) => {
                              const daChon = tienIchDaChon.includes(item.id);

                              return (
                                <Box
                                  key={item.id}
                                  onClick={() => toggleTienIch(item.id)}
                                  role="button"
                                  tabIndex={0}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      toggleTienIch(item.id);
                                    }
                                  }}
                                  sx={{
                                    minHeight: 48,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.8,
                                    px: 1,
                                    py: 0.8,
                                    border: "1px solid",
                                    borderColor: daChon ? "#75b99a" : "#e7ece9",
                                    borderRadius: "9px",
                                    bgcolor: daChon ? "#eff9f3" : "#fff",
                                    color: daChon ? "#176447" : "#5f6e65",
                                    "&:hover": {
                                      borderColor: "#75b99a",
                                    },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 17,
                                      height: 17,
                                      flexShrink: 0,
                                      display: "grid",
                                      placeItems: "center",
                                      border: "1px solid",
                                      borderColor: daChon ? "#07845f" : "#cbd5ce",
                                      borderRadius: "5px",
                                      bgcolor: daChon ? "#07845f" : "#fff",
                                      color: "#fff",
                                    }}
                                  >
                                    {daChon && <Check size={12} strokeWidth={3} />}
                                  </Box>

                                  <Typography
                                    sx={{
                                      fontSize: 11.2,
                                      lineHeight: 1.3,
                                      fontWeight: daChon ? 700 : 500,
                                    }}
                                  >
                                    {item.tenTienIch}
                                  </Typography>
                                </Box>
                              );
                            })}
                        </Box>
                      )}
                    </Box>

                    <Divider sx={{ my: 2.2, borderColor: "#edf1ee" }} />

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                        <ConciergeBell size={17} color="#087653" />
                        <Typography sx={{ fontSize: 13, fontWeight: 750, color: "#263b32" }}>Dịch vụ bổ sung</Typography>
                      </Box>
                      <Chip size="small" label={`${dichVuDaChon.length} đang bật`} sx={{ height: 23, bgcolor: "#e7f6ee", color: "#087653", fontWeight: 750, fontSize: 10.5 }} />
                    </Box>
                    <Stack spacing={1}>
                      {dangTaiDichVu ? (
                        <Typography sx={{ fontSize: 12, color: "#64748b", py: 2 }}>
                          Đang tải danh sách dịch vụ...
                        </Typography>
                      ) : danhSachDichVu.length === 0 ? (
                        <Typography sx={{ fontSize: 12, color: "#64748b", py: 2 }}>
                          Chưa có dịch vụ nào.
                        </Typography>
                      ) : (
                        <Stack spacing={1}>
                          {danhSachDichVu
                            .filter((dv) => dv.trangThai === "DANG_HOAT_DONG")
                            .map((dv) => {
                              const kichHoat = dichVuDaChon.includes(dv.id);

                              return (
                                <Paper
                                  key={dv.id}
                                  elevation={0}
                                  sx={{
                                    p: 1.25,
                                    border: "1px solid",
                                    borderColor: kichHoat ? "#8bc5a6" : "#e7ece9",
                                    borderRadius: "10px",
                                    bgcolor: kichHoat ? "#f2faf5" : "#fff",
                                  }}
                                >
                                  <Stack
                                    component="div"
                                    direction="row"
                                    sx={{ alignItems: "center", justifyContent: "space-between" }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: 12.5,
                                        fontWeight: 700,
                                        color: "#263b32",
                                      }}
                                    >
                                      {dv.tenDichVu}
                                    </Typography>

                                    <Switch
                                      checked={kichHoat}
                                      onChange={() => toggleDichVu(dv.id)}
                                      size="small"
                                    />
                                  </Stack>
                                </Paper>
                              );
                            })}
                        </Stack>
                      )}
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>

          {/* Thanh hành động cố định phía dưới */}
          <Paper
            elevation={0}
            sx={{
              position: "fixed",
              zIndex: 10,
              bottom: 0,
              left: 0,
              right: 0,
              borderTop: "1px solid #e4ebe6",
              bgcolor: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(12px)",
              px: 2,
              py: 1.3,
            }}
          >
            <Container maxWidth="xl" sx={{ px: { xs: 0, sm: 1 } }}>
              <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 750, color: "#263b32" }}>Hoàn tất đăng ký HomeStay</Typography>
                  <Typography sx={{ fontSize: 10.5, color: "#829087", mt: 0.2 }}>
                    {anhList.length}/5 ảnh tối thiểu · {tienIchDaChon.length} tiện ích đã chọn
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} sx={{ ml: "auto" }}>
                  <Button
                    type="button"
                    variant="outlined"
                    startIcon={<ArrowLeft size={16} />}
                    onClick={() => window.history.back()}
                    sx={{ borderRadius: "9px", px: 2, py: 0.9, textTransform: "none", fontWeight: 700, fontSize: 12, color: "#52645a", borderColor: "#d5dfd8" }}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={dangLuu}
                    disableElevation
                    endIcon={!dangLuu && <ArrowRight size={16} />}
                    sx={{ borderRadius: "9px", px: 2.3, py: 0.9, textTransform: "none", fontWeight: 750, fontSize: 12, bgcolor: "#087653", "&:hover": { bgcolor: "#066346" } }}
                  >
                    {dangLuu ? "Đang đăng ký..." : "Đăng ký HomeStay"}
                  </Button>
                </Stack>
              </Stack>
            </Container>
          </Paper>
        </form>
      </Container>
    </Box>
  );
}
