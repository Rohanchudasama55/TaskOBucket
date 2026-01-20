import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "./components/common/ToastContainer";
import { AlertProvider } from "./contexts/AlertContext";

function App() {
  return (
    <>
      <AlertProvider>
        <AppRoutes />
        <ToastContainer />
      </AlertProvider>
    </>
  );
}

export default App;
