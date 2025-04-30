import React, { useState, useRef, useEffect } from "react";
import Counter from "./Counter";

const GuestSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalGuests = adults + children + infants + pets;

  return (
    <div className="relative" ref={ref}>
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4  rounded-full  text-left w-full"
      >
        
        <div className="text-sm text-gray-500">
          {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
        </div>
      </button>

     
      {isOpen && (
        <div className="absolute z-50 mt-2 w-[320px] bg-white shadow-2xl rounded-2xl p-6">
          <Counter
            label="Adults"
            description="Ages 13 or above"
            value={adults}
            onIncrement={() => setAdults(adults + 1)}
            onDecrement={() => setAdults(Math.max(0, adults - 1))}
          />
          <Counter
            label="Children"
            description="Ages 2 – 12"
            value={children}
            onIncrement={() => setChildren(children + 1)}
            onDecrement={() => setChildren(Math.max(0, children - 1))}
          />
          <div className="border-t my-3" />
          <Counter
            label="Infants"
            description="Under 2"
            value={infants}
            onIncrement={() => setInfants(infants + 1)}
            onDecrement={() => setInfants(Math.max(0, infants - 1))}
          />
          <Counter
            label="Pets"
            description={
              <a href="#" className="underline text-sm">
                Bringing a service animal?
              </a>
            }
            value={pets}
            onIncrement={() => setPets(pets + 1)}
            onDecrement={() => setPets(Math.max(0, pets - 1))}
          />
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
