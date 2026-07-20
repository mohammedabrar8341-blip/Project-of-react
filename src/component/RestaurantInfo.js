import { image_URL } from "../../utlis/Links";
// import RestaurantMenuRec from "./Resmenurec";
const RestaurantInfo = ({ menu }) => {
  // console.log(menu?.data?.cards[2]?.card?.card?.info);
  const {
    name,
    avgRatingString,
    totalRatingsString,
    cuisines,
    locality,
    areaName,
    costForTwoMessage,
    sla,
    deliveryTime,
    city,
    cloudinaryImageId,
  } = menu.data.cards[2].card.card.info;
  return (
    <div className="restaurant-info">
      <div className="menu-info-div">
        <h1>{name}</h1>
      </div>

      <div className="res-menu-img">
        <img
          className="menu-info-img"
          src={image_URL + cloudinaryImageId}
          alt={name}
        />
      </div>

      <div className="menu-details">
        <div className="rating-row">
          <span className="rating">
            ⭐ {avgRatingString} ({totalRatingsString})
          </span>
          <span className="cost">{costForTwoMessage}</span>
        </div>

        <p className="cuisines">{cuisines?.join(", ")}</p>

        <div className="location">
          <p>
            <strong>Outlet</strong> • {locality}
          </p>
          <p>
            {areaName}, {city}
          </p>
        </div>

        <p className="delivery-time">🚴 {sla?.deliveryTime} mins</p>
        {/* <RestaurantMenuRec /> */}
      </div>
    </div>
  );
};

export default RestaurantInfo;
