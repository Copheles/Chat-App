import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useGetMessagesQuery from "@features/chat/hooks/message/useGetMessagesQuery";
import Message from "./Message";
import { useAppSelector } from "@redux/hooks";
import { IMessage } from "@features/chat/interfaces/message";
import { formatDate } from "@utils/date";

export default function ChatMessages() {
  const { conversationId } = useParams<{ conversationId: string }>();
  const { data } = useGetMessagesQuery(conversationId || "");
  const { userInfo } = useAppSelector((state) => state.user);

  console.log("data: ", data?.pages[0].data);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <Box
      flex={1}
      overflow="auto"
      display="flex"
      flexDirection="column"
      bgcolor="background.paper"
      p={2}
      ref={messagesContainerRef}
    >
      {data?.pages[0].data.map((message: IMessage) => (
        <Message
          key={message._id}
          text={message.text}
          timestamp={formatDate(message.createdAt)}
          isSentByUser={userInfo?.id === message.sender}
        />
      ))}
    </Box>
  );
}
