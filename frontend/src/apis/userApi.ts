import axiosClient from "./axiosClient";

const userApi = {
  getAllUser() {
    const url = "users";
    return axiosClient.get(url);
  },
};


export default userApi;