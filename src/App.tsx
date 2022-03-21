import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./app/routes/index";

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;