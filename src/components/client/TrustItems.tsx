
import { Stack, Typography } from "@mui/material";
import { ShieldCheck } from "lucide-react";
import { GREEN, trustItems } from "../../constants/homeConstants";


function TrustItems() {
  return (
    <Stack
      direction="row"
      sx={{
        gap: { xs: 2, md: 4 },
        flexWrap: "wrap",
        justifyContent: "center",
        mt: 4,
      }}
    >
      {trustItems.map((item) => (
        <Stack
          key={item}
          direction="row"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <ShieldCheck size={16} color={GREEN} />

          <Typography sx={{ fontSize: 12, color: "#64748B" }}>
            {item}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export default TrustItems;
