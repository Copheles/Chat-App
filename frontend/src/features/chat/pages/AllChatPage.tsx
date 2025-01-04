import { Box } from "@mui/material";
import SideBar from "../components/SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";

export default function AllChatPage() {
  const location = useLocation();
  const isRootRoute = location.pathname === "/";

  return (
    <Box display="flex">
      <SideBar />
      <Box display={{ xs: isRootRoute ? "none" : "", md: "block" }} flex={1}>
        <Outlet />
      </Box>
    </Box>
  );
}
