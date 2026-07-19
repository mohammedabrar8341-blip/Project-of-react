import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "./utlis/Aboutus";
import { Carts } from "./utlis/Cart";
import { Contact } from "./utlis/Contactus";
import { Error } from "./utlis/Error";
import Body from "./src/component/Body";
import { Auth } from "./src/component/Auth";
import { Signin } from "./src/component/Signin";
import { Siginup } from "./src/component/Signup";
import ResturantPage from "./src/component/Restaurantmenupage";
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
        path: "/about",
        element: <About />,
      },
      {
        path: "/restaurant/:resId",
        element: <ResturantPage />,
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
root.render(<RouterProvider router={appRouter} />);
