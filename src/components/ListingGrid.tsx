
import { useEffect, useState } from "react";
import { listings as mockListings } from "../data/listings";
import { FaRegHeart, FaHeart, FaStar } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import FilterBar from "./FilterBar";

interface Listing {
  id: number;
  title: string;
  location: string;
  images: string[];
  rating: number;
  dates: string;
  price: number;
  isWishlisted: boolean;
  category: string;
}

const ListingCard = ({ listing }: { listing: Listing }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(listing.isWishlisted);
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
  });

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="rounded-lg border shadow hover:shadow-lg transition overflow-hidden">
      <div className="relative">
        <div ref={sliderRef} className="keen-slider h-60">
          {listing.images.map((img: string, index: number) => (
            <div className="keen-slider__slide" key={index}>
              <img src={img} alt={listing.title} className="w-full h-60 object-cover" />
            </div>
          ))}
        </div>

        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 text-white bg-black/40 p-2 rounded-full"
        >
          {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {listing.images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                currentSlide === idx ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-3">
        <div className="flex justify-between text-sm font-semibold">
          <span>{listing.location}</span>
          <span className="flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {listing.rating}
          </span>
        </div>
        <p className="text-sm text-gray-500">{listing.title}</p>
        <p className="text-sm text-gray-400">{listing.dates}</p>
        <p className="font-bold">${listing.price} / night</p>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="rounded-lg border shadow animate-pulse">
    <div className="h-60 bg-gray-200"></div>
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>
  </div>
);

const ListingGrid = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setListings(mockListings);
      setFilteredListings(mockListings);
      setLoading(false);
    }, 1500);
  }, []);

  const handleFilterChange = (filter: string) => {
    if (filter === "all") {
      setFilteredListings(listings);
    } else {
      const filtered = listings.filter((listing) => listing.category === filter);
      setFilteredListings(filtered);
    }
  };

  return (
    <div>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
      </div>
    </div>
  );
};

export default ListingGrid;