import React from "react";
import Header from "./src/component/Head";
import Img from "./src/component/Img";
import RestaurantCard from "./src/component/RestaurantCard";
import Footer from "./src/component/Footer";
import Body from "./src/component/Body";
import { Outlet } from "react-router";
import UseContext from "./utlis/UseContext";
import { useState, useEffect } from "react";
import HotelListContext from "./utlis/HotelListContext";

const App = () => {
  const [username, setUsername] = useState();
  const [email, setemail] = useState();

  const [allitems,setAllItems]=useState(null);// master copy
  const [hotellist,setHotellist]=useState(null);// UI copy
  //authentication
  useEffect(() => {
    const randomTrue = Math.random() < 0.3;
    if (!randomTrue) {
      setUsername("guest");
      setemail("guestemail.com");
      return;
    }
    //data from backend if authentication call sucess
    const loggedInuser = {
      name: "M. Abrar",
      email: "mohammedabrar@gmail.com",
    };
    setUsername(loggedInuser.name);
    setemail(loggedInuser.email);
  }, []);
  return (
    <div>
      <UseContext.Provider value={{ name: username, email: email }}>
       <HotelListContext.Provider value={{ hotelList: hotellist, setHotelList: setHotellist, setAllItems, allItems: allitems }}>
         <Header />
        {/* <Img /> */}
        <Outlet />
        {/* <Body /> */}
        <Footer />
       </HotelListContext.Provider>
      </UseContext.Provider>
    </div>
  );
};
export default App;
