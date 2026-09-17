import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Shimmer } from "./Shimmer";
import RestaurantInfo from "./RestaurantInfo";
import MenuItems from "./MenuItems";

const ResturantPage = () => {
  const { resId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRestaurant = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:8080/api/restaurants");
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }

        const restaurants = await response.json();
        const matchingRestaurant = restaurants.find(
          (item) => String(item.id) === String(resId)
        );

        setRestaurant(matchingRestaurant || null);
      } catch (fetchError) {
        console.error("Restaurant fetch error:", fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    getRestaurant();
  }, [resId]);

  if (loading) {
    return <Shimmer />;
  }

  if (error) {
    return <h2>Failed to load restaurant: {error}</h2>;
  }

  if (!restaurant) {
    return <h2>Restaurant not found</h2>;
  }

  return (
    <div>
      <RestaurantInfo restaurant={restaurant} />

      <MenuItems />
    </div>
  );
};
export default ResturantPage;
