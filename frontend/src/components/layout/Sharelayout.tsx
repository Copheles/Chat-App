import ChatConverstions from "@components/ui/ChatConverstions";
import { Box, Stack } from "@mui/material";

export default function Sharelayout() {
  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <ChatConverstions />
      </Stack>
    </Box>
  );
}
