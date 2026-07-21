import { useEffect, useState } from "react";
import { Menu_URL } from "../../utlis/Links";
import { useParams } from "react-router-dom";
import { Shimmer } from "./Shimmer";
import RestaurantInfo from "./RestaurantInfo";
import Rescategory from "./Rescategory";
import MenuItems from "./MenuItems";
import UseRestaurantMenu from "../../utlis/UseRestaurantMenu";

const ResturantPage = () => {
  const { resId } = useParams();

  const menu = UseRestaurantMenu(resId);

  if (menu == null) {
    return <Shimmer />;
  }

  return (
    <div>
      <RestaurantInfo menu={menu} />

      <MenuItems />
    </div>
  );
};
export default ResturantPage;
