"use client";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  debounceMs?: number;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "بحث...",
  debounceMs = 400,
}: Props) {
  const [internal, setInternal] = useState(value);

  useEffect(() => setInternal(value), [value]);

  // debounce
  useEffect(() => {
    const id = setTimeout(() => {
      if (internal !== value) onChange(internal);
    }, debounceMs);
    return () => clearTimeout(id);
  }, [internal, debounceMs, onChange, value]);

  return (
    <div className="bg-gray-100 border border-gray-200 rounded-2xl p-2 w-full sm:w-1/4 flex items-center gap-1 justify-between">
      <CiSearch className="text-2xl" />
      <input
        value={internal}
        onChange={(e) => setInternal(e.target.value)}
        placeholder={placeholder}
        className="h-6 w-full px-3 focus:outline-0"
      />
    </div>
  );
}
