
import { useState } from "react";
import {
  FaStar,
  FaHome,
  FaCity,
  FaUmbrellaBeach,
  FaMountain,
  FaTree,
  FaBuilding,
  FaUsers,
  FaSnowflake,
  FaBorderStyle,
  FaHouseUser,
  FaWarehouse,
  FaHotel,
  FaSeedling,
  FaLayerGroup,
} from "react-icons/fa";

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All", icon: <FaStar size={20} /> },
    { id: "luxury", label: "Luxury", icon: <FaHome size={20} /> },
    { id: "modern", label: "Modern", icon: <FaCity size={20} /> },
    { id: "beach", label: "Beach", icon: <FaUmbrellaBeach size={20} /> },
    { id: "mountain", label: "Mountain", icon: <FaMountain size={20} /> },
    { id: "countryside", label: "Countryside", icon: <FaTree size={20} /> },
  
    { id: "urban", label: "Urban", icon: <FaBuilding size={20} /> },
    { id: "family", label: "Family", icon: <FaUsers size={20} /> },
    { id: "scandinavian", label: "Scandinavian", icon: <FaSnowflake size={20} /> },
    { id: "minimalist", label: "Minimalist", icon: <FaBorderStyle size={20} /> },
    { id: "cottage", label: "Cottage", icon: <FaHouseUser size={20} /> },
    { id: "suburban", label: "Suburban", icon: <FaWarehouse size={20} /> },
    { id: "villa", label: "Villa", icon: <FaHotel size={20} /> },
    { id: "studio", label: "Studio", icon: <FaLayerGroup size={20} /> },
    { id: "farm", label: "Farm", icon: <FaSeedling size={20} /> },
    { id: "loft", label: "Loft", icon: <FaBuilding size={20} /> },
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="border-b px-4 py-2">
      <div className="flex overflow-x-auto gap-12 scrollbar">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => handleFilterClick(filter.id)}
            className={`flex flex-col items-center justify-center min-w-[64px] py-2 ${
              activeFilter === filter.id ? "text-black border-b-2 border-black" : "text-gray-500"
            }`}
          >
            {filter.icon}
            <span className="text-xs mt-1">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
