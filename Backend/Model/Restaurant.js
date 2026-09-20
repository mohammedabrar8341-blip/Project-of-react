import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    resName: {
      type: String,
      required: true,
    },

    cuisine: {
      type: [String],
      default: [],
    },

    avgRating: {
      type: Number,
      default: 0,
    },

    delieveryTime: {
      type: Number,
      default: 0,
    },

    costForTwo: {
      type: String,
      default: "",
    },

    imgId: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
