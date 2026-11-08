import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Breadcrumbs,
    Link,
    Button,
    Grid,
    Stack
} from '@mui/material';
import { Save as SaveIcon} from '@mui/icons-material';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileFormSection } from './ProfileFormSection';
import { ArrowLeft } from 'lucide-react';


export const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('legal');
    const [formData, setFormData] = useState({
        fullName: 'Hoàng Minh Trí',
        phone: '0912 345 678',
        email: 'minhtri.staywise@gmail.com',
        address: 'Số 42 Đường Hoàng Hoa Thám, Phường 10, Thành phố Đà Lạt, Tỉnh Lâm Đồng'
    });

    const handleFieldChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Gọi API cập nhật hoặc dispatch action
        console.log('Dữ liệu cập nhật:', formData);
    };

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Header Bar */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: { xs: 'flex-start', sm: 'center' },
                        gap: 2,
                        mb: 3
                    }}
                >
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Hồ sơ chủ cơ sở & Giấy tờ pháp lý
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1.5}>
                        <Button variant="outlined" color="inherit" startIcon={<ArrowLeft />}>
                            Quay lại
                        </Button>
                        <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                            Lưu cập nhật hồ sơ
                        </Button>
                    </Stack>
                </Box>

                {/* Nội dung chia 2 cột */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
                        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>
                        <ProfileFormSection formData={formData} onChange={handleFieldChange} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProfilePage;