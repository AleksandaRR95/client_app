import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import DodajPaket from "./pages/DodajPaket";
import PaketiData from "./components/PaketiData";
import "./css/App.css";
import AuthForm from "./components/AuthForm";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/dodajPaket",
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
    ]
  }
  
]);

function App() {
  return (
    <div className="centered-container">
      <div className="text-center">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
