import { Link } from "react-router-dom";
import { LOGO_URL } from "../../utlis/Links";
import { useState, useEffect, useContext } from "react";
import UseContext from "../../utlis/UseContext";

import UseOnlineButton from "../../utlis/UseOnlineButton";

function Header() {
  const data = useContext(UseContext);
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
        <input placeholder="Search for resturant" />
      </div>
      <div className="list">
        <ul>
          {isOnline ? (
            <li> 🟢 Online </li>
          ) : (
            <li className="red"> 🛑 Offline </li>
          )}
          <li>
            <Link to={"/grocery "}>Grocery</Link>
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
