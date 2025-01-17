import axios from "axios";

const base_url = import.meta.env.VITE_API_BASE_URL;

export const handleLogin = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}) => {
  try {
    await axios.post(
      `${base_url}/auth/login`,
      { name, email },
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async () => {
  try {
    await axios.post(
      `${base_url}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
