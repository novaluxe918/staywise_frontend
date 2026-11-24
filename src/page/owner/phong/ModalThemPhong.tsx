
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    Divider,
    Stack,
    Paper,
    Checkbox,
    InputAdornment,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";

import {
    danhSachLoaiPhong,
    danhSachTheLoaiNguoi,
    type LoaiPhong,
    type Phong,
    type PhongRequest,
    type SoNguoiRequest,
} from "../../../types/phong";

import type { LoaiGiuong } from "../../../types/giuong";
import { savePhong } from "../../../services/phongService";
import { showAllGiuong } from "../../../services/giuongService";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phongSchema, type PhongFormData } from "../../../schemas/phongSchema";
import { toast } from "../../../utils/toast";


interface Props {
    open: boolean;
    onClose: () => void;
    maHomeStay: number;
    onSuccess?: () => void;
    duLieuUpdate?: Phong | null;
}

const taoDanhSachSoNguoiMacDinh = () =>
    danhSachTheLoaiNguoi.map(item => ({
        theLoaiNguoi: item.value,
        soLuong: item.value === "NGUOI_LON" ? 1 : 0,
    }));

const giaTriMacDinh: PhongFormData = {
    tenPhong: "",
    loaiPhong: "",
    dienTich: "",
    moTa: "",
    giuongDaChon: [],
    danhSachSoNguoi: taoDanhSachSoNguoiMacDinh(),
};

