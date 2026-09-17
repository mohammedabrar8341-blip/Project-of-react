import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    restaurantId: {
      type: String,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },

    imageId: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Other",
    },

    rating: {
      type: Number,
      default: 0,
    },

    ratingCount: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

menuItemSchema.index({ restaurantId: 1, id: 1 }, { unique: true });

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export default MenuItem;
