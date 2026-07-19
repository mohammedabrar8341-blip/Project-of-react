import { Link } from "react-router-dom";
import { LOGO_URL } from "../../utlis/Links";

function Header() {
  return (
    <nav className="navbar">
      
      <Link to="/"> <div className="logo-img">
       <img
          src={"https://ik.imagekit.io/1wuzjgiiiy/OIP.jpg"}
          alt="logo-main"
        />
      </div></Link>
      <div className="search-bar">
        <input placeholder="Search for resturant" />
      </div>
      <div className="list">
        <ul>
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
        </ul>
      </div>
    </nav>
  );
}
export default Header;
