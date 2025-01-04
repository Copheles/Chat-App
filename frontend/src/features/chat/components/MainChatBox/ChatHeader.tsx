import { Avatar, Box, IconButton, Typography } from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { green, grey } from "@mui/material/colors";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";

export default function ChatHeader() {
  const { conversationId } = useParams();
  console.log(conversationId);
  const { selectedChatUser: user } = useAppSelector((state) => state.chat);

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      px={{ xs: 0, md: 2 }}
      py={2}
      sx={{ borderBottom: "0.1px solid #4d4b4b" }}
      boxShadow={3}
    >
      <Box display="flex" alignItems="center" ml={{ xs: "1px", md: 1 }} gap={1}>
        <KeyboardArrowLeftIcon
          color="primary"
          sx={{ display: { xs: "flex", md: "none", cursor: "pointer" } }}
          onClick={handleBackToHome}
        />

        <Avatar src={user?.avatar} />
        <Box display="flex" flexDirection="column">
          <Typography>{user?.name}</Typography>
          <Typography
            fontSize={14}
            fontWeight={500}
            color={user?.online ? green[400] : grey[400]}
          >
            {user?.online ? "Online" : "Offline"}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <IconButton>
          <VideoCallIcon />
        </IconButton>
        <IconButton>
          <LocalPhoneIcon />
        </IconButton>
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
