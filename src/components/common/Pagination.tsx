
import React from "react";
import { TablePagination } from "@mui/material";

interface Props {
    trang: number;
    kichThuoc: number;
    tongSoBanGhi: number;
    onChangePage: (trangMoi: number) => void;
    onChangeRowsPerPage: (kichThuocMoi: number) => void;
}

function Pagination({
    trang,
    kichThuoc,
    tongSoBanGhi,
    onChangePage,
    onChangeRowsPerPage,
}: Props) {
    return (
        <TablePagination
            component="div"
            count={tongSoBanGhi}
            page={trang}
            rowsPerPage={kichThuoc}
            onPageChange={(_, trangMoi) => onChangePage(trangMoi)}
            onRowsPerPageChange={(e) =>
                onChangeRowsPerPage(Number(e.target.value))
            }
            rowsPerPageOptions={[5, 10, 20, 50]}
            labelRowsPerPage="Số dòng mỗi trang:"
            labelDisplayedRows={({ from, to, count }) =>
                `Đang hiển thị ${from}-${to} trên tổng số ${count}`
            }
            sx={{
                borderTop: "1px solid #E0E0E0",
                ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
                    fontSize: "13px",
                },
            }}
        />
    );
}

export default Pagination;
