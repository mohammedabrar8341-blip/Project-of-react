import { image_URL } from "../../utlis/Links";

const MenuInfo = ({ details ,propData}) => {
  const name = details?.name || "";
  const imageId = details?.imageId;
  const description = details?.description || "";
  const ratings = details?.ratings;
  const priceVal =
    details?.price ?? details?.finalPrice ?? details?.defaultPrice;
  const displayPrice = priceVal ? priceVal / 100 : null;

  return (
    <div className="menu-item-card">
      <div>
        <h1>{name}</h1>
        <p>Price: {displayPrice !== null ? displayPrice : "N/A"}</p>
        <p>
          ⭐️ {ratings?.aggregatedRating?.rating ?? "-"} (
          {ratings?.aggregatedRating?.ratingCount ?? "-"})
        </p>
        <p>{description}</p>
        <p>{propData}</p>
      </div>

      <div>
        <img
          alt={name}
          className="menu-item-img"
          src={image_URL + (imageId || "")}
        />

        <button className="add-btn">ADD</button>
      </div>
    </div>
  );
};

export default MenuInfo;
