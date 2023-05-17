import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import DodajPaket from "./pages/DodajPaket";
import PaketiData from "./components/PaketiData";
import "./css/App.css";
import AuthForm from "./components/AuthForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/paketi",
    element: <DodajPaket />,
  },
  {
    path: "/paketiData",
    element: <PaketiData />,
  },
  {
    path: "/auth",
    element: <AuthForm />,
  },
]);

function App() {
  return (
    <div className="centered-container">
      <div className="text-center">
        <RouterProvider router={router} />
        <PaketiData />
        <DodajPaket />
      </div>
    </div>
  );
}

export default App;
