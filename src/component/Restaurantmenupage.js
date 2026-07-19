import { useEffect, useState } from "react";
import { Menu_URL } from "../../utlis/Links";
import { useParams } from "react-router-dom";
import { Shimmer } from "./Shimmer";
import RestaurantInfo from "./RestaurantInfo";

const ResturantPage = () => {
  const { resId } = useParams();

  const [menu, setMenu] = useState(null);

  useEffect(() => {
    getDataRes();
  }, []);

  const getDataRes = async () => {
    const response = await fetch(Menu_URL + resId);
    const data = await response.json();

    // console.log(Menu_URL + resId);

    setMenu(data);

    // console.log(menu.data.cards[2]);
    // console.log(menu.data.cards[2].card);
    // console.log(menu.data.cards[2].card.card);
    // console.log(menu.data.cards[2].card.card.info);
  };
  if (menu == null) {
    return <Shimmer />;
  }

  return (
    <div>
      <RestaurantInfo menu={menu} />
      {/* <h1>{name}</h1>
      <p>{cuisines}</p> */}
    </div>
  );
};
export default ResturantPage;
