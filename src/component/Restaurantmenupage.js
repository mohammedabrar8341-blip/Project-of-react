import { useEffect, useState } from "react";
import { Menu_URL } from "../../utlis/Links";
import { useParams } from "react-router-dom";
import { Shimmer } from "./Shimmer";
import RestaurantInfo from "./RestaurantInfo";
import Rescategory from "./Rescategory";
import MenuItems from "./MenuItems";

const ResturantPage = () => {
  const { resId } = useParams();

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    getDataRes();
  }, []);

  const getDataRes = async () => {
    const response = await fetch(Menu_URL + resId);
    const data = await response.json();
    setMenu(data);
  };


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
