import React from 'react';
import type { DangKyDTO } from '../types/auth';
import api from './api';
import { data } from 'react-router-dom';

export async function dangKy(data: DangKyDTO){
    return api.post("/auth/dangKy", data);
}

export interface DangNhapRequest{
    email : string;
    matKhau : string;
}

export interface DangNhapResponse{
    token: string;
    id: number;
    email: string;
    vaiTro:string;
}

export const dangNhap = async(
    data: DangNhapRequest
): Promise<DangNhapResponse> => {
    const response = await api.post<DangNhapResponse>("/auth/dangNhap", data);
    return response.data;
}