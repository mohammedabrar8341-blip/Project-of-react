import  RestaurantCard,{ withDiscountLable } from "./RestaurantCard";
import { Shimmer } from "./Shimmer";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UseBodyItems from "../../utlis/UseBodyItems";
import UseOnlineButton from "../../utlis/UseOnlineButton";
import HotelListContext from "../../utlis/HotelListContext";
import { withDiscountLable } from "./RestaurantCard";
function Body() {
  const { hotelList, setHotelList, setAllItems } = useContext(HotelListContext);
  const DiscountResCard = withDiscountLable(RestaurantCard);
  const fetchedRestaurants = UseBodyItems();
  const isOnline = UseOnlineButton();

  useEffect(() => {
    if (fetchedRestaurants?.length) {
      setHotelList(fetchedRestaurants);
      setAllItems(fetchedRestaurants);
    }
  }, [fetchedRestaurants, setHotelList, setAllItems]);

  if (!isOnline) {
    return (
      <div className="body">
        <h1 style={{ padding: "10vh 1.5rem", textAlign: "center" }}>
          🔴 You are offline. Please check your internet connection.
        </h1>
      </div>
    );
  }
  if (!hotelList?.length) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      {/* <Shimmer /> */}
      <div className="res-container">
        {/* <button onClick={getData}>Get data</button>{" "} */}
        {/* {restaurantsArr.map((resObj) => {
             return <RestaurantCard resDetail={resObj} key={resObj.id} />; })} */}
        {hotelList?.map((resobj) => {
          return (
            <Link to={`/restaurant/${resobj.info.id}`} key={resobj.info.id}>
              {resobj?.info?.aggregatedDiscountInfoV3 ? (
                <DiscountResCard resDetail={resobj.info} />
              ) : (
                <RestaurantCard resDetail={resobj?.info} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Body;
