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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white rounded-2xl shadow-md px-4 py-4 sm:py-2 w-full max-w-4xl mx-auto gap-4 sm:gap-0">
      
      {/* Destination */}
      <div className="flex-1 sm:px-4">
        <div className="text-md font-semibold">Where</div>
        <DestinationSelector selectedDestination={destination} onChange={setDestination} />
      </div>

      {/* Divider for desktop */}
      <div className="hidden sm:block w-px h-8 bg-gray-300 mx-2" />

      {/* Date Range */}
      <div className="flex-1 sm:px-4">
        <DateRangePicker range={dateRange} onChange={setDateRange} />
      </div>

      {/* Divider for desktop */}
      <div className="hidden sm:block w-px h-8 bg-gray-300 mx-2" />

      {/* Guests */}
      <div className="flex-1 sm:px-4">
        <div className="text-md font-semibold">Who</div>
        <GuestSelector {...guests} onChange={setGuests} />
      </div>

      {/* Search Button */}
      <div className="flex justify-end sm:ml-2">
      <button
  onClick={handleSearchClick}
  className="bg-red-500 text-white p-3 rounded-full hover:bg-rose-600 flex items-center justify-center"
>
  <Search size={20} />
</button>

      </div>
    </div>
  );
};

export default SearchBar;
