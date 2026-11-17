import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    Grid,
    Stack
} from '@mui/material';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileFormSection } from './ProfileFormSection';
import { ArrowLeft } from 'lucide-react';
import type { NguoiDungRequest, NguoiDungResponse } from '../../../types/nguoiDung';
import { capNhatThongTinNguoiDung, layThongTinNguoiDung } from '../../../services/nguoiDungService';
import { useUploadAnh } from '../../../hooks/useUploadAnh';
import { toast } from '../../../utils/toast';
import { useNavigate } from 'react-router-dom';


export const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('legal');
    const [nguoiDung, setNguoiDung] = useState<NguoiDungResponse | null>(null);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hoTen: "",
        soDienThoai: "",
        email: "",
    });
    const avatar = useUploadAnh();
    const cccdMatTruoc = useUploadAnh();
    const cccdMatSau = useUploadAnh();
    const giayPhep = useUploadAnh();
    const fetchNguoiDung = async () => {
        try {
            const data = await layThongTinNguoiDung();
            setNguoiDung(data);

            setFormData({
                hoTen: data.hoTen || "",
                soDienThoai: data.soDienThoai || "",
                email: data.email || "",
            });
        } catch (error) {
            console.error("Lỗi lấy thông tin người dùng:", error);
        }
    }

    useEffect(() => {
        fetchNguoiDung();
    }, []);

    const handleFieldChange = (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

const handleSave = async () => {
    try {
        const request: NguoiDungRequest = {
            hoTen: formData.hoTen,
            soDienThoai: formData.soDienThoai,

            anhDaiDien: avatar.fileAnh,
            anhCCCDMatTruoc: cccdMatTruoc.fileAnh,
            anhCCCDMatSau: cccdMatSau.fileAnh,
            anhGiayPhepKinhDoanh: giayPhep.fileAnh,
        };

        await capNhatThongTinNguoiDung(request);

        toast.success("Cập nhật hồ sơ thành công!");

        await fetchNguoiDung();

        avatar.xoaAnh();
        cccdMatTruoc.xoaAnh();
        cccdMatSau.xoaAnh();
        giayPhep.xoaAnh();

    } catch (error) {
        console.error("Lỗi cập nhật hồ sơ:", error);
        toast.error("Cập nhật hồ sơ thất bại!");
    }
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
                        <Button variant="outlined" color="inherit" startIcon={<ArrowLeft />} onClick={() => navigate(-1)}>
                            Quay lại
                        </Button>
                    </Stack>
                </Box>

                {/* Nội dung chia 2 cột */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4, lg: 3.5 }}>
                        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8, lg: 8.5 }}>
                        <ProfileFormSection       formData={formData}

                            anhDaiDien={nguoiDung?.anhDaiDien || null}
                            anhCCCDMatTruoc={nguoiDung?.anhCCCDMatTruoc || null}
                            anhCCCDMatSau={nguoiDung?.anhCCCDMatSau || null}
                            anhGiayPhepKinhDoanh={
                                nguoiDung?.anhGiayPhepKinhDoanh || null
                            }
                            trangThaiXacMinh={nguoiDung?.trangThaiXacMinh ?? "CHUA_XAC_MINH"}

                            previewAnhDaiDien={avatar.previewAnh}
                            previewCCCDMatTruoc={cccdMatTruoc.previewAnh}
                            previewCCCDMatSau={cccdMatSau.previewAnh}
                            previewGiayPhep={giayPhep.previewAnh}

                            onChange={handleFieldChange}

                            onAvatarChange={avatar.handleChonAnh}
                            onCCCDMatTruocChange={cccdMatTruoc.handleChonAnh}
                            onCCCDMatSauChange={cccdMatSau.handleChonAnh}
                            onGiayPhepChange={giayPhep.handleChonAnh}

                            onSave={handleSave} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ProfilePage;