// src/pages/Categories.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// ✅ Import images
import FruitsImg from "../assets/img/Fruits/fruits-card.jpeg";
import VegetablesImg from "../assets/img/veg/Veg-Card.jpeg";
import DryFruitsImg from "../assets/img/Dry-fruits/dry mango.jpeg";
import GrainsImg from "../assets/img/Grains/fresh-rice-grains.jpeg";
import FertilizerImg from "../assets/img/Fertilizer/fertilizer-card.jpeg";

// ✅ Category data with descriptions
const categories = [
  {
    id: 1,
    name: "Fruits",
    image: FruitsImg,
    description: "Fresh and juicy seasonal fruits.",
  },
  {
    id: 2,
    name: "Vegetables",
    image: VegetablesImg,
    description: "Organic and farm-fresh vegetables.",
  },
  {
    id: 3,
    name: "Dry Fruits",
    image: DryFruitsImg,
    description: "Nutritious dry fruits to energize your day.",
  },
  {
    id: 4,
    name: "Grains",
    image: GrainsImg,
    description: "Whole grains straight from the farms.",
  },
  {
    id: 5,
    name: "Fertilizer",
    image: FertilizerImg,
    description: "Best quality fertilizers for your crops.",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/shop?category=${name}`);
  };

  return (
    <div className="py-10 px-4 md:px-16 bg-gradient-to-br from-white via-green-50 to-white min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 text-green-800">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden group transform hover:scale-[1.02] hover:duration-300"
            onClick={() => handleClick(cat.name)}
          >
            <div className="h-40 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-green-700 mb-1">{cat.name}</h3>
              <p className="text-gray-600 text-sm">{cat.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;