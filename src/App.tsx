import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UsersList } from "./pages/Users";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersList />
    </QueryClientProvider>
  );
};

export default App;
