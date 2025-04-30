interface CounterProps {
    label: string;
    description?: React.ReactNode;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
  }
  
  export const Counter: React.FC<CounterProps> = ({
    label,
    description,
    value,
    onIncrement,
    onDecrement,
  }) => {
    return (
      <div className="flex items-center justify-between py-3">
        <div>
          <p className="text-sm font-medium">{label}</p>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onDecrement}
            className="w-8 h-8 rounded-full border text-xl flex items-center justify-center disabled:opacity-30"
            disabled={value <= 0}
          >
            -
          </button>
          <span className="w-6 text-center">{value}</span>
          <button
            onClick={onIncrement}
            className="w-8 h-8 rounded-full border text-xl flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
    );
  };
  
  export default Counter;