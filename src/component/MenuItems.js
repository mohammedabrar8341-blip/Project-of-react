import { useEffect, useState } from "react";
import { Menu_URL } from "../../utlis/Links";
import { useParams } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";
import Rescategory from "./Rescategory";

const MenuItems = () => {
  const { resId } = useParams();
  const [menu, setmenu] = useState(null);



  useEffect(() => {
    getRestrec();
  }, []);


  const getRestrec = async () => {
    const result = await fetch(Menu_URL + resId);
    const json = await result.json();
    setmenu(json);
  };

  if (menu == null) {
    return <div>loading....</div>;
  }

  console.log("menu in menuitems", menu)

  console.log( menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

  const categories =
    menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (category) => {
        
        if (
          category?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" | category?.card?.card?.["@type"] === 'type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory'
        ) {
          return true;
        } else {
          return false;
        }
      },
    );

  console.log("categories", categories);

  return (
    <div
      style={{
        paddingLeft: "340px",
        paddingTop: "100px",
        paddingBottom: "50px",
        paddingRight: "340px",
      }}
    >
      {categories.map((category) => (
        <Rescategory
          key={category.card.card.categoryId}
          categoryInfo={category.card.card}
        />
      ))}
    </div>
  );
};

export default MenuItems;
