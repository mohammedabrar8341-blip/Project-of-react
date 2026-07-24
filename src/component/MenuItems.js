import { useEffect, useState } from "react";
import { Menu_URL } from "../../utlis/Links";
import { useParams } from "react-router-dom";
import RestaurantInfo from "./RestaurantInfo";
import Rescategory from "./Rescategory";
import UseMenuItems from "../../utlis/UseMenuItems";
("../../utlis/UseRestaurantMenu");

const MenuItems = () => {
  const impData ="Try this "
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(1);
  const menu = UseMenuItems(resId);

  if (menu == null) {
    return <div>loading....</div>;
  }

  // console.log("menu in menuitems", menu);

  // console.log(menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories = (
    menu?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || []
  ).filter((category) => {
    const type = category?.card?.card?.["@type"];
    return (
      type === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      type ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );
  });

  // console.log("categories", categories);

  return (
    <div
      style={{
        paddingLeft: "340px",
        paddingTop: "100px",
        paddingBottom: "50px",
        paddingRight: "340px",
      }}
    >
      {categories.map((category, index) => (
        <Rescategory
        propData={impData}
          setIndex={() => {
            setShowIndex(index==showIndex?null:index);
          }}
          order={index == showIndex ? true : false}
          key={category.card.card.categoryId}
          categoryInfo={category.card.card}
        />
      ))}
    </div>
  );
};

export default MenuItems;
