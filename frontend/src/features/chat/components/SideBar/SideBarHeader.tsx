import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Search } from "@mui/icons-material";
import { useAppDispatch } from "@redux/hooks";
import { openModal } from "@redux/modal/modalSlice";

export default function SideBarHeader() {

  const dispatch = useAppDispatch();

  const handlePersonSearch = () => {
    dispatch(openModal({
      type: 'FindUserForm',
      header: 'Find Users'
    }))
  }

  return (
    <Box>
      <Box
        marginBottom={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        paddingX={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Messages
        </Typography>
        <IconButton onClick={handlePersonSearch}>
          <PersonSearchIcon color="primary"/>
        </IconButton>
      </Box>
      <OutlinedInput
        size="small"
        fullWidth
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
        placeholder="Search"
        sx={{
          borderRadius: "30px",
        }}
      />
    </Box>
  );
}
