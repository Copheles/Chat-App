import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { conversationData } from "@data/conversations";
import SearchUser from "./SearchUser";

export default function FindUserForm() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState(conversationData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const filteredUsers = users.filter((user) => user.name.includes(name));
    setUsers(filteredUsers)
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" height={400}>
      <Box mb={1} flexShrink={0}>
        <TextField
          placeholder="Enter username..."
          value={name}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box
        flexGrow={1}
        overflow="auto" // Makes this area scrollable
        width="100%"
      >
        {users.map((user, index) => (
          <SearchUser key={index} name={user.name} avatar={user.avatar} />
        ))}
      </Box>
    </Box>
  );
}
