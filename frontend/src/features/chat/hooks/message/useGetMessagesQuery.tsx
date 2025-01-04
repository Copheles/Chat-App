import messageApi from "@apis/messageApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetMessagesQuery(conversationId: string) {
  const {
    data,
    fetchNextPage, // Function to load more data
    hasNextPage, // Boolean indicating if more data is available
    isFetchingNextPage, // Boolean indicating if next page is being fetched
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => messageApi.getConversationMessages(conversationId),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}
