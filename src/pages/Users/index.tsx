import React, { useState, useEffect, useCallback } from "react";
import {
  TextField,
  Typography,
  debounce,
  Box,
  CircularProgress,
} from "@mui/material";
import { useUserQuery } from "../../hooks";
import { UsersTable } from "./components/UsersTable";
import InfiniteScroll from "react-infinite-scroller";

const DEBOUNCE_TIME = 2000;

export const UsersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("tes");
  const { data, isLoading, fetchNextPage, hasNextPage } =
    useUserQuery(searchTerm);

  const debouncedSearch = debounce((value: string) => {
    setSearchTerm(value);
  }, DEBOUNCE_TIME);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  const loadMore = useCallback(() => {
    if (!isLoading && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoading, hasNextPage, fetchNextPage]);

  useEffect(() => {
    return () => {
      debouncedSearch.clear();
    };
  }, []);

  return (
    <main>
      <Typography variant="h4" gutterBottom>
        GitHub Users Search
      </Typography>

      <TextField
        label="Search GitHub Users"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        margin="normal"
      />

      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasNextPage}
        loader={
          <Box textAlign="center" key={0}>
            <CircularProgress />
          </Box>
        }
      >
        <UsersTable isLoading={isLoading && !data.length} data={data ?? []} />
      </InfiniteScroll>
    </main>
  );
};
