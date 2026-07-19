const RestaurantCard = ({ resDetail }) => {
  const {
    resName,
    name,
    cuisines,
    avgRating,
    sla,
    deliveryTime,
    costForTwo,
    imgId,
    cloudinaryImageId,
    areaName,
  } = resDetail;

  return (
    <div className="res-card">
      <div className="res-img-container">
        <img
          className="res-logo"
          alt="res-logo"
          // src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resDetail.imgId}`}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        />
      </div>
      {/* <h3 className="res-title">{resDetail.resName}</h3>
      <h4>{resDetail.cuisine}</h4>
      <h4>⭐️ {resDetail.avgRating} Stars</h4>
      <h4>
        {resDetail.delieveryTime} mins | {resDetail.costForTwo}
      </h4>
    </div> */}
      <div className="res-card-content">
        <h4 className="res-title">{resName || name}</h4>
        {/* <p className="res-subtitle">
          {name !== resName ? name : "Popular restaurant"}
        </p> */}
        <p className="cus-nam">
          {Array.isArray(cuisines)
            ? cuisines.join(", ")
            : cuisine || "Various cuisines"}
        </p>
        <div className="res-meta">
          {/* <span className="time">
            {sla?.deliveryTime ?? delieveryTime} mins
          </span> */}
        </div>
        <div className="res-info">
          <span>💰 {costForTwo ?? "Cost info"}</span>
          <span>📍 {areaName ?? location ?? "Location"}</span>
        </div>
      </div>
      <h3 className="res-title">{resDetail.resName}</h3>
      <h4>{resDetail.cuisine}</h4>
      <h4>⭐️ {resDetail.avgRating} Stars</h4>
      <h4>
        📍{sla?.deliveryTime}mins | {resDetail.costForTwo}
      </h4>
      <h4>{resDetail.areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
