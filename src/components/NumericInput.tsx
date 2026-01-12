interface NumericInputProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  error?: string;
  min?: number;
  max?: number;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  min,
  max,
  className = "input-group",
  inputClassName = "styled-input",
  labelClassName = "input-label",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      const num = val === "" ? 0 : Number(val);
      if (
        (min === undefined || num >= min) &&
        (max === undefined || num <= max)
      ) {
        onChange(num);
      } else if (val === "") {
        onChange(0);
      }
    }
  };

  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={inputClassName}
        type="text"
        value={value}
        inputMode="decimal"
        onChange={handleChange}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
