import { image_URL } from "../utlis/Links";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantInfo = () => {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/restaurants/${resId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch restaurant");
        }

        const data = await response.json();

        console.log("MongoDB restaurant:", data);

        setRestaurant(data);
      } catch (error) {
        console.error("Restaurant fetch error:", error);
        setError(error.message);
      }
    };

    getRestaurant();
  }, [resId]);

  if (restaurant === null) {
    if (error) {
      return <h2>Failed to load restaurant</h2>;
    }

    return <div>Loading restaurant...</div>;
  }

  return (
    <div className="restaurant-info">
      <div className="menu-info-div">
        <h1>{restaurant.resName}</h1>
      </div>

      <div className="res-menu-img">
        <img
          className="menu-info-img"
          src={image_URL + restaurant.imgId}
          alt={restaurant.resName}
        />
      </div>

      <div className="menu-details">
        <div className="rating-row">
          <span className="rating">
            ⭐ {restaurant.avgRating}
          </span>

          <span className="cost">
            {restaurant.costForTwo}
          </span>
        </div>

        <p className="cuisines">
          {restaurant.cuisine?.join(", ")}
        </p>

        <div className="location">
          <p>
            <strong>Outlet</strong> • {restaurant.location}
          </p>
        </div>

        <p className="delivery-time">
          🚴 {restaurant.deliveryTime} mins
        </p>
      </div>
    </div>
  );
};

export default RestaurantInfo;