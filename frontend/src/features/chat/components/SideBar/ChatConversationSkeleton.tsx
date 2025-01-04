import { Box, Skeleton } from "@mui/material";

export default function ChatConversationSkeleton() {
  return (
    <Box
      display="flex"
      px={1}
      gap={1.5}
      py={1.5}
      my={1}
      borderRadius={2}
      width='100%'
    >
      <Skeleton
        variant="circular"
        width={46}
        height={46}
        sx={{ flexShrink: 0 }}
      />
      <Box display="flex" flexDirection="column" width="85%" gap={0.3}>
        <Skeleton
          variant="text"
          height={20}
          width="25%"
          sx={{ marginBottom: 0.5 }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Skeleton
            variant="text"
            height={15}
            width="50%"
            sx={{ marginBottom: 0.5 }}
          />
          <Skeleton
            variant="text"
            height={15}
            width="13%"
            sx={{ marginBottom: 0.5 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
