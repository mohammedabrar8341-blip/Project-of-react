import MenuInfo from "./Menuinfo";
import { useContext } from "react";
import CartContext from "../utlis/CartContext";

const Rescategory = ({ categoryInfo ,order,setIndex,propData}) => {
  const title = categoryInfo?.title || "";
  const itemCards = categoryInfo?.itemCards || [];
  const { addItem } = useContext(CartContext);

  // const [isOpen, setIsOpen] = useState(false);
let isOpen=order
  function toggleBody() {
    // setIsOpen(!isOpen);
    setIndex()
  }

  function addCategoryItems(event) {
    event.stopPropagation();
    itemCards.forEach((singleMenu) => {
      const details = singleMenu?.card?.info;
      if (details) {
        addItem(details);
      }
    });
  }

  return (
    <div className="category-accordian">
      <div className="category-header" onClick={toggleBody}>
        <span>
          {title} ({itemCards.length})
        </span>
        <div className="category-actions">
          <button
            className="category-add-btn"
            type="button"
            onClick={addCategoryItems}
          >
            ADD ALL
          </button>
          <span className={isOpen ? "arrow open" : "arrow"}>▼</span>
        </div>
      </div>

      {isOpen ? (
        <div className="category-body">
          {itemCards.map((singleMenu, idx) => {
            const details = singleMenu?.card?.info || {};
            return <MenuInfo
            propData={propData}
            details={details} key={details.id || idx} />;
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Rescategory;
