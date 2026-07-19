import RestaurantCard from "./RestaurantCard";
import { restaurantsArr } from "../../utlis/RestaurantArr";
import { Shimmer } from "./Shimmer";
import { Swiggy_URL } from "../../utlis/Links";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Body() {
  const [hotellist, setHotellist] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await fetch(Swiggy_URL);
    const data = await response.json();
    // console.log(data)
    // console.log(
    //   data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants,
    // );
    // const details =
    //   data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants;
    setHotellist(
      data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants,
    );
    // console.log(
    //   data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants,
    // );

    // console.log("hotel", hotellist);
  };
  if (!hotellist.length) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      {/* <Shimmer /> */}
      <div className="res-container">
        {/* <button onClick={getData}>Get data</button>{" "} */}
        {/* {restaurantsArr.map((resObj) => {
             return <RestaurantCard resDetail={resObj} key={resObj.id} />; })} */}
        {hotellist?.map((resobj) => {
          return (
            <Link to={`/restaurant/${resobj.info.id}`} key={resobj.info.id}>
              <RestaurantCard resDetail={resobj?.info} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Body;
