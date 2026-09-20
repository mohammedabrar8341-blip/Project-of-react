import { useState, useEffect } from "react";
const UseRestaurantMenu = (resId) => {
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDataRes();
  }, [resId]);

  const getDataRes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/menu/${resId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMenu(data);
      setError(null);
    } catch (err) {
      console.log("Failed to fetch menu:", err);
      setError(err.message);
      setMenu(null);
    }
  };
  return menu;
};
export default UseRestaurantMenu;
