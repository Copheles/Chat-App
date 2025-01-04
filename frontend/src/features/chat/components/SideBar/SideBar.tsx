import { Box } from "@mui/material";
import SideBarHeader from "./SideBarHeader";
import ScrollLableChatList from "./ScrollLableChatList";
import SideBarBottomBar from "./SideBarBottomBar";
import { useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";

  return (
    <Box
      width={{ xs: "100%", md: 400 }}
      height="100vh"
      display={{ xs: isRootRoute ? "flex" : "none", md: "flex" }}
      p={2}
      sx={{
        flexDirection: "column",
        borderRight: "0.1px solid #4d4b4b",
      }}
    >
      {/* Header Section */}
      <SideBarHeader />

      {/* Scrollable Chat List */}
      <ScrollLableChatList />

      {/* Footer Profile Section */}
      <SideBarBottomBar />
    </Box>
  );
}
