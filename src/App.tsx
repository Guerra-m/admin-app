import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./router/AppRouter";
import { useAuth } from "./modules/auth/hooks/useAuth";

const queryClient = new QueryClient();

function App() {
  const { getMe } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;