import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersList } from "./pages/Users";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CssBaseline />
    <UsersList />
  </QueryClientProvider>
);

export default App;
