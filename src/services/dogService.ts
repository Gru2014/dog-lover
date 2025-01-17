import axios from "axios";

const base_url = import.meta.env.VITE_API_BASE_URL;

export const handleFetchBreeds = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(`${base_url}/dogs/breeds`, {
    withCredentials: true,
  });
  return response.data;
};

export const handleFetchDogs = async ({
  selectedBreeds,
  sortOrder,
  page,
}: {
  selectedBreeds: string[];
  sortOrder: string;
  page: number;
}) => {
  const response = await axios.get(`${base_url}/dogs/search`, {
    params: {
      breeds: selectedBreeds,
      sort: `breed:${sortOrder}`,
      size: 10,
      from: page * 10,
    },
    withCredentials: true,
  });
  return response;
};

export const handleDogDetails = async (resultId: string) => {
  const response = await axios.post(`${base_url}/dogs`, resultId, {
    withCredentials: true,
  });
  return response;
};

export const handleDogMatch = async (favorites: string[]) => {
  const response = await axios.post<{ match: string }>(
    `${base_url}/dogs/match`,
    favorites,
    { withCredentials: true }
  );

  return response.data.match;
};
