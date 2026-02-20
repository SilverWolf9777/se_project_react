import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
export default function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
}) {
  return (
    <section className="profile">
      <SideBar></SideBar>
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      ></ClothesSection>
    </section>
  );
}
