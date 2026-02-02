function ItemCard({ item }) {
  return (
    <>
      <li key={item.id} className="card">
        <p className="card__name">{item.name}</p>
        <img className="card__image" src={item.link} alt={item.name} />
      </li>
    </>
  );
}
export default ItemCard;
