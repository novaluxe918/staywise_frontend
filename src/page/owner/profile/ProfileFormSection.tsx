import React, { useRef, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import {
    PersonOutlined,
    PhoneIphoneOutlined,
    EmailOutlined,
    VerifiedOutlined,
    UploadFileOutlined,
    VisibilityOutlined,
    ShieldOutlined,
    DescriptionOutlined,
    InfoOutlined,
    CheckCircleOutlined,
    InsertDriveFileOutlined,
} from "@mui/icons-material";
import { SaveIcon } from "lucide-react";

interface ProfileFormData {
    hoTen: string;
    soDienThoai: string;
    email: string;
}


interface UploadImageProps {
    title: string;
    imageUrl: string | null;
    previewUrl: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadImage = ({
    title,
    imageUrl,
    previewUrl,
    onChange,
}: UploadImageProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Box
            sx={{
                p: 2,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                bgcolor: "background.paper",
                minWidth: 0,
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1.5 }}>
                {title}
            </Typography>

            <Box
                component="img"
                src={previewUrl || imageUrl || "/placeholder.png"}
                alt={title}
                sx={{
                    width: "100%",
                    height: { xs: 175, sm: 190 },
                    objectFit: "contain",
                    borderRadius: 2,
                    bgcolor: "grey.50",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            />

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                hidden
                onChange={onChange}
            />

            <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<UploadFileOutlined />}
                onClick={() => inputRef.current?.click()}
                sx={{
                    mt: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                }}
            >
                Thay đổi ảnh
            </Button>
        </Box>
    );
};


export const ProfileFormSection = ({
    formData,

    anhDaiDien,
    anhCCCDMatTruoc,
    anhCCCDMatSau,
    anhGiayPhepKinhDoanh,

    previewAnhDaiDien,
    previewCCCDMatTruoc,
    previewCCCDMatSau,
    previewGiayPhep,

    onChange,

    onAvatarChange,
    onCCCDMatTruocChange,
    onCCCDMatSauChange,
    onGiayPhepChange,

    onSave,
}: {
    formData: ProfileFormData;

    anhDaiDien: string | null;
    anhCCCDMatTruoc: string | null;
    anhCCCDMatSau: string | null;
    anhGiayPhepKinhDoanh: string | null;

    previewAnhDaiDien: string | null;
    previewCCCDMatTruoc: string | null;
    previewCCCDMatSau: string | null;
    previewGiayPhep: string | null;

    onChange: (
        field: keyof ProfileFormData,
        value: string
    ) => void;

    onAvatarChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onCCCDMatTruocChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onCCCDMatSauChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onGiayPhepChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;

    onSave: () => void;
}) => {

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            bgcolor: "background.paper",
        },
        "& .MuiInputLabel-root": {
            fontWeight: 500,
        },
    }

    return (
        <Stack spacing={3}>
            {/* 1. Thông tin cá nhân */}
            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Tiêu đề */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 750 }}>
                            01. Thông tin cá nhân
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            Thông tin người đại diện và thông tin liên hệ trên tài khoản.
                        </Typography>
                    </Box>

                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Họ và tên người đại diện"
                                value={formData.hoTen}
                                onChange={(e) => onChange("hoTen", e.target.value)}
                                sx={fieldSx}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Số điện thoại"
                                value={formData.soDienThoai}
                                onChange={(e) => onChange("soDienThoai", e.target.value)}
                                sx={fieldSx}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIphoneOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                value={formData.email}
                                sx={fieldSx}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>

            {/* 2. CCCD */}
            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                }}
            >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Tiêu đề */}
                    <Box sx={{ mb: 3 }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                            }}
                        >
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 750 }}>
                                    02. Căn cước công dân
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Tải ảnh rõ nét hai mặt CCCD để quản trị viên đối chiếu thông tin.
                                </Typography>
                            </Box>

                            <Chip
                                label="Hồ sơ xác minh"
                                color="info"
                                size="small"
                                variant="outlined"
                            />
                        </Stack>
                    </Box>

                    <Alert
                        severity="info"
                        icon={<ShieldOutlined />}
                        sx={{
                            mb: 2.5,
                            borderRadius: 2.5,
                            alignItems: "center",
                            "& .MuiAlert-message": { fontSize: 13 },
                        }}
                    >
                        Hình ảnh giấy tờ chỉ được sử dụng cho mục đích xác minh danh tính
                        và được bảo vệ theo chính sách dữ liệu của hệ thống.
                    </Alert>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <UploadImage
                                title="Mặt trước CCCD"
                                imageUrl={anhCCCDMatTruoc}
                                previewUrl={previewCCCDMatTruoc}
                                onChange={onCCCDMatTruocChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <UploadImage
                                title="Mặt sau CCCD"
                                imageUrl={anhCCCDMatSau}
                                previewUrl={previewCCCDMatSau}
                                onChange={onCCCDMatSauChange}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* 3. Hồ sơ pháp lý */}
            <Card
                elevation={0}
                sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                }}
            >
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Tiêu đề */}
                    <Box sx={{ mb: 3 }}>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                            }}
                        >
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 750 }}>
                                    03. Hồ sơ pháp lý
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Giấy phép kinh doanh phục vụ quá trình xác minh hoạt động kinh doanh.
                                </Typography>
                            </Box>

                            <Chip
                                label="Tài liệu kinh doanh"
                                color="info"
                                size="small"
                                variant="outlined"
                            />
                        </Stack>
                    </Box>

                    <Alert
                        severity="warning"
                        icon={<InfoOutlined />}
                        sx={{
                            mb: 3,
                            borderRadius: 2.5,
                            "& .MuiAlert-message": { fontSize: 13 },
                        }}
                    >
                        Vui lòng đảm bảo giấy tờ còn hiệu lực và thông tin trên tài liệu
                        trùng khớp với thông tin người đăng ký.
                    </Alert>

                    {/* Giấy phép kinh doanh */}
                    <Box
                        sx={{
                            p: { xs: 2, sm: 2.5 },
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <Stack direction="row" spacing={1.2} sx={{ alignItems: "center", mb: 2 }}>
                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: 2,
                                    bgcolor: "primary.50",
                                    color: "primary.main",
                                }}
                            >
                                <DescriptionOutlined />
                            </Box>

                            <Box>
                                <Typography sx={{ fontWeight: 750 }} variant="body1">
                                    Giấy phép kinh doanh
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    Tài liệu đăng ký hoạt động kinh doanh
                                </Typography>
                            </Box>
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <UploadImage
                                    title="Ảnh giấy phép kinh doanh"
                                    imageUrl={anhGiayPhepKinhDoanh}
                                    previewUrl={previewGiayPhep}
                                    onChange={onGiayPhepChange}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Nút lưu */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={onSave}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        boxShadow: "none",
                    }}
                >
                    Lưu cập nhật hồ sơ
                </Button>
            </Box>
        </Stack>
    );
};
