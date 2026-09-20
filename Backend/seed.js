import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./Model/Restaurant.js";
import restaurantsArr from "./Data/restaurants.js";

import dns from "dns";

dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const seedRestaurants = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Insert your restaurant array
    const result = await Restaurant.insertMany(restaurantsArr);

    console.log(`${result.length} restaurants inserted successfully`);

    // Close connection
    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error inserting restaurants:", error.message);
  }
};

seedRestaurants();
