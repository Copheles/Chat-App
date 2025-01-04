import { IConversation } from "@features/chat/interfaces/chat";
import { Box } from "@mui/material";
import ChatConversation from "./ChatConversation";
import ChatConversationSkeleton from "./ChatConversationSkeleton";
import useGetConversationQuery from "@features/chat/hooks/conversation/useGetConversationQuery";

export default function ScrollLableChatList() {
  const { data, isLoading } = useGetConversationQuery();
  console.log("data: ", data);
  return (
    <Box
      flex={1} // Fills available space for scrolling
      overflow="auto" // Enables scrolling
      py={1}
      marginTop={1}
      width="100%"
    >
      {isLoading
        ? Array.from({ length: 9 }).map((_, index) => (
            <ChatConversationSkeleton key={index} />
          ))
        : data?.pages[0].data.map((conversation: IConversation) => (
            <ChatConversation
              key={conversation._id}
              _id={conversation._id}
              lastMessage={conversation.lastMessage}
              members={conversation.members}
              createdAt={conversation.createdAt}
              updatedAt={conversation.updatedAt}
              isGroup={conversation.isGroup}
              groupAvatar={conversation.groupAvatar}
              groupName={conversation.groupName}
            />
          ))}
    </Box>
  );
}
