import { Menu_URL } from "./Links";
import { useState, useEffect } from "react";
const UseRestaurantMenu= (resId) => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    getDataRes();
  }, []);

  const getDataRes = async () => {
    const response = await fetch(Menu_URL + resId);
    const data = await response.json();
    setMenu(data);
  };
  return menu;
};
export default UseRestaurantMenu;
