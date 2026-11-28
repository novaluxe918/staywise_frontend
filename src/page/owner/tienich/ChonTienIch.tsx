
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Typography,
    Chip,
} from "@mui/material";
import { useTienIch } from "../../../context/TienIchContext";



interface Props {
    isEditing: boolean;
    tienIchHienThi?: string[];
}

function ChonTienIch({ isEditing, tienIchHienThi = [] }: Props) {
    const {
        danhSachTienIch,
        danhSachTienIchHS,
        toggleTienIch,
        dangTaiTienIch,
    } = useTienIch();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Tiện ích nổi bật
            </Typography>

            {isEditing ? (
                dangTaiTienIch ? (
                    <Typography color="text.secondary">
                        Đang tải tiện ích...
                    </Typography>
                ) : (
                    <FormGroup>
                        {danhSachTienIch.map((item) => (
                            <FormControlLabel
                                key={item.id}
                                control={
                                    <Checkbox
                                        checked={danhSachTienIchHS.includes(item.id)}
                                        onChange={() => toggleTienIch(item.id)}
                                    />
                                }
                                label={item.tenTienIch}
                            />
                        ))}
                    </FormGroup>
                )
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {tienIchHienThi.length > 0 ? (
                        tienIchHienThi.map((item, index) => (
                            <Chip key={index} label={item} size="small" />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Chưa cập nhật tiện ích.
                        </Typography>
                    )}
                </Box>
            )}
        </Paper>
    );
}

export default ChonTienIch;
