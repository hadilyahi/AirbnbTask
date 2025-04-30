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

interface DestinationSelectorProps {
  selectedDestination: string | null;
  onChange: (destination: string | null) => void;
}

const DestinationSelector: React.FC<DestinationSelectorProps> = ({
  selectedDestination,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const popupRef = useRef<HTMLDivElement>(null);

  const filtered = DESTINATIONS.filter(dest =>
    dest.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (destination: string) => {
    onChange(destination);
    setSearch("");
    setIsOpen(false);
    setRecentSearches(prev => {
      const updated = [destination, ...prev.filter(item => item !== destination)];
      return updated.slice(0, 5);
    });
  };

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
      <div
        className="flex items-center justify-between rounded-full px-4  w-full cursor-pointer "
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col">
          <div className={`text-sm ${selectedDestination ? "text-gray-800" : "text-gray-500"}`}>
            {selectedDestination || "Search destinations"}
          </div>
        </div>

        {selectedDestination && (
          <button
            className="ml-2 text-sm text-gray-400 hover:text-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }}
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
  <div className="absolute z-50 mt-2 w-[600px] bg-white shadow-2xl rounded-3xl p-6 h-[100px]">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search destinations"
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
    />

    {/* ✅ Container that scrolls if content overflows */}
    <div className="overflow-y-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent space-y-6">
      
      {search === "" && recentSearches.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent searches</h3>
          <ul className="space-y-2">
            {recentSearches.map((dest, idx) => (
              <li
                key={`recent-${idx}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
                onClick={() => handleSelect(dest)}
              >
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-lg">🏠</div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{dest}</div>
                  <div className="text-xs text-gray-500">Month in Jun</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggested destinations</h3>
        <ul className="space-y-2">
          {filtered.map((dest, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 cursor-pointer transition"
              onClick={() => handleSelect(dest)}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-lg">✈️</div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{dest}</div>
                <div className="text-xs text-gray-500">Guests also looked here</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  </div>
)}


    </div>
  );
};

export default DestinationSelector;
