
import { useState } from "react";
import { toast } from "../utils/toast";

const DINH_DANG_HOP_LE = [
    "image/png",
    "image/jpeg",
    "image/svg+xml",
];

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const useUploadAnh = () => {
    const [fileAnh, setFileAnh] = useState<File | null>(null);
    const [previewAnh, setPreviewAnh] = useState<string | null>(null);

    const handleChonAnh = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!DINH_DANG_HOP_LE.includes(file.type)) {
            toast.warning("Chỉ chấp nhận ảnh SVG, PNG, JPG!");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            toast.warning("Dung lượng ảnh không được vượt quá 2MB!");
            e.target.value = "";
            return;
        }
        setPreviewAnh((oldPreview) => {
            if (oldPreview) URL.revokeObjectURL(oldPreview);
            return URL.createObjectURL(file);
        });

        setFileAnh(file);
    };

    const xoaAnh = () => {
        setFileAnh(null);

        setPreviewAnh((oldPreview) => {
            if (oldPreview) URL.revokeObjectURL(oldPreview);
            return null;
        });
    };

    return {
        fileAnh,
        previewAnh,
        setFileAnh,
        setPreviewAnh,
        handleChonAnh,
        xoaAnh,
    };
};
