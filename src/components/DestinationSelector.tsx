import React, { useState, useRef, useEffect } from "react";

const DESTINATIONS = [
  "Dubai, UAE", "Paris, France", "New York, USA", "Tokyo, Japan", "Barcelona, Spain",
  "Bali, Indonesia", "Aspen, USA", "Alps, Switzerland", "Tuscany, Italy", "Ireland",
  "Berlin, Germany", "Toronto, Canada", "Amsterdam, Netherlands", "Copenhagen, Denmark",
  "Oslo, Norway", "Helsinki, Finland", "Seoul, South Korea", "Kyoto, Japan",
  "Zurich, Switzerland", "Wales, UK", "Sydney, Australia", "San Diego, USA",
  "Lisbon, Portugal", "Cape Town, South Africa", "Bangkok, Thailand",
  "Madrid, Spain", "Napa Valley, USA", "Iceland", "Chicago, USA", "Manchester, UK",
];

const DestinationSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const filtered = DESTINATIONS.filter(dest =>
    dest.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popupRef}>
    
      <div className="flex items-center justify-between  rounded-full px-4 py-3 w-full cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex flex-col">
          
          <div className={`text-sm ${selectedDestination ? "text-gray-800" : "text-gray-500"}`}>
            {selectedDestination || "Search destinations"}
          </div>
        </div>

        {/* Clear button */}
        {selectedDestination && (
          <button
            className="ml-2 text-sm text-gray-400 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation(); // يمنع فتح النافذة عند الضغط
              setSelectedDestination(null);
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-[360px] bg-white shadow-2xl rounded-3xl p-6 max-h-[400px] overflow-y-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destinations"
            className="w-full px-4 py-2 mb-4 border rounded-full text-sm"
          />

          <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggested destinations</h3>
          <ul className="space-y-2">
            {filtered.map((dest, idx) => (
              <li
                key={idx}
                className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                onClick={() => {
                  setSelectedDestination(dest);
                  setSearch("");
                  setIsOpen(false);
                }}
              >
                {dest}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DestinationSelector;
