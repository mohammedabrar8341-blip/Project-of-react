import { image_URL } from "../utlis/Links";

const RestaurantInfo = ({ restaurant }) => {
  const {
    resName = "Restaurant",
    avgRating,
    costForTwo,
    cuisine,
    location,
    delieveryTime,
    imgId,
  } = restaurant;

  return (
    <div className="restaurant-info">
      <div className="menu-info-div">
        <h1>{resName}</h1>
      </div>

      <div className="res-menu-img">
        <img
          className="menu-info-img"
          src={imgId ? image_URL + imgId : undefined}
          alt={resName}
        />
      </div>

      <div className="menu-details">
        <div className="rating-row">
          <span className="rating">
            ⭐ {avgRating ?? "Rating unavailable"}
          </span>

          <span className="cost">
            {costForTwo || "Cost unavailable"}
          </span>
        </div>

        <p className="cuisines">
          {Array.isArray(cuisine) && cuisine.length
            ? cuisine.join(", ")
            : "Cuisine unavailable"}
        </p>

        <div className="location">
          <p>
            <strong>Outlet</strong> • {location || "Location unavailable"}
          </p>
        </div>

        <p className="delivery-time">
          🚴 {delieveryTime != null
            ? `${delieveryTime} mins`
            : "Delivery time unavailable"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantInfo;