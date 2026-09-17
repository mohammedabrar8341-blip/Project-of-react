import { useEffect, useState } from "react";

const UseMenuItems = (resId) => {
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!resId) return;

    const getMenu = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/menu/${resId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch menu");
        }

        const data = await response.json();

        console.log("MongoDB menu:", data);

        setMenu(data);
      } catch (error) {
        console.error("Menu fetch error:", error);
        setError(error.message);
      }
    };

    getMenu();
  }, [resId]);

  return { menu, error };
};

export default UseMenuItems;