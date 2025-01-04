import axiosClient from "./axiosClient";

const authApi = {
  register(data: IAuthPayload) {
    const url = "auth/register";
    return axiosClient.post(url, data);
  },
  login(data: ILoginPayload) {
    const url = "auth/login";
    return axiosClient.post(url, data);
  },
  logout() {
    const url = "auth/logout";
    return axiosClient.post(url);
  },
  getMe() {
    const url = "users/getMe";
    return axiosClient.get<unknown, IUserData>(url);
  },
};

export default authApi;