import React, { useEffect, useState } from "react";
import { FaLeaf, FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";

const initialTips = [
  {
    id: 1,
    title: "Check for Fruit Freshness",
    content: "Fresh fruits are firm, vibrant in color, and free from spots or mold.",
    icon: <FaLeaf />,
  },
  {
    id: 2,
    title: "Choosing the Right Fertilizer",
    content: "Use NPK-balanced fertilizers and prefer organic compost for long-term yield.",
    icon: <FaLeaf />,
  },
  {
    id: 3,
    title: "Water Early in the Morning",
    content: "Watering before 10 a.m. reduces evaporation and improves absorption.",
    icon: <FaLeaf />,
  },
  {
    id: 4,
    title: "Rotate Crops",
    content: "Crop rotation helps maintain soil fertility and reduces pest cycles.",
    icon: <FaLeaf />,
  },
  {
    id: 5,
    title: "Use Mulch",
    content: "Mulching retains soil moisture, suppresses weeds, and keeps roots cool.",
    icon: <FaLeaf />,
  },
  {
    id: 6,
    title: "Regular Soil Testing",
    content: "Test soil every 1-2 years to understand nutrient needs and pH level.",
    icon: <FaLeaf />,
  },
  {
    id: 7,
    title: "Proper Plant Spacing",
    content: "Adequate spacing ensures proper airflow, growth, and disease prevention.",
    icon: <FaLeaf />,
  },
  {
    id: 8,
    title: "Natural Pest Control",
    content: "Use neem oil or introduce ladybugs to control pests without chemicals.",
    icon: <FaLeaf />,
  },
  {
    id: 9,
    title: "Harvest at Right Time",
    content: "Timely harvesting ensures best taste and nutritional value.",
    icon: <FaLeaf />,
  },
  {
    id: 10,
    title: "Compost Kitchen Waste",
    content: "Turn organic kitchen waste into nutrient-rich compost for your farm.",
    icon: <FaLeaf />,
  },
];

const Tips = () => {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteTips")) || [];
    setFavorites(stored);
  }, []);

  const toggleFavorite = (id) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((fav) => fav !== id);
    } else {
      updatedFavorites.push(id);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteTips", JSON.stringify(updatedFavorites));
  };

  const filteredTips = initialTips.filter((tip) =>
    tip.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">🌱 Agriculture Tips</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-2 mb-6 max-w-md mx-auto bg-gray-100 px-4 py-2 rounded-full">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search tips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none py-1"
        />
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-xl shadow-md p-4 transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="text-green-600 text-2xl">{tip.icon}</div>
                <button onClick={() => toggleFavorite(tip.id)}>
                  {favorites.includes(tip.id) ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-400 text-xl hover:text-red-400" />
                  )}
                </button>
              </div>
              <h3 className="text-xl font-semibold mt-3">{tip.title}</h3>
              <p className="text-gray-600 mt-1">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTips.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No tips match your search.</p>
      )}
    </div>
  );
};

export default Tips;