import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Root from "./pages/Root";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </div>
  );
}

export default App;
