import React from "react";
import {
  Box,
  Pagination as MuiPagination,
  FormControl,
  Select,
  MenuItem,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";

interface Props {
  trang: number;
  kichThuoc: number;
  tongSoBanGhi: number;
  onChangePage: (trangMoi: number) => void;
  onChangeRowsPerPage: (kichThuocMoi: number) => void;
  tenBanGhi?: string;
}

function Pagination({
  trang,
  kichThuoc,
  tongSoBanGhi,
  onChangePage,
  onChangeRowsPerPage,
  tenBanGhi = "tiện ích",
}: Props) {
  const theme = useTheme();

  const tongSoTrang = Math.max(1, Math.ceil(tongSoBanGhi / kichThuoc));
  const tu = tongSoBanGhi === 0 ? 0 : trang * kichThuoc + 1;
  const den = Math.min((trang + 1) * kichThuoc, tongSoBanGhi);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        px: 2.5,
        py: 1.5,
        mt: 1.5,
        gap: 2,
        backgroundColor: "background.paper",
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "flex-start" },
          gap: 1.5,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: "0.85rem" }}
        >
          Hiển thị{" "}
          <Box
            component="span"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {tu} - {den}
          </Box>{" "}
          trên tổng số{" "}
          <Box
            component="span"
            sx={{ fontWeight: 600, color: "text.primary" }}
          >
            {tongSoBanGhi.toLocaleString("vi-VN")}
          </Box>{" "}
          {tenBanGhi}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.85rem", display: { xs: "none", md: "block" } }}
          >
            • Số dòng:
          </Typography>

          <FormControl size="small">
            <Select
              value={kichThuoc}
              onChange={(e) => onChangeRowsPerPage(Number(e.target.value))}
              sx={{
                height: 32,
                fontSize: "0.85rem",
                fontWeight: 500,
                borderRadius: 1.5,
                backgroundColor: alpha(theme.palette.action.hover, 0.03),
                "& .MuiSelect-select": {
                  py: 0.5,
                  pl: 1.5,
                  pr: 3.5,
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "divider",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "primary.main",
                },
              }}
            >
              {[5, 10, 20, 50].map((size) => (
                <MenuItem
                  key={size}
                  value={size}
                  sx={{ fontSize: "0.85rem" }}
                >
                  {size} / trang
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Khu vực các nút bấm chuyển trang */}
      <MuiPagination
        count={tongSoTrang}
        page={trang + 1}
        onChange={(_, page) => onChangePage(page - 1)}
        color="primary"
        shape="rounded"
        size="small"
        showFirstButton
        showLastButton
        disabled={tongSoBanGhi === 0}
        sx={{
          "& .MuiPaginationItem-root": {
            fontWeight: 500,
            fontSize: "0.85rem",
            borderRadius: 1.5,
            minWidth: 32,
            height: 32,
            transition: "all 0.2s ease",
            border: "1px solid transparent",
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
              borderColor: alpha(theme.palette.primary.main, 0.2),
            },
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            fontWeight: 600,
            boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.35)}`,
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          },
          "& .MuiPaginationItem-previousNext, & .MuiPaginationItem-firstLast": {
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
          },
        }}
      />
    </Box>
  );
}

export default Pagination;