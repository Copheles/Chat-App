import authApi from "@apis/authApi";
import { toast } from "@redux/toast/toast.action";
import { clearUser } from "@redux/user/user.slice";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";


export default function useLogoutMutation (){
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: () => {
      return authApi.logout();
    },
    onSuccess: () => {
      dispatch(clearUser());
      dispatch(toast.success("Logged out successfully"))
    },
    onError: (error: AxiosError<unknown, IErrorResponse>) => {
      console.log("Error happen when login user ", error);
      dispatch(toast.error(error.message));
    },

  })

  return mutation;
}