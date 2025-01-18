import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../../services/authService";
import { Button } from "..";
import Cookies from "js-cookie";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get("status") === "authenticated";
  const handleClick = async () => {
    try {
      await handleLogout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">PawMatch</h1>
          </div>
          {isAuthenticated && (
            <Button
              onClick={handleClick}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
