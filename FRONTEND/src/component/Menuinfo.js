import { image_URL } from "../utlis/Links";

const MenuInfo = ({ details, propData }) => {
  const name = details?.name || "";
  const imageId = details?.imageId || "";
  const description = details?.description || "";

  const price = details?.price ?? null;
  const rating = details?.rating || "-";
  const ratingCount = details?.ratingCount || "-";

  return (
    <div className="menu-item-card">
      <div>
        <h1>{name}</h1>

        <p>
          Price: {price !== null ? `₹${price}` : "N/A"}
        </p>

        <p>
          ⭐️ {rating} ({ratingCount})
        </p>

        <p>{description}</p>

        <p>{propData}</p>
      </div>

      <div>
        {imageId && (
          <img
            alt={name}
            className="menu-item-img"
            src={image_URL + imageId}
          />
        )}

        <button className="add-btn">ADD</button>
      </div>
    </div>
  );
};

export default MenuInfo;