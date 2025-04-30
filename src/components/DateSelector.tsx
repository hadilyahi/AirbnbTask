import React, { useState, useRef, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Tab } from "@headlessui/react";
import { addMonths } from "date-fns";

interface DateRangePickerProps {
    range: DateRange | undefined;
    onChange: (range: DateRange | undefined) => void;
  }
  
  const DateRangePicker: React.FC<DateRangePickerProps> = ({ range, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const popupRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
    const formatDate = (date?: Date) =>
      date?.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) ?? "Add dates";
  
    return (
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-12 py-3 rounded-full"
        >
          <div className="text-left">
            <p className="text-sm font-semibold">Check in</p>
            <p className="text-sm text-gray-500">{formatDate(range?.from)}</p>
          </div>
  
          <div className="w-px h-6 bg-gray-300"></div>
  
          <div className="text-left">
            <p className="text-sm font-semibold">Check out</p>
            <p className="text-sm text-gray-500">{formatDate(range?.to)}</p>
          </div>
        </button>
  
        {isOpen && (
          <div
            ref={popupRef}
            className="absolute top-16 z-50 bg-white shadow-xl rounded-2xl p-6 w-[700px]"
          >
            <Tab.Group>
              <Tab.List className="flex justify-center space-x-4 mb-4">
                <Tab
                  className={({ selected }) =>
                    `px-4 py-2 rounded-full text-sm font-medium ${
                      selected
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-800"
                    }`
                  }
                >
                  Dates
                </Tab>
              </Tab.List>
  
              <Tab.Panels>
                <Tab.Panel>
                  <div className="flex gap-8 items-center mb-4">
                    <DayPicker
                      mode="range"
                      numberOfMonths={1}
                      pagedNavigation
                      selected={range}
                      onSelect={onChange}
                      month={currentMonth}
                      onMonthChange={setCurrentMonth}
                      fromDate={new Date()}
                      toDate={new Date(2026, 0, 1)}
                      modifiersClassNames={{
                        selected: "bg-black text-white",
                        today: "text-red-500 font-semibold",
                      }}
                      className="rounded-lg"
                    />
  
                    <DayPicker
                      mode="range"
                      numberOfMonths={1}
                      pagedNavigation={false}
                      selected={range}
                      onSelect={onChange}
                      month={addMonths(currentMonth, 1)}
                      fromDate={new Date()}
                      toDate={new Date(2026, 0, 1)}
                      modifiersClassNames={{
                        selected: "bg-black text-white",
                        today: "text-red-500 font-semibold",
                      }}
                      className="rounded-lg"
                    />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        )}
      </div>
    );
  };
  
  export default DateRangePicker;
  
