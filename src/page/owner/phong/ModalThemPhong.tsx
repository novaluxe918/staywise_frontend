
import React, { useState } from "react";
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

interface Props {
    open: boolean;
    onClose: () => void;
}

const danhSachLoaiPhong = [
    { value: "DON", label: "Phòng đơn", description: "Phù hợp 1 - 2 khách", icon: "🛏️" },
    { value: "DOI", label: "Phòng đôi", description: "Phù hợp 2 khách", icon: "🛌" },
    { value: "GIA_DINH", label: "Phòng gia đình", description: "Phù hợp gia đình", icon: "🏡" },
    { value: "VIP", label: "Phòng VIP", description: "Không gian cao cấp", icon: "✨" },
];

const danhSachGiuong = [
    { id: 1, ten: "Giường đơn", kichThuoc: "1m x 2m" },
    { id: 2, ten: "Giường đôi", kichThuoc: "1m6 x 2m" },
    { id: 3, ten: "Giường Queen", kichThuoc: "1m8 x 2m" },
    { id: 4, ten: "Giường King", kichThuoc: "2m x 2m" },
];

function ModalThemPhong({ open, onClose }: Props) {

    const [formData, setFormData] = useState({
        tenPhong: "",
        loaiPhong: "",
        dienTich: "",
        moTa: "",
    });

    const [giuongDaChon, setGiuongDaChon] = useState<
        { maLoaiGiuong: number; soLuong: number }[]
    >([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChonGiuong = (id: number) => {
        setGiuongDaChon(prev => {
            const tonTai = prev.find(item => item.maLoaiGiuong === id);

            if (tonTai) {
                return prev.filter(item => item.maLoaiGiuong !== id);
            }

            return [...prev, { maLoaiGiuong: id, soLuong: 1 }];
        });
    };

    const handleSoLuong = (id: number, soLuong: number) => {
        setGiuongDaChon(prev =>
            prev.map(item =>
                item.maLoaiGiuong === id
                    ? { ...item, soLuong }
                    : item
            )
        );
    };

    const handleSubmit = () => {
        const duLieu = {
            ...formData,
            dienTich: Number(formData.dienTich),
            danhSachGiuong: giuongDaChon,
        };

        console.log(duLieu);
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
                <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
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
                            sx={{ fontSize: 20, fontWeight: 700, color: "#185C35" }}
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
                            Tên phòng <Typography component="span" color="error">*</Typography>
                        </Typography>

                        <TextField
                            fullWidth
                            size="small"
                            name="tenPhong"
                            placeholder="Ví dụ: Phòng Deluxe 01"
                            value={formData.tenPhong}
                            onChange={handleChange}
                        />
                    </Box>

                    {/* LOẠI PHÒNG */}
                    <Box>
                        <Box sx={{ fontWeight: 600, mb: 1.5, fontSize: 14 }}>
                            Loại phòng <Typography component="span" color="error">*</Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(2, 1fr)",
                                gap: 1.5,
                            }}
                        >
                            {danhSachLoaiPhong.map((loai) => {
                                const selected = formData.loaiPhong === loai.value;

                                return (
                                    <Paper
                                        key={loai.value}
                                        variant="outlined"
                                        onClick={() =>
                                            setFormData(prev => ({
                                                ...prev,
                                                loaiPhong: loai.value,
                                            }))
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
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <Typography sx={{ fontSize: 23 }}>
                                                {loai.icon}
                                            </Typography>

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
                                    </Paper>
                                );
                            })}
                        </Box>
                    </Box>

                    {/* CHỌN GIƯỜNG */}
                    <Box>
                        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.5 }}>
                            <KingBedOutlinedIcon sx={{ color: "#299653" }} />

                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                                Danh sách giường
                            </Typography>
                        </Stack>

                        <Stack spacing={1.2}>
                            {danhSachGiuong.map((giuong) => {
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
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            sx={{ alignItems: "center" }}
                                        >
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
                                                    {giuong.ten}
                                                </Typography>

                                                <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                                                    {giuong.kichThuoc}
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
                                                            Math.max(1, Number(e.target.value))
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
                    </Box>

                    {/* DIỆN TÍCH */}
                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>
                            Diện tích phòng
                        </Typography>

                        <TextField
                            fullWidth
                            size="small"
                            type="number"
                            name="dienTich"
                            placeholder="Nhập diện tích phòng"
                            value={formData.dienTich}
                            onChange={handleChange}
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
                                htmlInput: {
                                    min: 1,
                                },
                            }}
                        />
                    </Box>

                    {/* MÔ TẢ */}
                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1, fontSize: 14 }}>
                            Mô tả phòng
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            name="moTa"
                            placeholder="Mô tả tiện nghi, đặc điểm nổi bật của phòng..."
                            value={formData.moTa}
                            onChange={handleChange}
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
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: "#299653",
                        "&:hover": { bgcolor: "#207A42" },
                        borderRadius: 2,
                        px: 3,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "none",
                    }}
                >
                    Thêm phòng
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemPhong;
