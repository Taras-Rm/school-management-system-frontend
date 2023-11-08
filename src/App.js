import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Root from "./pages/Root";
import { UserProvider } from "./user-context";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Root />
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
