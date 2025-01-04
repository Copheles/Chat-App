import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import SendBox from "./SendBox";
import ChatMessages from "./ChatMessages";

export default function MainChatBox() {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <ChatHeader />
      <ChatMessages />
      <SendBox />
    </Box>
  );
}
