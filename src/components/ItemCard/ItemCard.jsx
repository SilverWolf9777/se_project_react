import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

const likeIcon = "/❤.svg";
const likedIcon = "/❤State=Liked.svg";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    currentUser &&
    item.likes?.some((id) => id.toString() === currentUser._id.toString());

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (!currentUser || !onCardLike) return;
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <p className="card__name ui-text-2-Bold">{item.name}</p>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      {currentUser && (
        <button
          type="button"
          className="card__like-button"
          onClick={handleLike}
        >
          <img
            src={isLiked ? likedIcon : likeIcon}
            alt={isLiked ? "Liked" : "Like"}
            className="card__like-icon"
          />
        </button>
      )}
    </li>
  );
}
export default ItemCard;
