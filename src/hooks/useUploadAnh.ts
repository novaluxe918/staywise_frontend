
import { useState } from "react";
import { toast } from "../utils/toast";

export interface AnhUpload {
    id: string;
    file: File;
    url: string;
}

interface UseUploadAnhOptions {
    nhieuAnh?: boolean;
    maxFiles?: number;
    maxSize?: number;
    dinhDang?: string[];
}

const DINH_DANG_MAC_DINH = [
    "image/png",
    "image/jpeg",
    "image/svg+xml",
];

export const useUploadAnh = ({
    nhieuAnh = false,
    maxFiles = 1,
    maxSize = 2 * 1024 * 1024,
    dinhDang = DINH_DANG_MAC_DINH,
}: UseUploadAnhOptions = {}) => {

    // Dùng cho upload một ảnh
    const [fileAnh, setFileAnh] = useState<File | null>(null);
    const [previewAnh, setPreviewAnh] = useState<string | null>(null);

    // Dùng cho upload nhiều ảnh
    const [anhList, setAnhList] = useState<AnhUpload[]>([]);
    const [anhBia, setAnhBia] = useState<string | null>(null);

    const handleChonAnh = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = Array.from(e.target.files ?? []);

        if (!files.length) return;

        const anhHopLe = files.filter(
            file =>
                dinhDang.includes(file.type) &&
                file.size <= maxSize
        );

        if (anhHopLe.length < files.length) {
            toast.warning("Một số ảnh không đúng định dạng hoặc vượt quá dung lượng!");
        }

        if (!anhHopLe.length) {
            e.target.value = "";
            return;
        }

        if (!nhieuAnh) {
            const file = anhHopLe[0];

            setPreviewAnh(old => {
                if (old) URL.revokeObjectURL(old);
                return URL.createObjectURL(file);
            });

            setFileAnh(file);
        } else {
            if (anhList.length + anhHopLe.length > maxFiles) {
                toast.warning(`Chỉ được tải tối đa ${maxFiles} ảnh!`);
                e.target.value = "";
                return;
            }

            const anhMoi = anhHopLe.map(file => ({
                id: crypto.randomUUID(),
                file,
                url: URL.createObjectURL(file),
            }));

            setAnhList(prev => [...prev, ...anhMoi]);

            if (!anhBia && anhMoi.length > 0) {
                setAnhBia(anhMoi[0].id);
            }
        }

        e.target.value = "";
    };

    // Xóa ảnh đơn
    const xoaAnhDon = () => {
        setFileAnh(null);

        setPreviewAnh(old => {
            if (old) URL.revokeObjectURL(old);
            return null;
        });
    };

    // Xóa ảnh trong danh sách
    const xoaAnhNhieu = (id: string) => {
        const anh = anhList.find(item => item.id === id);

        if (anh) URL.revokeObjectURL(anh.url);

        const danhSachMoi = anhList.filter(item => item.id !== id);
        setAnhList(danhSachMoi);

        if (anhBia === id) {
            setAnhBia(danhSachMoi[0]?.id ?? null);
        }
    };

    // Xóa toàn bộ ảnh trong danh sách
    const xoaTatCaAnh = () => {
        anhList.forEach(anh => {
            URL.revokeObjectURL(anh.url);
        });

        setAnhList([]);
        setAnhBia(null);
    };

    const chonAnhBia = (id: string) => {
        setAnhBia(id);
    };

    return {
        fileAnh,
        previewAnh,
        setFileAnh,
        setPreviewAnh,

        anhList,
        anhBia,

        handleChonAnh,

        xoaAnh: (id?: string) => {
            if (nhieuAnh) {
                if (!id) return;
                xoaAnhNhieu(id);
            } else {
                xoaAnhDon();
            }
        },

        xoaTatCaAnh,
        chonAnhBia,
    };
};
