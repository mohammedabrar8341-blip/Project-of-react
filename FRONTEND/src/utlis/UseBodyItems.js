import { useState, useEffect } from "react";

const UseBodyItems = () => {
  const [hotelList, setHotelList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/restaurants"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setHotelList(data);
      } catch (err) {
        console.log("Failed to fetch restaurants:", err);
        setHotelList([]);
      }
    };

    getData();
  }, []);

  return hotelList;
};

export default UseBodyItems;