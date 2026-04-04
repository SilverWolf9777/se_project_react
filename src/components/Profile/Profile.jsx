import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
export default function Profile({
  handleCardClick,
  onCardLike,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  handleLogout,
}) {
  return (
    <section className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleLogout={handleLogout}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        onCardLike={onCardLike}
        handleAddClick={handleAddClick}
      ></ClothesSection>
    </section>
  );
}
