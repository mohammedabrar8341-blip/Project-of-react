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
        <h2 className="res-title">{resName}</h2>

        <p className="cus-nam">
          {Array.isArray(cuisine) ? cuisine.join(", ") : "Various cuisines"}
        </p>

        <div className="res-info">
          <span>⭐ {avgRating || "New"}</span>
          <span>• {delieveryTime || "--"} mins</span>
        </div>

        <div className="res-card-footer">
          <span>{costForTwo || "Cost info"}</span>
          <span>{location || "Location"}</span>
        </div>
      </div>
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
