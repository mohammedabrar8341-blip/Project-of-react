import RestaurantCard from "./RestaurantCard";
import { restaurantsArr } from "../../utlis/RestaurantArr";
import { Shimmer } from "./Shimmer";
import { Swiggy_URL } from "../../utlis/Links";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseBodyItems from "../../utlis/UseBodyItems";

function Body() {
  const hotellist=UseBodyItems()
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
