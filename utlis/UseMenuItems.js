import { Menu_URL } from "./Links";
import { useState,useEffect } from "react";
const UseMenuItems = (resId) => {
  const [menu, setmenu] = useState(null);

  useEffect(() => {
    getRestrec();
  }, []);

  const getRestrec = async () => {
    const result = await fetch(Menu_URL + resId);
    const json = await result.json();
    setmenu(json);
  };
  return menu
};
export default UseMenuItems

