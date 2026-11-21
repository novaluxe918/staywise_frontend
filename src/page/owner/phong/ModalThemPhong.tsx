
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    IconButton,
    Divider,
    Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
    open: boolean;
    onClose: () => void;
}

function ModalThemPhong({ open, onClose }: Props) {

    const [formData, setFormData] = useState({
        tenPhong: "",
        loaiPhong: "",
        dienTich: "",
        moTa: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(formData);
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
                        borderRadius: 3,
                        p: 1,
                    },
                },
            }}
        >
            {/* Header */}
            <DialogTitle>
                <Stack
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Box>
                        <Typography sx={{ fontSize: 20, fontWeight: 700 }}>
                            Thêm phòng mới
                        </Typography>

                        <Typography sx={{ fontSize: 13 }} color="text.secondary">
                            Nhập thông tin phòng của bạn
                        </Typography>
                    </Box>

                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>

            <Divider />

            {/* Form */}
            <DialogContent>
                <Stack spacing={2.5} sx={{ mt: 1 }}>

                    {/* Tên phòng */}
                    <TextField
                        fullWidth
                        label="Tên phòng"
                        name="tenPhong"
                        placeholder="Ví dụ: Phòng Deluxe 01"
                        value={formData.tenPhong}
                        onChange={handleChange}
                        required
                    />

                    {/* Loại phòng */}
                    <TextField
                        select
                        fullWidth
                        label="Loại phòng"
                        name="loaiPhong"
                        value={formData.loaiPhong}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="DON">Phòng đơn</MenuItem>
                        <MenuItem value="DOI">Phòng đôi</MenuItem>
                        <MenuItem value="GIA_DINH">Phòng gia đình</MenuItem>
                        <MenuItem value="VIP">Phòng VIP</MenuItem>
                    </TextField>

                    {/* Chọn giường */}
                    <Box>
                        <Typography sx={{ fontWeight: 600, mb: 1 }}>
                            Chọn giường
                        </Typography>

                        <Typography
                            sx={{ fontSize: 13 }}
                            color="text.secondary"
                        >
                            Chúng ta sẽ bổ sung danh sách giường
                            và số lượng ở bước tiếp theo.
                        </Typography>
                    </Box>

                    {/* Diện tích */}
                    <TextField
                        fullWidth
                        type="number"
                        label="Diện tích"
                        name="dienTich"
                        placeholder="Ví dụ: 30"
                        value={formData.dienTich}
                        onChange={handleChange}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <Typography color="text.secondary">
                                        m²
                                    </Typography>
                                ),
                            },
                        }}
                    />

                    {/* Mô tả */}
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Mô tả phòng"
                        name="moTa"
                        placeholder="Mô tả tiện nghi và đặc điểm của phòng..."
                        value={formData.moTa}
                        onChange={handleChange}
                    />

                </Stack>
            </DialogContent>

            <Divider />

            {/* Footer */}
            <DialogActions sx={{ p: 2 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onClose}
                >
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: "#1976D2",
                        borderRadius: 2,
                        px: 3,
                    }}
                >
                    Thêm phòng
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalThemPhong;
