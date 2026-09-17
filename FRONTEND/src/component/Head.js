import { Link } from "react-router-dom";
import { LOGO_URL } from "../utlis/Links";
import { useState, useEffect, useContext } from "react";
import UseContext from "../utlis/UseContext";
import HotelListContext from "../utlis/HotelListContext";

import UseOnlineButton from "../utlis/UseOnlineButton";

function Header() {
  const data = useContext(UseContext);

  const { hotelList, setHotelList, allItems } = useContext(HotelListContext);
  const [filterToggle, setFilterToggle] = useState(false);
  function setFilter() {
    console.log("button clicked");
    // setHotelList(null)
    if (!filterToggle) {
      const filteredArray = hotelList.filter((restaurant) => {
        if (restaurant.info.avgRating > 4.3) {
          return true;
        } else {
          return false;
        }
      });

      setHotelList(filteredArray);
      setFilterToggle(!filterToggle);
    } else {
      setHotelList(allItems);
      setFilterToggle(!filterToggle);
    }
  }

  const isOnline = UseOnlineButton();
  return (
    <nav className="navbar">
      <Link to="/">
        {" "}
        <div className="logo-img">
          <img
            src={"https://ik.imagekit.io/1wuzjgiiiy/OIP.jpg"}
            alt="logo-main"
          />
        </div>
      </Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for resturant"
          onKeyDown={(e) => {
            // console.log(e.target.value);
            const filteredList = allItems.filter((restaurant) => {
              if (
                restaurant.info.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase()) == true
              ) {
                return true;
              } else {
                return false;
              }
            });
            setHotelList(filteredList);
          }}
        />
      </div>
      <div className="list">
        <ul>
          <li>
            <button className="filter-btn " onClick={setFilter}>
              {filterToggle
                ? "Show All Restaurants"
                : "Filter Top Rated Restaurants"}
            </button>
          </li>
          {isOnline ? (
            <li> 🟢 Online </li>
          ) : (
            <li className="red"> 🛑 Offline </li>
          )}
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>{data.name}</li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
