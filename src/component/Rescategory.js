import MenuInfo from "./Menuinfo";
import { useState } from "react";

const Rescategory = ({ categoryInfo ,order,setIndex}) => {
  const title = categoryInfo?.title || "";
  const itemCards = categoryInfo?.itemCards || [];

  // const [isOpen, setIsOpen] = useState(false);
let isOpen=order
  function toggleBody() {
    // setIsOpen(!isOpen);
    setIndex()
  }

  return (
    <div className="category-accordian">
      <div className="category-header" onClick={toggleBody}>
        <span>
          {title} ({itemCards.length})
        </span>
      <span className={isOpen ? "arrow open" : "arrow"}>▼</span>
      </div>

      {isOpen ? (
        <div className="category-body">
          {itemCards.map((singleMenu, idx) => {
            const details = singleMenu?.card?.info || {};
            return <MenuInfo details={details} key={details.id || idx} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Rescategory;
