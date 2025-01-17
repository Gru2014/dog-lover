import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Input } from "..";

interface BreedsProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
}

const Breeds: React.FC<BreedsProps> = ({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBreeds = breeds.filter((breed) =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
      <label className="block text-xl font-bold text-gray-900 mb-4">
        Breed Selection
      </label>
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-300 pointer-events-none">
          <FaSearch />
        </div>
        <Input
          type="text"
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search breeds..."
          className="pl-10"
        />
      </div>
      <div className="relative">
        <select
          multiple
          value={selectedBreeds}
          onChange={(e) =>
            setSelectedBreeds(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="block w-full h-72 px-4 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        >
          {filteredBreeds.map((breed) => (
            <option
              key={breed}
              value={breed}
              className="py-2 px-4 hover:bg-blue-50 cursor-pointer"
            >
              {breed}
            </option>
          ))}
        </select>
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Hold Ctrl (Windows) or Command (Mac) to select multiple breeds
      </p>
    </div>
  );
};

export default Breeds;
