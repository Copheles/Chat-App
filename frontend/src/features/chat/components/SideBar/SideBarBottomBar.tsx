import { Avatar, Box, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { blue } from "@mui/material/colors";
import useLogoutMutation from "@features/auth/hooks/useLogoutMutation";

export default function SideBarBottomBar() {
  const mutation = useLogoutMutation();

  return (
    <Box display="flex" px={1} gap={1.5} py={1.5} borderRadius={2}>
      <Avatar sx={{ width: 42, height: 42, backgroundColor: blue[50] }} />
      <Box display="flex" flexDirection="column" flex={1}>
        <Typography fontSize={16} fontWeight="bold">
          Copheles
        </Typography>

        <Typography fontSize={14} sx={{ opacity: 0.5 }} fontWeight={300}>
          @copheles
        </Typography>
      </Box>
      <IconButton onClick={() => mutation.mutate()}>
        <LogoutIcon color="primary" />
      </IconButton>
    </Box>
  );
}
