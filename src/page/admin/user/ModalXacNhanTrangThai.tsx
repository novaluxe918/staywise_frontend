
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack
} from "@mui/material";

import {
    LockOutlined,
    LockOpenOutlined
} from "@mui/icons-material";

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLocked: boolean;
    userName: string;
    loading?: boolean;
}

function ModalXacNhanTrangThai({
    open,
    onClose,
    onConfirm,
    isLocked,
    userName,
    loading = false
}: Props) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogTitle>
                {isLocked
                    ? "Xác nhận mở khóa tài khoản"
                    : "Xác nhận khóa tài khoản"}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ alignItems: "center", py: 2 }}>
                    {isLocked ? (
                        <LockOpenOutlined
                            sx={{ fontSize: 45, color: "#0D9488" }}
                        />
                    ) : (
                        <LockOutlined
                            sx={{ fontSize: 45, color: "#DC2626" }}
                        />
                    )}

                    <Typography sx={{ textAlign: "center" }}>
                        Bạn có chắc chắn muốn{" "}
                        <strong>
                            {isLocked ? "mở khóa" : "khóa"}
                        </strong>{" "}
                        tài khoản của <strong>{userName}</strong> không?
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ textAlign: "center", fontSize: 13 }}
                    >
                        {isLocked
                            ? "Người dùng sẽ có thể tiếp tục sử dụng hệ thống."
                            : "Người dùng sẽ không thể truy cập vào hệ thống khi tài khoản bị khóa."}
                    </Typography>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                    disabled={loading}
                >
                    Hủy
                </Button>

                <Button
                    onClick={onConfirm}
                    variant="contained"
                    color={isLocked ? "success" : "error"}
                    disabled={loading}
                >
                    {loading
                        ? "Đang xử lý..."
                        : isLocked
                            ? "Mở khóa"
                            : "Xác nhận khóa"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalXacNhanTrangThai;
