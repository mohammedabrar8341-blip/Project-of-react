import RestaurantCard from "./RestaurantCard";
import { restaurantsArr } from "../../utlis/RestaurantArr";
import { Shimmer } from "./Shimmer";
import { Swiggy_URL } from "../../utlis/Links";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UseBodyItems from "../../utlis/UseBodyItems";
import UseOnlineButton from "../../utlis/UseOnlineButton";

function Body() {
  const hotellist = UseBodyItems();
  const isOnline = UseOnlineButton();
  if (!isOnline) {
    return (
      <div className="body">
        <h1 style={{ padding: "10vh 1.5rem", textAlign: "center" }}>
          🔴 You are offline. Please check your internet connection.
        </h1>
      </div>
    );
  }
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
