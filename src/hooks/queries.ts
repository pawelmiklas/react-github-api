import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api";

export const userQueries = {
  all: () => ["users"] as const,
};

export const useUserQuery = (searchTerm: string) => {
  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery({
      queryKey: [userQueries.all(), "list", searchTerm],
      queryFn: ({ pageParam = 1 }) => fetchUsers(searchTerm, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.items.length === 0) {
          return undefined;
        }

        return pages.length + 1;
      },
    });

  return {
    data: data?.pages.flatMap(({ items }) => items) ?? [],
    isLoading,
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    error,
  };
};
