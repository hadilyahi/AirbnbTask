import Counter from "./Counter";
import { useEffect, useRef, useState } from "react";

interface GuestSelectorProps {
    adults: number;
    children: number;
    infants: number;
    pets: number;
    onChange: (guests: {
      adults: number;
      children: number;
      infants: number;
      pets: number;
    }) => void;
  }
  
  const GuestSelector: React.FC<GuestSelectorProps> = ({
    adults,
    children,
    infants,
    pets,
    onChange,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
  
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
  
    const handleUpdate = (type: string, value: number) => {
      onChange({
        adults: type === "adults" ? value : adults,
        children: type === "children" ? value : children,
        infants: type === "infants" ? value : infants,
        pets: type === "pets" ? value : pets,
      });
    };
  
    const totalGuests = adults + children + infants + pets;
  
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 rounded-full text-left w-full"
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
              onIncrement={() => handleUpdate("adults", adults + 1)}
              onDecrement={() => handleUpdate("adults", Math.max(0, adults - 1))}
            />
            <Counter
              label="Children"
              description="Ages 2 – 12"
              value={children}
              onIncrement={() => handleUpdate("children", children + 1)}
              onDecrement={() => handleUpdate("children", Math.max(0, children - 1))}
            />
            <div className="border-t my-3" />
            <Counter
              label="Infants"
              description="Under 2"
              value={infants}
              onIncrement={() => handleUpdate("infants", infants + 1)}
              onDecrement={() => handleUpdate("infants", Math.max(0, infants - 1))}
            />
            <Counter
              label="Pets"
              description={
                <a href="#" className="underline text-sm">
                  Bringing a service animal?
                </a>
              }
              value={pets}
              onIncrement={() => handleUpdate("pets", pets + 1)}
              onDecrement={() => handleUpdate("pets", Math.max(0, pets - 1))}
            />
          </div>
        )}
      </div>
    );
  };
  
  export default GuestSelector;
  