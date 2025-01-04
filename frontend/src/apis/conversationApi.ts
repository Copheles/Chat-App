import axiosClient from "./axiosClient";

const conversationApi = {
  getRelatedConversation({ pageParam = 1 }) {
    const url = `conversations?page=${pageParam}`;

    return axiosClient.get(url);
  },
};

export default conversationApi;