function ModalThemPhong({
    open,
    onClose,
    maHomeStay,
    onSuccess,
    duLieuUpdate,
}: Props) {

    const [danhSachGiuong, setDanhSachGiuong] = useState<LoaiGiuong[]>([]);
    const [loadingGiuong, setLoadingGiuong] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PhongFormData>({
        resolver: zodResolver(phongSchema),
        defaultValues: giaTriMacDinh,
    });

    const giuongDaChon = watch("giuongDaChon");
    const danhSachSoNguoi = watch("danhSachSoNguoi");
    const loaiPhongDaChon = watch("loaiPhong");

    useEffect(() => {
        if (!open) return;

        if (!duLieuUpdate) {
            reset({
                ...giaTriMacDinh,
                danhSachSoNguoi: taoDanhSachSoNguoiMacDinh(),
            });
            return;
        }

        reset({
            tenPhong: duLieuUpdate.tenPhong ?? "",
            loaiPhong: duLieuUpdate.loaiPhong ?? "",
            dienTich: String(duLieuUpdate.dienTich ?? ""),
            moTa: duLieuUpdate.moTa ?? "",

            giuongDaChon: duLieuUpdate.danhSachGiuong?.map(item => ({
                maLoaiGiuong: item.maLoaiGiuong,
                soLuong: item.soLuong,
            })) ?? [],

            danhSachSoNguoi: danhSachTheLoaiNguoi.map(item => ({
                theLoaiNguoi: item.value,
                soLuong:
                    duLieuUpdate.danhSachSoNguoi?.find(
                        x => x.theLoaiNguoi === item.value
                    )?.soLuong ?? 0,
            })),
        });
    }, [open, duLieuUpdate, reset]);

    useEffect(() => {
        if (!open) return;

        const layDanhSachGiuong = async () => {
            try {
                setLoadingGiuong(true);

                const response = await showAllGiuong("", 0, 100);

                setDanhSachGiuong(response.content);
            } catch (error) {
                console.error("Lỗi lấy danh sách giường:", error);
                toast.error("Không thể tải danh sách loại giường!");
            } finally {
                setLoadingGiuong(false);
            }
        };

        layDanhSachGiuong();
    }, [open]);

    const handleChonGiuong = (id: number) => {
        const daChon = giuongDaChon.some(
            item => item.maLoaiGiuong === id
        );

        setValue(
            "giuongDaChon",
            daChon
                ? giuongDaChon.filter(item => item.maLoaiGiuong !== id)
                : [...giuongDaChon, { maLoaiGiuong: id, soLuong: 1 }],
            { shouldValidate: true }
        );
    };

    const handleSoLuongGiuong = (id: number, soLuong: number) => {
        setValue(
            "giuongDaChon",
            giuongDaChon.map(item =>
                item.maLoaiGiuong === id
                    ? { ...item, soLuong }
                    : item
            ),
            { shouldValidate: true }
        );
    };

    const handleSoLuongNguoi = (
        loaiNguoi: SoNguoiRequest["theLoaiNguoi"],
        soLuong: number
    ) => {
        setValue(
            "danhSachSoNguoi",
            danhSachSoNguoi.map(item =>
                item.theLoaiNguoi === loaiNguoi
                    ? { ...item, soLuong }
                    : item
            ),
            { shouldValidate: true }
        );
    };

    const onSubmit = async (data: PhongFormData) => {
        try {
            setLoading(true);

            const duLieu: PhongRequest = {
                ...(duLieuUpdate ? { id: duLieuUpdate.id } : {}),
                maHomeStay,
                tenPhong: data.tenPhong,
                moTa: data.moTa,
                dienTich: Number(data.dienTich),
                loaiPhong: data.loaiPhong as LoaiPhong,
                danhSachGiuong: data.giuongDaChon,
                danhSachSoNguoi: data.danhSachSoNguoi.filter(
                    item => item.soLuong > 0
                ),
            };

            await savePhong(duLieu);

            toast.success(
                `${duLieuUpdate ? "Cập nhật" : "Thêm"} phòng thành công!`
            );

            reset({
                ...giaTriMacDinh,
                danhSachSoNguoi: taoDanhSachSoNguoiMacDinh(),
            });

            onClose();
            onSuccess?.();

        } catch (error: any) {
            console.error("Lỗi lưu phòng:", error);
            console.log("Backend trả về:", error.response?.data);

            toast.error(
                `${duLieuUpdate ? "Cập nhật" : "Thêm"} phòng thất bại!`
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            fullWidth
            maxWidth="sm"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 4,
                        overflow: "hidden",
                    },
                },
            }}
        >

            {/* HEADER */}

            <DialogTitle
                sx={{
                    bgcolor: "#EAF7EE",
                    px: 3,
                    py: 2.5,
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>

                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2.5,
                            bgcolor: "#D0EED9",
                            color: "#218348",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MeetingRoomOutlinedIcon fontSize="large" />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography
                            component="h2"
                            sx={{
                                fontSize: 20,
                                fontWeight: 700,
                                color: "#185C35",
                            }}
                        >
                            {duLieuUpdate ? "Cập nhật phòng" : "Thêm phòng mới"}
                        </Typography>

                        <Typography sx={{ fontSize: 13, color: "#668573" }}>
                            {duLieuUpdate
                                ? "Chỉnh sửa thông tin phòng của bạn"
                                : "Cung cấp thông tin chi tiết về phòng"}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={onClose}
                        disabled={loading}
                        sx={{ color: "#64816D" }}
                    >
                        <CloseIcon />
                    </IconButton>

                </Box>
            </DialogTitle>

            {/* CONTENT */}

            <DialogContent sx={{ px: 3, py: 3 }}>
                <Stack spacing={3}>

                    {/* TÊN PHÒNG */}

                    <Box>
                        <Typography
                            component="div"
                            sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}
                        >
                            Tên phòng <Typography component="span" color="error">*</Typography>
                        </Typography>

                        <TextField
                            {...register("tenPhong")}
                            fullWidth
                            size="small"
                            placeholder="Ví dụ: Phòng Deluxe 01"
                            error={!!errors.tenPhong}
                            helperText={errors.tenPhong?.message}
                        />
                    </Box>

                    {/* LOẠI PHÒNG */}

                    <Box>
                        <Typography
                            component="div"
                            sx={{ fontWeight: 600, mb: 1.5, fontSize: 14 }}
                        >
                            Loại phòng <Typography component="span" color="error">*</Typography>
                        </Typography>

                        <Box
                            component="div"
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 1.5,
                            }}
                        >
                            {danhSachLoaiPhong.map(loai => {
                                const selected = loaiPhongDaChon === loai.value;

                                return (
                                    <Paper
                                        key={loai.value}
                                        variant="outlined"
                                        onClick={() =>
                                            setValue("loaiPhong", loai.value, {
                                                shouldValidate: true,
                                            })
                                        }
                                        sx={{
                                            p: 1.5,
                                            cursor: "pointer",
                                            borderRadius: 2.5,
                                            border: selected
                                                ? "2px solid #299653"
                                                : "1px solid #E0E8E2",
                                            bgcolor: selected ? "#F0FAF3" : "#fff",
                                            transition: "0.2s",
                                            "&:hover": {
                                                borderColor: "#299653",
                                                bgcolor: "#F5FBF6",
                                            },
                                        }}
                                    >
                                        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13, color: "#285C3B" }}>
                                                    {loai.label}
                                                </Typography>

                                                <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                                                    {loai.description}
                                                </Typography>
                                            </Box>

                                            {selected && (
                                                <Box
                                                    sx={{
                                                        width: 19,
                                                        height: 19,
                                                        borderRadius: "50%",
                                                        bgcolor: "#299653",
                                                        color: "#fff",
                                                        fontSize: 12,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    ✓
                                                </Box>
                                            )}
                                        </Stack>
                                    </Paper>
                                );
                            })}
                        </Box>

                        {errors.loaiPhong && (
                            <Typography sx={{ color: "error.main", fontSize: 12, mt: 1 }}>
                                {errors.loaiPhong.message}
                            </Typography>
                        )}
                    </Box>

                    {/* DANH SÁCH GIƯỜNG */}

                    <Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                            <KingBedOutlinedIcon sx={{ color: "#299653" }} />
                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                Danh sách giường
                            </Typography>
                        </Box>

                        {loadingGiuong ? (
                            <Typography color="text.secondary">
                                Đang tải danh sách giường...
                            </Typography>
                        ) : danhSachGiuong.length === 0 ? (
                            <Typography color="text.secondary">
                                Chưa có loại giường nào. Vui lòng thêm loại giường trước.
                            </Typography>
                        ) : (
                            <Stack spacing={1.2}>
                                {danhSachGiuong.map(giuong => {
                                    const selected = giuongDaChon.find(
                                        item => item.maLoaiGiuong === giuong.id
                                    );

                                    return (
                                        <Paper
                                            key={giuong.id}
                                            variant="outlined"
                                            sx={{
                                                p: 1.2,
                                                borderRadius: 2,
                                                borderColor: selected ? "#299653" : "#E0E8E2",
                                                bgcolor: selected ? "#F3FAF5" : "#fff",
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Checkbox
                                                    checked={!!selected}
                                                    onChange={() => handleChonGiuong(giuong.id)}
                                                    sx={{
                                                        color: "#A5B8AA",
                                                        "&.Mui-checked": {
                                                            color: "#299653",
                                                        },
                                                    }}
                                                />

                                                <Box sx={{ flex: 1 }}>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>
                                                        {giuong.tenGiuong}
                                                    </Typography>
                                                </Box>

                                                {selected && (
                                                    <TextField
                                                        size="small"
                                                        type="number"
                                                        label="Số lượng"
                                                        value={selected.soLuong}
                                                        onChange={e =>
                                                            handleSoLuongGiuong(
                                                                giuong.id,
                                                                Math.max(
                                                                    1,
                                                                    Math.min(20, Number(e.target.value))
                                                                )
                                                            )
                                                        }
                                                        slotProps={{
                                                            htmlInput: {
                                                                min: 1,
                                                                max: 20,
                                                            },
                                                        }}
                                                        sx={{ width: 105 }}
                                                    />
                                                )}
                                            </Box>
                                        </Paper>
                                    );
                                })}
                            </Stack>
                        )}
                    </Box>

                    {/* SỨC CHỨA */}

                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1.5, fontSize: 14 }}>
                            Sức chứa phòng
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            {danhSachTheLoaiNguoi.map(loaiNguoi => {
                                const soLuong = danhSachSoNguoi.find(
                                    item => item.theLoaiNguoi === loaiNguoi.value
                                )?.soLuong ?? 0;

                                return (
                                    <TextField
                                        key={loaiNguoi.value}
                                        fullWidth
                                        size="small"
                                        label={loaiNguoi.label}
                                        type="number"
                                        value={soLuong}
                                        onChange={e =>
                                            handleSoLuongNguoi(
                                                loaiNguoi.value,
                                                Math.max(0, Number(e.target.value))
                                            )
                                        }
                                        slotProps={{
                                            htmlInput: { min: 0 },
                                        }}
                                    />
                                );
                            })}
                        </Stack>

                        {errors.danhSachSoNguoi && (
                            <Typography
                                color="error"
                                sx={{ fontSize: 12, mt: 1 }}
                            >
                                {errors.danhSachSoNguoi.message}
                            </Typography>
                        )}
                    </Box>

                    {/* DIỆN TÍCH */}

                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>
                            Diện tích phòng
                        </Typography>

                        <TextField
                            {...register("dienTich")}
                            fullWidth
                            size="small"
                            type="number"
                            placeholder="Nhập diện tích phòng"
                            error={!!errors.dienTich}
                            helperText={errors.dienTich?.message}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SquareFootOutlinedIcon sx={{ color: "#299653" }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            m²
                                        </InputAdornment>
                                    ),
                                },
                                htmlInput: { min: 0.1 },
                            }}
                        />
                    </Box>

                    {/* MÔ TẢ */}

                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>
                            Mô tả phòng
                        </Typography>

                        <TextField
                            {...register("moTa")}
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Mô tả tiện nghi, đặc điểm nổi bật của phòng..."
                        />
                    </Box>

                </Stack>
            </DialogContent>

            <Divider />

            {/* FOOTER */}

            <DialogActions
                sx={{
                    px: 3,
                    py: 2,
                    bgcolor: "#FAFCFA",
                }}
            >
                <Button
                    onClick={onClose}
                    disabled={loading}
                    variant="outlined"
                    sx={{
                        color: "#52705C",
                        borderColor: "#D5E2D8",
                        borderRadius: 2,
                        px: 3,
                        textTransform: "none",
                    }}
                >
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading || loadingGiuong}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        textTransform: "none",
                        bgcolor: "#299653",
                        "&:hover": {
                            bgcolor: "#218348",
                        },
                    }}
                >
                    {loading
                        ? "Đang lưu..."
                        : duLieuUpdate
                            ? "Cập nhật phòng"
                            : "Thêm phòng"}
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default ModalThemPhong;
