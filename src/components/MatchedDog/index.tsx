import React from "react";
import { FaTimes, FaHeart } from "react-icons/fa";
import { Modal, Button } from "..";
import { Dog } from "../../utils/types";

interface MatchedDogProps {
  dog?: Dog;
  isOpen: boolean;
  onClose: () => void;
}

const MatchedDog: React.FC<MatchedDogProps> = ({ dog, isOpen, onClose }) => {
  if (!dog) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-2xl p-8 max-w-xl w-full mx-4 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <FaHeart className="text-red-500 text-4xl animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            You've Found Your Perfect Match!
          </h2>
          <p className="text-gray-600">Meet your new best friend, {dog.name}</p>
        </div>

        <div className="flex justify-center aspect-w-16 aspect-h-9">
          <img
            src={dog.img}
            alt={dog.name}
            className="w-1/2 object-cover"
          />
        </div>
        <div className="text-center p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{dog.name}</h2>
          <div className="flex flex-col items-center space-y-2 text-gray-600">
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
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={onClose}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Searching
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MatchedDog;
