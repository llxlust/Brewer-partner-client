import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import LoginPage from "./pages/login-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateLayout from "./layout/private-layout";
import Dashboard from "./pages/dashboard-page";
import QRScannerPage from "./pages/coupon-scaner";
const router = createBrowserRouter([
  {
    path: "",
    element: <LoginPage />,
  },
  {
    path: "/private",
    element: <PrivateLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "coupons-scanner",
        element: <QRScannerPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  </StrictMode>
);
