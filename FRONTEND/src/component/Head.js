import { Link } from "react-router-dom";
import { LOGO_URL } from "../utlis/Links";
import { useState, useEffect, useContext } from "react";
import UseContext from "../utlis/UseContext";
import HotelListContext from "../utlis/HotelListContext";
import CartContext from "../utlis/CartContext";

import UseOnlineButton from "../utlis/UseOnlineButton";

function Header() {
  const data = useContext(UseContext);
  const { totalItems } = useContext(CartContext);

  const { hotelList, setHotelList, allItems } = useContext(HotelListContext);
  const [filterToggle, setFilterToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const restaurants = Array.isArray(allItems) ? allItems : [];

  function getSearchText(restaurant) {
    const cuisines = Array.isArray(restaurant.cuisine)
      ? restaurant.cuisine.join(" ")
      : restaurant.cuisine || "";

    return [restaurant.resName, cuisines, restaurant.location]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function filterRestaurants(query, topRated) {
    const normalizedQuery = query.trim().toLowerCase();

    const filteredArray = restaurants.filter((restaurant) => {
      const matchesSearch = !normalizedQuery ||
        getSearchText(restaurant).includes(normalizedQuery);
      const matchesRating = !topRated || Number(restaurant.avgRating) >= 4.3;

      return matchesSearch && matchesRating;
    });

    setHotelList(filteredArray);
  }

  function handleSearch(event) {
    const nextQuery = event.target.value;
    setSearchQuery(nextQuery);
    setShowSuggestions(nextQuery.trim().length > 0);
    filterRestaurants(nextQuery, filterToggle);
  }

  function selectSuggestion(restaurantName) {
    setSearchQuery(restaurantName);
    setShowSuggestions(false);
    filterRestaurants(restaurantName, filterToggle);
  }

  function setFilter() {
    const nextFilterState = !filterToggle;
    setFilterToggle(nextFilterState);
    filterRestaurants(searchQuery, nextFilterState);
  }

  const suggestions = restaurants
    .filter((restaurant) =>
      getSearchText(restaurant).includes(searchQuery.trim().toLowerCase())
    )
    .slice(0, 6);

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
          value={searchQuery}
          placeholder="Search restaurants or cuisines"
          onChange={handleSearch}
          onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
        />
        {showSuggestions && searchQuery.trim() && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((restaurant) => (
              <button
                type="button"
                className="search-suggestion"
                key={restaurant.id}
                onMouseDown={() => selectSuggestion(restaurant.resName)}
              >
                <span className="suggestion-icon">⌕</span>
                <span>
                  <strong>{restaurant.resName}</strong>
                  <small>
                    {Array.isArray(restaurant.cuisine)
                      ? restaurant.cuisine.slice(0, 3).join(", ")
                      : "Restaurant"}
                  </small>
                </span>
              </button>
            ))}
          </div>
        )}
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
            <Link to="/cart">Cart ({totalItems})</Link>
          </li>
          <li>{data.name}</li>
        </ul>
      </div>
    </nav>
  );
}
export default Header;
