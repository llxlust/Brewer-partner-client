import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SessionProvider from "../stores/session.provider";
import LoginPage from "../pages/login-page";
import PrivateLayout from "./private-layout";
import Dashboard from "../pages/dashboard-page";
import QRScannerPage from "../pages/coupon-scaner";

import "./main.css";
import CouponActive from "../pages/coupon-active";

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
      {
        path: "redeem/coupon/:couponId",
        element: <CouponActive />,
      },
    ],
  },
]);
export default function Main() {
  return (
    <>
      <SessionProvider>
        {" "}
        <RouterProvider router={router}></RouterProvider>
      </SessionProvider>
    </>
  );
}
