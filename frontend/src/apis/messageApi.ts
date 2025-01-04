import axiosClient from "./axiosClient";

const messageApi = {
  getConversationMessages(conversationId: string) {
    const url = `conversations/${conversationId}/messages`;

    return axiosClient.get(url);
  },
};

export default messageApi;
