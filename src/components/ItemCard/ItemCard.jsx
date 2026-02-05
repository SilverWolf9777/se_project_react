import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <>
      <li key={item.id} className="card">
        <p className="card__name ui-text-2-Bold">{item.name}</p>
        <img
          className="card__image"
          src={item.link}
          alt={item.name}
          onClick={() => {
            handleCardClick();
          }}
        />
      </li>
    </>
  );
}
export default ItemCard;
