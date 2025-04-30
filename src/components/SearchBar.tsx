import React, { useState } from "react";
import { Search } from "lucide-react"; 
import DateRangePicker from "./DateSelector";
import GuestSelector from "./GuestSelector";
import DestinationSelector from "./DestinationSelector";
import { DateRange } from "react-day-picker";

const SearchBar: React.FC<{
  onSearch: (filters: {
    destination: string | null;
    dateRange: DateRange | undefined;
    guests: {
      adults: number;
      children: number;
      infants: number;
      pets: number;
    };
  }) => void;
}> = ({ onSearch }) => {
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [destination, setDestination] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearchClick = () => {
    onSearch({ destination, dateRange, guests });
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-4xl mx-auto">
   
      <div className="flex-1 px-4">
        <div className="text-md font-semibold">Where</div>
        <DestinationSelector selectedDestination={destination} onChange={setDestination} />
      </div>

      <div className="w-px h-8 bg-gray-300 mx-2" />

   
      <div className="flex-1 px-4">
        <DateRangePicker range={dateRange} onChange={setDateRange} />
      </div>

      <div className="w-px h-8 bg-gray-300 mx-2" />

    
      <div className="flex-1 px-4">
        <div className="text-md font-semibold">Who</div>
        <GuestSelector {...guests} onChange={setGuests} />
      </div>

    
      <button
        onClick={handleSearchClick}
        className="bg-red-500 text-white p-3 rounded-2xl hover:bg-rose-600 ml-2"
      >
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
