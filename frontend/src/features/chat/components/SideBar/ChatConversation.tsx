import { useTheme } from "@mui/material/styles";
import { Avatar, Badge, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { IConversation, IMember } from "../../interfaces/chat";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setSelectedChat } from "@redux/chat/chatSlice";
import { formatDate } from "@utils/date";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme}`,
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function ChatConversation({
  _id,
  isGroup,
  members,
  groupAvatar,
  groupName,
  lastMessage,
  lastMessageDate
}: IConversation) {
  const { userInfo } = useAppSelector((state) => state.user);

  const chatUser = members.find(
    (member: IMember) => member._id !== userInfo?.id
  );

  console.log("last message: ", lastMessage);
  console.log("chat user: ", chatUser);
  const read = true;

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`conversations/${_id}`);
    dispatch(setSelectedChat(chatUser));
  };

  return (
    <Box
      display="flex"
      px={1}
      gap={1.5}
      py={1.5}
      my={1}
      borderRadius={2}
      sx={{
        cursor: "pointer",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark" ? "grey.900" : "grey.400", // Dynamic hover color
        },
        overflowX: "hidden", // Prevent horizontal scroll
      }}
      onClick={handleClick}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        // variant={  ? "dot" : "standard"}
      >
        <Avatar
          sx={{ width: 45, height: 45, backgroundColor: blue[50] }}
          src={isGroup ? groupAvatar : chatUser?.avatar}
        />
      </StyledBadge>

      <Box display="flex" flexDirection="column" width="85%" gap={0.3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%" // Ensure full width for the container
        >
          <Typography fontSize={15} fontWeight="bold" noWrap>
            {isGroup ? groupName : chatUser?.name}
          </Typography>
          {read ? null : (
            <Box
              width={10}
              height={10}
              bgcolor="#316b94"
              borderRadius="50%"
            ></Box>
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%" // Ensure full width for the container
        >
          <Typography
            fontSize={13}
            sx={{
              opacity: read ? "0.5" : "1",
              whiteSpace: "nowrap", // Prevent text wrapping
              overflow: "hidden", // Hide overflowing content
              textOverflow: "ellipsis", // Add ellipsis (...)
              maxWidth: "calc(100% - 80px)", // Ensure message text has space, considering avatar and padding
              flexGrow: 1, // Allow text to grow and fill space
            }}
            fontWeight={read ? 500 : 600}
          >
            {lastMessage.text}
          </Typography>
          <Typography
            fontSize={13}
            sx={{
              opacity: 0.5,
            }}
            px={1}
          >
            {formatDate(lastMessageDate)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
