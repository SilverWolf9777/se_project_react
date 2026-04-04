import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
export default function ClothesSection({
  handleCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(item => item.owner === currentUser?._id);
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your Items</p>
        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__add-item-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
