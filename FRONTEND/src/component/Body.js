import RestaurantCard, { withDiscountLable } from "./RestaurantCard";
import { Shimmer } from "./Shimmer";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import UseBodyItems from "../utlis/UseBodyItems";
import UseOnlineButton from "../utlis/UseOnlineButton";
import HotelListContext from "../utlis/HotelListContext";

function Body() {
  const { hotelList, setHotelList, setAllItems } =
    useContext(HotelListContext);

  const [loadingTimeout, setLoadingTimeout] = useState(false);

  const DiscountResCard = withDiscountLable(RestaurantCard);

  const fetchedRestaurants = UseBodyItems();

  const isOnline = UseOnlineButton();

  useEffect(() => {
    if (fetchedRestaurants?.length) {
      setHotelList(fetchedRestaurants);
      setAllItems(fetchedRestaurants);
      setLoadingTimeout(false);
    }
  }, [fetchedRestaurants, setHotelList, setAllItems]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hotelList?.length) {
        setLoadingTimeout(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [hotelList]);

  if (!isOnline) {
    return (
      <div className="body">
        <h1
          style={{
            padding: "10vh 1.5rem",
            textAlign: "center",
          }}
        >
          🔴 You are offline. Please check your internet connection.
        </h1>
      </div>
    );
  }

  if (!hotelList?.length) {
    if (loadingTimeout) {
      return (
        <div className="body">
          <h1
            style={{
              padding: "10vh 1.5rem",
              textAlign: "center",
            }}
          >
            ⚠️ Unable to load restaurants. Please check your internet
            connection or refresh the page.
          </h1>
        </div>
      );
    }

    return <Shimmer />;
  }

  return (
    <div className="body">
      <div className="res-container">
        {hotelList.map((resobj) => {
          return (
            <Link
              to={`/restaurant/${resobj.id}`}
              key={resobj.id}
            >
              <RestaurantCard resDetail={resobj} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Body;