import { useState, useRef } from "react";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
};

export default function Input({ value, onChange, label }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value !== "");

  const labelClasses = `absolute text-gray-400 top-[16px] left-4 transition-all ${isFocused || value ? "text-sm transform -translate-y-3" : "text-base"}`;

  return (
    <div
      className={`relative ${isFocused ? "h-[62px]" : "h-[58px] "} rounded-2xl bg-[#EBEBEB] px-4 flex items-center`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        className="w-full text-gray-400 border-none outline-none  bg-transparent"
      />
      <label
        htmlFor="input"
        className={labelClasses}
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </label>
    </div>
  );
}
