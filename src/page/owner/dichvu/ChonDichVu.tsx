
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Paper,
    Typography,
    Chip,
} from "@mui/material";
import { useDichVu } from "../../../context/DichVuContext";

interface Props {
    isEditing: boolean;
    dichVuHienThi?: string[];
}

function ChonDichVu({ isEditing, dichVuHienThi = [] }: Props) {
    const {
        danhSachDichVu,
        danhSachDichVuHS,
        toggleDichVu,
        dangTaiDichVu,
    } = useDichVu();

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
                Dịch vụ đi kèm
            </Typography>

            {isEditing ? (
                dangTaiDichVu ? (
                    <Typography color="text.secondary">
                        Đang tải dịch vụ...
                    </Typography>
                ) : (
                    <FormGroup>
                        {danhSachDichVu.map((item) => (
                            <FormControlLabel
                                key={item.id}
                                control={
                                    <Checkbox
                                        checked={danhSachDichVuHS.includes(item.id)}
                                        onChange={() => toggleDichVu(item.id)}
                                    />
                                }
                                label={item.tenDichVu}
                            />
                        ))}
                    </FormGroup>
                )
            ) : (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {dichVuHienThi.length > 0 ? (
                        dichVuHienThi.map((item, index) => (
                            <Chip key={index} label={item} size="small" />
                        ))
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Chưa cập nhật dịch vụ.
                        </Typography>
                    )}
                </Box>
            )}
        </Paper>
    );
}

export default ChonDichVu;
