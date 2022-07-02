import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function CardSkeleton({ width = 345, height, textWidth=130 }) {
  return (
    <Stack spacing={1}>
      <Box sx={{backgroundColor: 'background.paper', p:2}}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Skeleton variant="text" sx={{ width: textWidth }} />
              <Skeleton variant="text" sx={{ width: textWidth }} />
            </Box>
          </Box>
          <Skeleton variant="circular" width={30} height={30} />
        </Box>
        <Skeleton variant="rectangular" width={width} height={height} />
      </Box>
    </Stack>
  );
}
