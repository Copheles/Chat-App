import ModalManager from "@components/modal/ModalManager";
import Toast from "@components/ui/Toast";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { router } from "@routes/Routes";
import GlobalStylesComponent from "@styles/GlobalStylesComponent";
import getTheme from "@styles/theme";
import { RouterProvider } from "react-router-dom";

function App() {
  const mode = useAppSelector((state) => state.theme.mode);

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStylesComponent />
      <Toast />
      <ModalManager />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
