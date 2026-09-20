import { image_URL } from "../utlis/Links";

const RestaurantCard = ({ resDetail }) => {
  const {
    resName,
    cuisine,
    avgRating,
    delieveryTime,
    costForTwo,
    imgId,
    location,
  } = resDetail;

  const imageUrl = imgId?.startsWith("http")
    ? imgId
    : image_URL + imgId;

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img
          className="res-logo"
          alt={resName || "restaurant"}
          src={imageUrl}
        />
      </div>

      <div className="res-card-content">
        <h4 className="res-title">{resName}</h4>

        <p className="cus-nam">
          {Array.isArray(cuisine) ? cuisine.join(", ") : "Various cuisines"}
        </p>

        <div className="res-info">
          <span>💰 {costForTwo || "Cost info"}</span>
          <span>📍 {location || "Location"}</span>
        </div>
      </div>

      <h3 className="res-title">{resName}</h3>

      <h4>{Array.isArray(cuisine) ? cuisine.join(", ") : cuisine}</h4>

      <h4>⭐️ {avgRating} Stars</h4>

      <h4>
        📍 {delieveryTime} mins | {costForTwo}
      </h4>

      <h4>{location}</h4>
    </div>
  );
};

export const withDiscountLable = (RestaurantCard) => {
  function newComponent({ resDetail }) {
    return (
      <div>
        <RestaurantCard resDetail={resDetail} />
      </div>
    );
  }

  return newComponent;
};

export default RestaurantCard;
