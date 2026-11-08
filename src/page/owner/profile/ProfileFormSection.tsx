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
    HomeOutlined,
    VerifiedOutlined,
    UploadFileOutlined,
    VisibilityOutlined,
    ShieldOutlined,
    DescriptionOutlined,
    FireExtinguisherOutlined,
    InfoOutlined,
    CheckCircleOutlined,
    InsertDriveFileOutlined,
} from "@mui/icons-material";

interface ProfileFormData {
    fullName: string;
    phone: string;
    email: string;
    address: string;
}

interface ProfileFormSectionProps {
    formData: ProfileFormData;
    onChange: (field: keyof ProfileFormData, val: string) => void;
}

type DocumentPreview = {
    name: string;
    url: string;
};

const SectionHeading = ({
    number,
    title,
    description,
    status,
    statusColor = "success",
}: {
    number: string;
    title: string;
    description: string;
    status?: string;
    statusColor?: "success" | "warning" | "error" | "default" | "info";
}) => (
    <Box
        component="div"
        sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            gap: 1.5,
            mb: 3,
        }}
    >
        <Box component="div" sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: 1.5 }}>
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 2,
                    bgcolor: "primary.50",
                    color: "primary.main",
                    fontWeight: 800,
                    fontSize: 14,
                }}
            >
                {number}
            </Box>
            <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 750 }} color="text.primary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Box>
        </Box>
        {status && (
            <Chip
                icon={<CheckCircleOutlined />}
                label={status}
                color={statusColor}
                variant="outlined"
                size="small"
                sx={{ fontWeight: 650, borderRadius: 2 }}
            />
        )}
    </Box>
);

const UploadPreview = ({
    title,
    initialSrc,
    onFileChange,
}: {
    title: string;
    initialSrc: string;
    onFileChange?: (file: File) => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState(initialSrc);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);
        onFileChange?.(file);
    };

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
            <Stack
                sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    mb: 1.5,
                }}
            >
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {title}
                </Typography>
                <Chip label="Ảnh hồ sơ" size="small" variant="outlined" />
            </Stack>

            <Box
                component="img"
                src={preview}
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
                accept="image/*"
                hidden
                onChange={handleChange}
            />
            <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<UploadFileOutlined />}
                onClick={() => inputRef.current?.click()}
                sx={{ mt: 1.5, borderRadius: 2, textTransform: "none" }}
            >
                Thay đổi ảnh
            </Button>
        </Box>
    );
};

export const ProfileFormSection: React.FC<ProfileFormSectionProps> = ({
    formData,
    onChange,
}) => {
    const licenseInputRef = useRef<HTMLInputElement>(null);
    const [license, setLicense] = useState<DocumentPreview>({
        name: "giay-phep-kinh-doanh.pdf",
        url: "https://placehold.co/300x420?text=Giay+Phep+Kinh+Doanh",
    });

    const handleLicenseChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setLicense({ name: file.name, url });
    };

    const fieldSx = {
        "& .MuiOutlinedInput-root": {
            borderRadius: 2.5,
            bgcolor: "background.paper",
        },
        "& .MuiInputLabel-root": { fontWeight: 500 },
    };

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
                    <SectionHeading
                        number="01"
                        title="Thông tin cá nhân"
                        description="Thông tin người đại diện và thông tin liên hệ trên tài khoản."
                        status="Thông tin tài khoản"
                        statusColor="info"
                    />

                    <Grid container spacing={2.5}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Họ và tên người đại diện"
                                value={formData.fullName}
                                onChange={(e) => onChange("fullName", e.target.value)}
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
                                value={formData.phone}
                                onChange={(e) => onChange("phone", e.target.value)}
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
                                onChange={(e) => onChange("email", e.target.value)}
                                sx={fieldSx}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailOutlined color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Chip
                                                    icon={<VerifiedOutlined />}
                                                    label="Đã xác minh"
                                                    color="success"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth
                                label="Địa chỉ thường trú theo CCCD"
                                value={formData.address}
                                onChange={(e) => onChange("address", e.target.value)}
                                sx={fieldSx}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <HomeOutlined color="action" />
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
                    <SectionHeading
                        number="02"
                        title="Căn cước công dân"
                        description="Tải ảnh rõ nét hai mặt CCCD để quản trị viên đối chiếu thông tin."
                        status="Đã xác minh"
                    />

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
                            <UploadPreview
                                title="Mặt trước CCCD"
                                initialSrc="https://placehold.co/640x400?text=CCCD+Mat+Truoc"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <UploadPreview
                                title="Mặt sau CCCD"
                                initialSrc="https://placehold.co/640x400?text=CCCD+Mat+Sau"
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
                    <SectionHeading
                        number="03"
                        title="Hồ sơ pháp lý"
                        description="Các giấy tờ liên quan đến hoạt động kinh doanh và điều kiện lưu trú."
                        status="Đã duyệt"
                    />

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
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                gap: 1,
                                mb: 2,
                            }}
                        >
                            <Box
                                component="div"
                                sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1.2 }}
                            >
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
                            </Box>
                            <Chip
                                icon={<CheckCircleOutlined />}
                                label="Đã duyệt"
                                color="success"
                                size="small"
                                variant="outlined"
                            />
                        </Stack>

                        <Divider sx={{ mb: 2 }} />

                        <Grid container spacing={2.5} sx={{ alignItems: "center" }}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                                {license.name.toLowerCase().endsWith(".pdf") ? (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: 1,
                                            height: 230,
                                            bgcolor: "grey.50",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 2,
                                            color: "text.secondary",
                                        }}
                                    >
                                        <DescriptionOutlined sx={{ fontSize: 54 }} />
                                        <Typography variant="body2" sx={{ fontWeight: 650 }}>
                                            Tài liệu PDF
                                        </Typography>
                                        <Typography variant="caption">Nhấn “Xem tài liệu” để mở</Typography>
                                    </Box>
                                ) : (
                                    <Box
                                        component="img"
                                        src={license.url}
                                        alt="Giấy phép kinh doanh"
                                        sx={{
                                            width: "100%",
                                            height: 230,
                                            objectFit: "contain",
                                            bgcolor: "grey.50",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 2,
                                        }}
                                    />
                                )}
                            </Grid>

                            <Grid size={{ xs: 12, sm: 8 }}>
                                <Stack spacing={1.5}>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                        <InsertDriveFileOutlined color="action" />
                                        <Typography
                                            variant="body2"
                                            sx={{ overflowWrap: "anywhere", fontWeight: 700 }}
                                        >
                                            {license.name}
                                        </Typography>
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary">
                                        Hồ sơ đã được gửi và phê duyệt bởi quản trị viên.
                                        Bạn có thể xem trước hoặc chọn tài liệu khác khi cần cập nhật.
                                    </Typography>

                                    <input
                                        ref={licenseInputRef}
                                        type="file"
                                        hidden
                                        accept="image/*,application/pdf"
                                        onChange={handleLicenseChange}
                                    />

                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<VisibilityOutlined />}
                                            onClick={() => window.open(license.url, "_blank")}
                                            sx={{ borderRadius: 2, textTransform: "none" }}
                                        >
                                            Xem tài liệu
                                        </Button>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            startIcon={<UploadFileOutlined />}
                                            onClick={() => licenseInputRef.current?.click()}
                                            sx={{
                                                borderRadius: 2,
                                                textTransform: "none",
                                                boxShadow: "none",
                                            }}
                                        >
                                            Thay tài liệu
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* PCCC và ANTT */}
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 3,
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                gap: 2,
                            }}
                        >
                            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                                <Box
                                    sx={{
                                        width: 42,
                                        height: 42,
                                        display: "grid",
                                        placeItems: "center",
                                        borderRadius: 2,
                                        bgcolor: "warning.50",
                                        color: "warning.dark",
                                        flexShrink: 0,
                                    }}
                                >
                                    <FireExtinguisherOutlined />
                                </Box>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 750 }}>
                                        Giấy chứng nhận PCCC & ANTT
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Giấy tờ điều kiện an toàn của cơ sở lưu trú
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                                <Chip
                                    label="Đã đính kèm"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                />
                                <Button
                                    size="small"
                                    startIcon={<VisibilityOutlined />}
                                    sx={{ textTransform: "none" }}
                                >
                                    Chi tiết
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Stack>
    );
};
