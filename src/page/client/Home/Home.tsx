
import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import HeroSection from "../../../components/client/HeroSection";
import DiscoverSection from "../../../components/client/DiscoverSection";



function Home() {
  const [visible, setVisible] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ bgcolor: "#FFF", overflow: "hidden" }}>
      {/* Banner và tìm kiếm */}
      <HeroSection />

      {/* Khám phá homestay */}
      <Box ref={sectionRef}>
        <DiscoverSection visible={visible} />
      </Box>
    </Box>
  );
}

export default Home;
