import Navbar from "./components/Navbar";

import ListingCard from "./components/ListingGrid";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="flex  items-center justify-center mt-2 mb-4">
          <SearchBar />
        </div>
        <ListingCard />
      </div>
    </>
  );
}

export default App;
