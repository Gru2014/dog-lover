import React, { useState, useEffect } from "react";
import { FaPaw, FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Breeds, Button, DogCard, Loading, MatchedDog, Pagenation } from "..";
import Cookies from "js-cookie";
import { Dog } from "../../utils/types";
import {
  handleDogDetails,
  handleDogMatch,
  handleFetchBreeds,
  handleFetchDogs,
} from "../../services/dogService";

const Search: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(0);
  const [matchedDog, setMatchedDog] = useState<Dog | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get("status")) {
      navigate("/");
    }
    setIsLoading(true);
    const fetchBreeds = async () => {
      try {
        const response = await handleFetchBreeds();
        setBreeds(response);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error)
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchDogs = async () => {
      const response = await handleFetchDogs({
        selectedBreeds,
        sortOrder,
        page,
      });

      setTotalPages(Math.ceil(response.data.total / 10));

      const dogDetails = await handleDogDetails(response.data.resultIds);

      setDogs(dogDetails.data);
      setIsLoading(false);
    };

    fetchDogs();
  }, [selectedBreeds, sortOrder, page]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleMatch = async () => {
    if (favorites.length === 0) {
      toast.error("Please select at least one favorite dog to find a match!", {
        icon: "🐕",
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    const response = await handleDogMatch(favorites);
    const matchedDog = dogs.find((dog) => dog.id === response);
    setMatchedDog(matchedDog);
    setIsModalOpen(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <Loading />}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Professional Pet Matching
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your ideal canine companion through our sophisticated matching
            system
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/3">
              <Breeds
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-end mb-6">
                <Button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <FaSort className="mr-2" />
                  Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dogs.map((dog) => (
                  <DogCard
                    dog={dog}
                    key={dog.id}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Pagenation page={page} totalPages={totalPages} setPage={setPage} />
        <div className="text-center">
          <Button
            onClick={handleMatch}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg shadow-lg text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-105"
          >
            <FaPaw className="mr-3" />
            Find My Perfect Match
          </Button>
        </div>
        <MatchedDog
          dog={matchedDog}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Search;
