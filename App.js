import React from "react";
import Header from "./src/component/Head";
import Img from "./src/component/Img";
import RestaurantCard from "./src/component/RestaurantCard";
import Footer from "./src/component/Footer";
import Body from "./src/component/Body";
import { Outlet } from "react-router";

export default function App() {
  return (
    <div>
      <Header />
      {/* <Img /> */}
      <Outlet />
      {/* <Body /> */}
      <Footer />
    </div>
  );
}
