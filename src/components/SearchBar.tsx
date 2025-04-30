import React from "react";
import { Search } from "lucide-react"; 
import DateRangePicker from "./DateSelector";
import GuestSelector from "./GuestSelector";
import DestinationSelector from "./DestinationSelector";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 w-full max-w-4xl mx-auto">
      <div className="flex-1 px-4">
        <div className="text-md font-semibold ">Where</div>
        <DestinationSelector/>
      </div>

      <div className="w-px h-8 bg-gray-300 mx-2" />

      <div className="flex-1 px-4">
        <DateRangePicker />
      </div>

     

      <div className="w-px h-8 bg-gray-300 mx-2" />

      <div className="flex-1 px-4">
        <div className="text-md font-semibold ">Who</div>
        <GuestSelector />
      </div>

      <button className="bg-red-500 text-white p-3 rounded-2xl hover:bg-rose-600 ml-2">
        <Search size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
