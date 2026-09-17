import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import Restaurant from "./Model/Restaurant.js";
import MenuItem from "./Model/MenuItem.js";
import Order from "./Model/Order.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "20mb" }));

const PORT = process.env.PORT || 8080;

app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);

    res.status(500).json({
      message: "Failed to fetch restaurants",
    });
  }
});

app.post("/api/menu/import", async (req, res) => {
  try {
    const { restaurantId, menu } = req.body;

    if (!restaurantId || !menu) {
      return res.status(400).json({
        message: "restaurantId and menu are required",
      });
    }

    const cards =
      menu?.data?.cards?.[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

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

        if (!details?.id || !details?.name) continue;

        const price =
          details?.price ?? details?.finalPrice ?? details?.defaultPrice ?? 0;
        menuItems.push({
          id: details.id,
          restaurantId,
          name: details.name,
          price: price / 100,
          description: details.description || "",
          imageId: details.imageId || "",
          category: categoryName,
          rating: details?.ratings?.aggregatedRating?.rating || 0,
          ratingCount: details?.ratings?.aggregatedRating?.ratingCount || "",
        });
      }
    }

    if (menuItems.length === 0) {
      return res.status(400).json({
        message: "No menu items found",
      });
    }

    await MenuItem.deleteMany({ restaurantId });

    await MenuItem.insertMany(menuItems);

    res.status(201).json({
      message: "Menu stored successfully",
      restaurantId,
      count: menuItems.length,
    });
  } catch (error) {
    console.error("Menu import error:", error);

    res.status(500).json({
      message: "Failed to store menu",
      error: error.message,
    });
  }
});

app.get("/api/menu/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menuItems = await MenuItem.find({ restaurantId });

    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu:", error);

    res.status(500).json({
      message: "Failed to fetch menu",
    });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      items,
      totalItems,
      totalAmount,
      paymentMethod,
      paymentStatus,
    } = req.body;

    if (
      !customerName ||
      !customerEmail ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Customer details, items, and payment method are required",
      });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      totalItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentStatus === "PAID" ? "PAID" : "PENDING",
      orderStatus: "PLACED",
    });

    res.status(201).json({
      message: "Order received",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

app.get("/api/restaurants/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findOne({
      id: restaurantId,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);

    res.status(500).json({
      message: "Failed to fetch restaurant",
    });
  }
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
