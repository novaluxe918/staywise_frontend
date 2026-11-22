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
    type PhongRequest,
    type SoNguoiRequest,
} from "../../../types/phong";

import type { LoaiGiuong } from "../../../types/giuong";

import { showAllGiuong } from "../../../services/giuongService";
import { savePhong } from "../../../services/phongService";
import { useForm } from "react-hook-form";
import { phongSchema, type PhongFormData } from "../../../schemas/phongSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../../../utils/toast";

interface Props {
    open: boolean;
    onClose: () => void;
    maHomeStay: number;
    onSuccess?: () => void;
}

function ModalThemPhong({
    open,
    onClose,
    maHomeStay,
    onSuccess,
}: Props) {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PhongFormData>({
        resolver: zodResolver(phongSchema),
        defaultValues: {
            tenPhong: "",
            loaiPhong: "",
            dienTich: "",
            moTa: "",
            giuongDaChon: [],
            danhSachSoNguoi: danhSachTheLoaiNguoi.map(item => ({
                theLoaiNguoi: item.value,
                soLuong: item.value === "NGUOI_LON" ? 1 : 0,
            })),
        },
    });
    const [danhSachGiuong, setDanhSachGiuong] = useState<LoaiGiuong[]>([]);
    const [loadingGiuong, setLoadingGiuong] = useState(false);

    const giuongDaChon = watch("giuongDaChon");
    const danhSachSoNguoi = watch("danhSachSoNguoi");
    const loaiPhongDaChon = watch("loaiPhong");

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (!open) return;

        const layDanhSachGiuong = async () => {
            setLoadingGiuong(true);

            try {
                const response = await showAllGiuong("", 0, 100);
                const duLieu = response as unknown as {
                    content?: LoaiGiuong[];
                    page?: { content?: LoaiGiuong[] };
                };

                setDanhSachGiuong(
                    duLieu.content ?? duLieu.page?.content ?? []
                );
            } catch (error) {
                console.error("Lỗi lấy danh sách giường:", error);
                window.alert("Không thể tải danh sách loại giường!");
            } finally {
                setLoadingGiuong(false);
            }
        };

        layDanhSachGiuong();
    }, [open]);




    const handleChonGiuong = (id: number) => {
        const danhSach = watch("giuongDaChon");

        const tonTai = danhSach.some(
            item => item.maLoaiGiuong === id
        );

        const ketQua = tonTai
            ? danhSach.filter(item => item.maLoaiGiuong !== id)
            : [...danhSach, { maLoaiGiuong: id, soLuong: 1 }];

        setValue("giuongDaChon", ketQua, {
            shouldValidate: true,
        });
    };

    const handleSoLuong = (id: number, soLuong: number) => {
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
    if (!maHomeStay) {
        toast.error("Không xác định được HomeStay!");
        return;
    }

    const duLieu: PhongRequest = {
        maHomeStay,
        tenPhong: data.tenPhong,
        loaiPhong: data.loaiPhong as LoaiPhong,
        dienTich: Number(data.dienTich),
        moTa: data.moTa,
        danhSachGiuong: data.giuongDaChon,
        danhSachSoNguoi: data.danhSachSoNguoi.filter(
            item => item.soLuong > 0
        ),
    };

    try {
        setLoading(true);

        await savePhong(duLieu);

        toast.success("Thêm phòng thành công!");

        reset();
        onClose();
        onSuccess?.();

    } catch (error: any) {
    console.error("Lỗi thêm phòng:", error);

    console.log("HTTP Status:", error.response?.status);
    console.log("Backend trả về:", error.response?.data);

    const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Thêm phòng thất bại!";

    toast.error(
        typeof message === "string"
            ? message
            : JSON.stringify(message)
    );

    } finally {
        setLoading(false);
    }
};
    return (
        <Dialog
            open={open}
            onClose={onClose}
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
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: "center" }}
                >
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
                            Thêm phòng mới
                        </Typography>

                        <Typography sx={{ fontSize: 13, color: "#668573" }}>
                            Cung cấp thông tin chi tiết về phòng
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={onClose}
                        sx={{ color: "#64816D" }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
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
                            Tên phòng{" "}
                            <Typography component="span" color="error">
                                *
                            </Typography>
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
                        <Box sx={{ fontWeight: 600, mb: 1.5, fontSize: 14 }}>
                            Loại phòng{" "}
                            <Typography component="span" color="error">
                                *
                            </Typography>
                        </Box>

                        <Box
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
                                            bgcolor: selected
                                                ? "#F0FAF3"
                                                : "#fff",
                                            transition: "0.2s",
                                            "&:hover": {
                                                borderColor: "#299653",
                                                bgcolor: "#F5FBF6",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                            }}
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: 13,
                                                        color: "#285C3B",
                                                    }}
                                                >
                                                    {loai.label}
                                                </Typography>

                                                <Typography
                                                    sx={{
                                                        fontSize: 11,
                                                        color: "text.secondary",
                                                    }}
                                                >
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
                                                        color: "white",
                                                        fontSize: 12,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    ✓
                                                </Box>
                                            )}
                                        </Box>
                                        {errors.loaiPhong && (
                                            <Typography
                                                sx={{
                                                    color: "error.main",
                                                    fontSize: 12,
                                                    mt: 1,
                                                }}
                                            >
                                                {errors.loaiPhong.message}
                                            </Typography>
                                        )}
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* CHỌN GIƯỜNG */}
                    <Box>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: "center", mb: 1.5 }}
                        >
                            <KingBedOutlinedIcon sx={{ color: "#299653" }} />

                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                Danh sách giường
                            </Typography>
                        </Stack>

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
                                                borderColor: selected
                                                    ? "#299653"
                                                    : "#E0E8E2",
                                                bgcolor: selected
                                                    ? "#F3FAF5"
                                                    : "#fff",
                                            }}
                                        >
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                sx={{ alignItems: "center" }}
                                            >
                                                <Checkbox
                                                    checked={!!selected}
                                                    onChange={() =>
                                                        handleChonGiuong(giuong.id)
                                                    }
                                                    sx={{
                                                        color: "#A5B8AA",
                                                        "&.Mui-checked": {
                                                            color: "#299653",
                                                        },
                                                    }}
                                                />

                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: 13,
                                                        }}
                                                    >
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
                                                            handleSoLuong(
                                                                giuong.id,
                                                                Math.max(
                                                                    1,
                                                                    Math.min(
                                                                        20,
                                                                        Number(e.target.value)
                                                                    )
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
                                            </Stack>
                                        </Paper>
                                    );
                                })}
                            </Stack>
                        )}
                    </Box>

                    <Box>
                        <Typography
                            sx={{ fontWeight: 600, mb: 1.5, fontSize: 14 }}
                        >
                            Sức chứa phòng
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            {danhSachTheLoaiNguoi.map(loaiNguoi => {
                                const soLuong =
                                    danhSachSoNguoi.find(
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
                                            htmlInput: {
                                                min: 0,
                                            },
                                        }}
                                    />
                                );
                            })}
                        </Stack>
                        {errors.danhSachSoNguoi && (
                            <Typography color="error" sx={{ fontSize: 12 }}>
                                {errors.danhSachSoNguoi.message}
                            </Typography>
                        )}
                    </Box>
                    {/* DIỆN TÍCH */}
                    <Box>
                        <Typography
                            sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}
                        >
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
                        <Typography
                            sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}
                        >
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
                >
                    {loading ? "Đang lưu..." : "Thêm phòng"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemPhong;