import { image_URL } from "../utlis/Links";
import { useContext } from "react";
import CartContext from "../utlis/CartContext";

const MenuInfo = ({ details, propData }) => {
  const { addItem } = useContext(CartContext);
  const name = details?.name || "";
  const imageId = details?.imageId || "";
  const description = details?.description || "";

  const price = details?.price ?? null;
  const rating = details?.rating || "-";
  const ratingCount = details?.ratingCount || "-";

  return (
    <div className="menu-item-card">
      <div>
        <h3>{name}</h3>

        <p>Price: {price !== null ? `₹${price}` : "N/A"}</p>

        <p>
          ⭐️ {rating} ({ratingCount})
        </p>

        <p>{description}</p>

        <p>{propData}</p>
      </div>

      <div>
        {imageId && (
          <img alt={name} className="menu-item-img" src={image_URL + imageId} />
        )}

        <button className="add-btn" onClick={() => addItem(details)}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default MenuInfo;
