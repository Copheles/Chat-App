import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectRoute({ children }: Props) {
  const { userInfo } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/register");
    }
  }, [userInfo, navigate]);
  

  if(userInfo === null){
    return null;
  }


  return <>{children}</>;
}
