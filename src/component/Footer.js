import UseContext from "../../utlis/UseContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const data = useContext(UseContext);
  return (
    <>
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">© 2024 {data.name}</div>
          <p className="footer-brand-text">
            Explore the app with quick links below.
          </p>
        </div>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div className="footer-social">
          <a href="#!" className="footer-social-icon" aria-label="Facebook">
            f
          </a>
          <a href="#!" className="footer-social-icon" aria-label="Instagram">
            i
          </a>
          <a href="#!" className="footer-social-icon" aria-label="Pinterest">
            p
          </a>
          <a href="#!" className="footer-social-icon" aria-label="Twitter">
            t
          </a>
        </div>
      </div>
      <div className="footer">
        <h4>© 2024 {data.name}. All rights reserved.</h4>
      </div>
    </>
  );
};

export default Footer;
