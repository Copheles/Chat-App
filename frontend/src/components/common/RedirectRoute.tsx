import { useAppSelector } from "@redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function RedirectRoute({ children }: Props) {
  const { userInfo } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  if(userInfo){
    return <>{children}</>
  }
  
  return <>{children}</>;
}
