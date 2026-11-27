
import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Search } from "lucide-react";
import { GREEN, searchFields, tabs } from "../../constants/homeConstants";



const fieldStyle = {
  p: 2,
  border: "1px solid #E2E8F0",
  borderRadius: "15px",
  textAlign: "left" as const,
  transition: "all .3s ease",
  "&:hover": {
    borderColor: "#86EFAC",
    bgcolor: "#F0FDF4",
  },
};

function SearchBox() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 1000,
        borderRadius: "25px",
        p: { xs: 2, md: 3 },
        bgcolor: "#FFF",
        border: "1px solid #DCFCE7",
        boxShadow: "0 25px 70px rgba(21,128,61,.12)",
        transition: "all .35s ease",
        "&:hover": {
          boxShadow: "0 30px 80px rgba(21,128,61,.18)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            sx={{
              borderRadius: "30px",
              px: 2.5,
              py: 1,
              fontSize: 13,
              fontWeight: 700,
              bgcolor:
                activeTab === tab.id ? GREEN : "#F1F5F9",
              color:
                activeTab === tab.id ? "#FFF" : "#475569",
              "&:hover": {
                bgcolor:
                  activeTab === tab.id
                    ? "#166534"
                    : "#DCFCE7",
              },
            }}
          >
            {tab.name}
          </Button>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "1.2fr 1fr 1fr auto",
          },
          gap: 2,
        }}
      >
        {searchFields.map(({ icon: Icon, title, value }) => (
          <Box key={title} sx={fieldStyle}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1,
              }}
            >
              <Icon size={17} color={GREEN} />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: "#334155",
                }}
              >
                {title}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: 13, color: "#94A3B8" }}>
              {value}
            </Typography>
          </Box>
        ))}

        <Button
          variant="contained"
          startIcon={<Search size={19} />}
          sx={{
            borderRadius: "15px",
            bgcolor: GREEN,
            fontWeight: 800,
            minHeight: 65,
            boxShadow: "none",
            "&:hover": {
              bgcolor: "#166534",
              transform: "translateY(-3px)",
              boxShadow: "0 10px 25px #15803D35",
            },
          }}
        >
          Tìm kiếm
        </Button>
      </Box>
    </Paper>
  );
}

export default SearchBox;
