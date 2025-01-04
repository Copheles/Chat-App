import authApi from "@apis/authApi";
import { useAppDispatch } from "@redux/hooks";
import { toast } from "@redux/toast/toast.action";
import { setUser } from "@redux/user/user.slice";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useRegisterMutation() {
  const dispatch = useAppDispatch();

  const mutation = useMutation({
    mutationFn: (authData: IAuthPayload) => {
      return authApi.register(authData);
    },
    onSuccess: async (data) => {
      console.log("success", data);

      const user = await authApi.getMe();

      dispatch(
        setUser({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        })
      );
      dispatch(toast.success("Register Successfully"));
    },
    onError: (error: AxiosError<unknown, IErrorResponse>) => {
      console.log("Error happen when login user ", error);
      dispatch(toast.error(error.message));
    },
  });
  return mutation;
}
