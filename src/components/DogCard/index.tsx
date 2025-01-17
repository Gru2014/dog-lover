import React from "react";
import { Dog } from "../../utils/types";
import { Button } from "..";

interface DogCardProps {
  dog: Dog;
  toggleFavorite: (dogId: string) => void;
  favorites: string[];
}

const DogCard: React.FC<DogCardProps> = ({
  dog,
  toggleFavorite,
  favorites,
}) => {
  return (
    <div key={dog.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={dog.img}
          alt={dog.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{dog.name}</h2>
        <div className="space-y-2 text-gray-600">
          <p className="flex items-center">
            <span className="font-medium mr-2">Age:</span> {dog.age} years
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Breed:</span> {dog.breed}
          </p>
          <p className="flex items-center">
            <span className="font-medium mr-2">Location:</span> {dog.zip_code}
          </p>
        </div>

        <Button
          onClick={() => toggleFavorite(dog.id)}
          className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            favorites.includes(dog.id)
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
          }`}
        >
          {favorites.includes(dog.id) ? "♥ Favorited" : "♡ Add to Favorites"}
        </Button>
      </div>
    </div>
  );
};

export default DogCard;
