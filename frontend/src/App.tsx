import RouterComponent from "@/routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UseScreenSize from "./hooks/UseScreenSize";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
      // refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { md } = UseScreenSize();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterComponent />

      {!md && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
