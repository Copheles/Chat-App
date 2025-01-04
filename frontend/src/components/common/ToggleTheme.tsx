import WbSunnyIcon from "@mui/icons-material/WbSunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import { IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { toggleTheme } from "@redux/theme/themeSlice";

export default function ToggleTheme() {
  const mode = useAppSelector((state) => state.theme.mode);
  const dispatch = useAppDispatch();
  
  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <IconButton onClick={handleClick}>
      {mode === "light" ? <BedtimeIcon /> : <WbSunnyIcon />}
    </IconButton>
  );
}
