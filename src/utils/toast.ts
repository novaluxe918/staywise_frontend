import Swal, { type SweetAlertIcon } from "sweetalert2";

const ToastBase = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
});

export const showToast = (icon: SweetAlertIcon, title: string, timer = 2500) => {
    return ToastBase.fire({
        icon,
        title,
        timer,
    });
};


export const toast = {
    success: (title: string, timer = 2500) => showToast("success", title, timer),
    warning: (title: string, timer = 2500) => showToast("warning", title, timer),
    error: (title: string, timer = 3000) => showToast("error", title, timer),
    info: (title: string, timer = 2500) => showToast("info", title, timer),
};

export const alertModal = {
    error: (title: string, text?: string) =>
        Swal.fire({
            icon: "error",
            title,
            text,
            confirmButtonText: "Đóng",
            confirmButtonColor: "#dc2626",
        }),
    success: (title: string, text?: string) =>
        Swal.fire({
            icon: "success",
            title,
            text,
            confirmButtonText: "Đóng",
            confirmButtonColor: "#2563eb",
        }),
};