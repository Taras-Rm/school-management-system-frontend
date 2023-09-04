import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Root from "./pages/Root";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </div>
  );
}

export default App;
