import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styles/HeroSection.css"; // Import CSS

// Import images
import fruitsImg from "../assets/img/Fruits/fruits-card.jpeg";
import vegetablesImg from "../assets/img/veg/Veg-Card.jpeg";
import grainsImg from "../assets/img/Grains/grains-card.jpeg";
import fertilizersImg from "../assets/img/Fertilizer/fertilizer-card.jpeg";
import DryFruitsImg from "../assets/img/Dry-fruits/dry-friuits-card.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    // Pass category exactly as used in your product data
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="hero-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">FormGrove</h1>
          <p className="hero-tagline">Your Trusted Partner in Agriculture Excellence</p>
        </div>
      </div>

      {/* Category Cards (Overlayed) */}
      <div className="category-cards">
        <div className="category-card" onClick={() => handleCardClick("Fruits")}>
          <img src={fruitsImg} alt="Fruits" />
          <p>Fruits</p>
        </div>
        <div className="category-card" onClick={() => handleCardClick("Vegetables")}>
          <img src={vegetablesImg} alt="Vegetables" />
          <p>Vegetables</p>
        </div>
        <div className="category-card" onClick={() => handleCardClick("Grains")}>
          <img src={grainsImg} alt="Grains" />
          <p>Grains</p>
        </div>
        <div className="category-card" onClick={() => handleCardClick("Fertilizer")}>
          <img src={fertilizersImg} alt="Fertilizers" />
          <p>Fertilizer</p>
        </div>
        <div className="category-card" onClick={() => handleCardClick("Dry-Fruits")}>
          <img src={DryFruitsImg} alt="Dry-Fruits" />
          <p>Dry Fruits</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;