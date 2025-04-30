import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ListingGrid from "./components/ListingGrid";
import { DateRange } from "react-day-picker";

function App() {
  const [filters, setFilters] = useState<{
    destination: string | null;
    dateRange: DateRange | undefined;
    guests: {
      adults: number;
      children: number;
      infants: number;
      pets: number;
    };
  }>({
    destination: null,
    dateRange: undefined,
    guests: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    },
  });

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-2 mb-4">
        <SearchBar onSearch={(newFilters) => setFilters(newFilters)} />
      </div>
      <ListingGrid filters={filters} />
    </>
  );
}

export default App;
