import UseContext from "../../utlis/UseContext";
import { useContext } from "react";
const Footer = () => {
  const data = useContext(UseContext);
  return (
    <div
      className="footer"
      style={{
        fontSize: "2rem",
        color: "white",
      }}
    >
      {/* <h4>© 2024 Mohd abrar. All rights reserved.</h4> */}
      <h4>© 2024 {data.name}. All rights reserved.</h4>
    </div>
  );
};

export default Footer;
