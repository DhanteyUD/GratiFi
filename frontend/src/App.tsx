import RouterComponent from "@/routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { WalletProvider } from "@/providers/WalletProvider";
import UseScreenSize from "./hooks/UseScreenSize";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

function App() {
  const { md } = UseScreenSize();

  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <RouterComponent />
        {!md && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </WalletProvider>
  );
}

export default App;
