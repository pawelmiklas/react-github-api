import { queryOptions, useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api";

export const userQueries = {
  all: () => ["users"] as const,
  list: (query?: string) =>
    queryOptions({
      queryKey: [...userQueries.all(), "list", query],
      queryFn: () => fetchUsers(query),
    }),
};

export const useUserQuery = (query?: string) => {
  return useQuery(userQueries.list(query));
};
