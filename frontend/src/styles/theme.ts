import { createTheme, ThemeOptions } from "@mui/material";

const getTheme = (mode: "light" | "dark"): ThemeOptions => {
  return createTheme({
    palette: {
      mode,
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
    },
  });
};

export default getTheme;
