import { Box, Skeleton } from "@mui/material";

export default function MessageSkeleton({ index }: { index: number }) {
  return (
    <Box
      key={index}
      display="flex"
      justifyContent={index % 2 === 0 ? "flex-end" : "flex-start"}
      py={1}
      px={2}
    >
      <Box
        width="5%"
        bgcolor={index % 2 === 0 ? "primary.dark" : "grey.600"}
        borderRadius={2}
        px={2}
        py={1}
        boxShadow={1}
      >
        <Skeleton variant="text" width="100%" height={20} />
        <Skeleton variant="text" width="50%" height={15} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
  );
}
