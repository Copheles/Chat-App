
import { Box, Typography } from "@mui/material";

interface MessageProps {
  text: string;
  timestamp: string;
  isSentByUser: boolean;
}

export default function Message({ text, timestamp, isSentByUser }: MessageProps) {
  return (
    <Box
      display="flex"
      justifyContent={isSentByUser ? "flex-end" : "flex-start"}
      py={1}
      px={2}
    >
      <Box
        maxWidth="75%"
        bgcolor={isSentByUser ? "primary.dark" : "grey.600"}
        color={isSentByUser ? "common.white" : "text.primary"}
        borderRadius={2}
        px={2}
        py={1}
        boxShadow={1}
        sx={{
          overflowWrap: "break-word",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1">{text}</Typography>
        <Typography
          variant="caption"
          display="block"
          textAlign="right"
          sx={{ opacity: 0.7, mt: 0.5 }}
        >
          {timestamp}
        </Typography>
      </Box>
    </Box>
  );
}
