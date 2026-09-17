import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "./src/utlis/Aboutus";
import { Carts } from "./src/utlis/Cart";
import { Contact } from "./src/utlis/Contactus";
import { Error } from "./src/utlis/Error";
import Body from "./src/component/Body";
import { Auth } from "./src/component/Auth";
import { Signin } from "./src/component/Signin";
import { Siginup } from "./src/component/Signup";
import ResturantPage from "./src/component/Restaurantmenupage";
import { lazy, Suspense } from "react";
import { CartProvider } from "./src/utlis/CartContext";
import Payment from "./src/component/Payment";
import OrderSuccess from "./src/component/OrderSuccess";

const Grocery = lazy(() => import("./src/component/Grocery "));
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <Carts />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurant/:resId",
        element: <ResturantPage />,
      },
      {
        path: "/grocery ",
        element: (
          <Suspense fallback={<h1>loading....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "/auth/signin",
            element: <Signin />,
          },
          {
            path: "/auth/signup",
            element: <Siginup />,
          },
        ],
      },
    ],
    errorElement: <Error />,
  },
]);
const root = createRoot(document.querySelector(".root"));
// root.render(<App />);
root.render(
  <CartProvider>
    <RouterProvider router={appRouter} />
  </CartProvider>
);
