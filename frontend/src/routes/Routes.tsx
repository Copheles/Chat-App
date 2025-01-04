import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@features/auth/pages/LoginPage";
import RegisterPage from "@features/auth/pages/RegisterPage";
import AllChatPage from "@features/chat/pages/AllChatPage";
import ProtectRoute from "@components/common/ProtectRoute";
import RedirectRoute from "@components/common/RedirectRoute";
import MainChatBox from "@features/chat/components/MainChatBox/MainChatBox";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RedirectRoute>
        <LoginPage />
      </RedirectRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <RedirectRoute>
        <RegisterPage />
      </RedirectRoute>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectRoute>
        <AllChatPage />
      </ProtectRoute>
    ),
    children: [
      {
        path: "conversations/:conversationId",
        element: <MainChatBox />,
      },
    ],
  },
]);
