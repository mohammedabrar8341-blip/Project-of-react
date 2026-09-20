import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Restaurant from "./Model/Restaurant.js";
import MenuItem from "./Model/MenuItem.js";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const Menu_URL =
  "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.374638644228302&lng=78.4300148114562&restaurantId=";

const importMenus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const restaurants = await Restaurant.find();

    console.log(`${restaurants.length} restaurants found`);

    for (const restaurant of restaurants) {
      console.log(`\nFetching menu: ${restaurant.resName}`);

      const response = await fetch(Menu_URL + restaurant.id);

      if (!response.ok) {
        console.log(
          `Failed to fetch ${restaurant.resName}: ${response.status}`,
        );
        continue;
      }

      const data = await response.json();

      const cards =
        data?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const categories = cards.filter((category) => {
        const type = category?.card?.card?.["@type"];

        return (
          type ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
          type ===
            "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        );
      });

      const menuItems = [];

      for (const category of categories) {
        const categoryInfo = category?.card?.card;

        const categoryName = categoryInfo?.title || "Other";

        const items = categoryInfo?.itemCards || [];

        for (const item of items) {
          const details = item?.card?.info;

          if (!details) continue;

          const rating = details?.ratings?.aggregatedRating?.rating || 0;

          const ratingCount =
            details?.ratings?.aggregatedRating?.ratingCount || "";

          const price =
            details?.price ?? details?.finalPrice ?? details?.defaultPrice ?? 0;

          menuItems.push({
            restaurantId: restaurant.id,

            itemId: details.id,

            name: details.name || "",

            price: price / 100,

            description: details.description || "",

            imageId: details.imageId || "",

            category: categoryName,

            rating,

            ratingCount,
          });
        }
      }

      if (menuItems.length === 0) {
        console.log(`No menu items found for ${restaurant.resName}`);
        continue;
      }

      // Remove old menu for this restaurant
      await MenuItem.deleteMany({
        restaurantId: restaurant.id,
      });

      // Insert new menu
      await MenuItem.insertMany(menuItems);

      console.log(
        `${menuItems.length} menu items inserted for ${restaurant.resName}`,
      );
    }
console.log("\nMenu import process completed.");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Menu import failed:", error);
    process.exit(1);
  }
};

importMenus();
