import React from 'react';
import type { DangKyDTO, DangNhapRequest, DangNhapResponse } from '../types/auth';
import api from './api';
export async function dangKy(data: DangKyDTO){
    return api.post("/auth/dangKy", data);
}



export const dangNhap = async (
    data: DangNhapRequest
): Promise<DangNhapResponse> => {
    const response = await api.post<DangNhapResponse>("/auth/dangNhap", data);
    return response.data;
};

export const dangXuat = async () => {
    return api.post("/auth/dang-xuat");
};