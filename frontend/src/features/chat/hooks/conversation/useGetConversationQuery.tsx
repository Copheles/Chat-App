import conversationApi from "@apis/conversationApi";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetConversationQuery() {
  const {
    data,
    fetchNextPage, // Function to load more data
    hasNextPage, // Boolean indicating if more data is available
    isFetchingNextPage, // Boolean indicating if next page is being fetched
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["conversations"],
    queryFn: conversationApi.getRelatedConversation,
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
