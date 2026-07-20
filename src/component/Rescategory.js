import MenuInfo from "./Menuinfo";
import { useState } from "react";
const Rescategory = ({ categoryInfo }) => {
  const { title, itemCards } = categoryInfo;
  console.log(itemCards);

  const [isOpen, setIsOpen] = useState(false);

  function toggleBody() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="category-accordian">
      <div className="category-header" onClick={toggleBody}>
        <span>
          {title} ({itemCards.length})
        </span>
        <span>⬇️</span>
      </div>

      {isOpen ? (
        <div className="category-body">
          {itemCards.map((singleMenu) => {
            return (
              <MenuItem
                details={singleMenu.card.info}
                key={singleMenu.card.info.id}
              />
            );
            {
              console.log(details);
            }
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Rescategory;
