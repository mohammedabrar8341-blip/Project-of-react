import RestaurantInfo from "./RestaurantInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Rescategory from "./Rescategory";
import UseMenuItems from "../utlis/UseMenuItems";


const MenuItems = () => {
  const impData = "Try this";

  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(0);

  const { menu, error } = UseMenuItems(resId);

  // Loading
  if (menu === null) {
    return <div>loading....</div>;
  }

  // Error
  if (error) {
    return (
      <div>
        <h2>Failed to load menu</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Group MongoDB menu items by category
  const groupedCategories = menu.reduce((groups, item) => {
    const categoryName = item.category || "Other";

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(item);

    return groups;
  }, {});

  // Convert grouped object into array
  const categories = Object.entries(groupedCategories).map(
    ([categoryName, items]) => ({
      categoryName,
      items,
    })
  );

  console.log("MongoDB menu:", menu);
  console.log("Categories:", categories);

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
            setShowIndex(index === showIndex ? null : index);
          }}
          order={index === showIndex}
          key={category.categoryName}
          categoryInfo={{
            title: category.categoryName,
            itemCards: category.items.map((item) => ({
              card: {
                info: item,
              },
            })),
          }}
        />
      ))}
    </div>
  );
};

export default MenuItems;