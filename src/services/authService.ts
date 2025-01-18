import axios from "axios";
import Cookies from "js-cookie";

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
    Cookies.set("status", "authenticated");
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
    Cookies.remove("status");
  } catch (error) {
    console.log(error);
  }
};
