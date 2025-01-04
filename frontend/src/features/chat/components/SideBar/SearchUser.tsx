import { Avatar, Box, Button, Typography } from "@mui/material";

interface IUser {
  name: string;
  avatar: string;
}

export default function SearchUser({ name, avatar }: IUser) {
  return (
    <Box
      width="100%"
      display="flex"
      gap={2}
      alignItems="center"
      my={2}
      justifyContent="space-between"
    >
      <Box display='flex' alignItems='center' gap={1}>
        <Avatar src={avatar} />
        <Box display="flex" flexDirection="column">
          <Typography fontSize={16}>{name}</Typography>
          <Typography fontSize={14} sx={{ opacity: 0.7 }}>
            google@gmail.com
          </Typography>
        </Box>
      </Box>
      <Button>Add</Button>
    </Box>
  );
}
