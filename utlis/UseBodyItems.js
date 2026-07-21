import { useState,useEffect } from "react";
import { Swiggy_URL } from "./Links";
const UseBodyItems=()=>{
      const [hotellist, setHotellist] = useState([]);
    
      useEffect(() => {
        getData();
      }, []);
      const getData = async () => {
        const response = await fetch(Swiggy_URL);
        const data = await response.json();
        
        setHotellist(
          data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants,
        );
        
      };
      return hotellist
}
export default UseBodyItems