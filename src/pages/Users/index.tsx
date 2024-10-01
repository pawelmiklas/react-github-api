import { useEffect, useCallback, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  CircularProgress,
  debounce,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
  Alert,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useUserQuery, useYupValidationResolver } from "../../hooks";
import { UsersTable } from "./components/UsersTable";
import InfiniteScroll from "react-infinite-scroller";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

const DEBOUNCE_TIME = 2000;

const schema = yup.object({
  searchTerm: yup.string().min(3, "Search term must be at least 3 characters"),
});

export const UsersList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const resolver = useYupValidationResolver(schema);
  const { control, watch } = useForm<{ searchTerm: string }>({
    resolver,
    defaultValues: {
      searchTerm: "",
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useUserQuery(searchTerm);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, DEBOUNCE_TIME),
    []
  );

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.searchTerm) {
        debouncedSearch(value.searchTerm as string);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, debouncedSearch]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasNextPage && !error) {
      fetchNextPage();
    }
  }, [isLoading, hasNextPage, fetchNextPage, error]);

  return (
    <Box
      sx={{
        backgroundColor: "grey.100",
        minHeight: "100vh",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 0 },
      }}
    >
      <Container maxWidth="lg">
        <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            gutterBottom
            align="center"
            sx={{ mb: { xs: 2, sm: 3 } }}
          >
            GitHub users search
          </Typography>
          <Controller
            name="searchTerm"
            control={control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!formState.errors.searchTerm}
                helperText={formState.errors.searchTerm?.message}
                slotProps={{
                  input: { startAdornment: <SearchIcon color="action" /> },
                }}
              />
            )}
          />
        </Paper>
        <Box sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasNextPage}
            loader={
              error ? (
                <Box textAlign="center" key={0} sx={{ my: 2 }}>
                  <Alert
                    severity="error"
                    action={
                      <Button onClick={() => fetchNextPage()} color="inherit">
                        Retry
                      </Button>
                    }
                  >
                    <Typography>
                      An error occurred while fetching users. Please try again.
                    </Typography>
                  </Alert>
                </Box>
              ) : (
                <Box textAlign="center" key={0} sx={{ my: 2 }}>
                  <CircularProgress />
                </Box>
              )
            }
          >
            <UsersTable
              isLoading={isLoading && !data.length}
              data={data ?? []}
            />
          </InfiniteScroll>
        </Box>
      </Container>
    </Box>
  );
};
