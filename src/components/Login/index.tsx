import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "..";
import { handleLogin } from "../../services/authService";

const Login: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "" };

    if (!name) {
      newErrors.name = "Name field is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleClick = async () => {
    if (validateForm()) {
      try {
        await handleLogin({ name, email });
        navigate("/search");
      } catch (error) {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-5xl font-bold mb-4">Login</h1>
        <Input
          value={name}
          type="text"
          onChange={setName}
          error={errors.name}
          placeholder="Enter your name"
        />
        <Input
          value={email}
          type="email"
          onChange={setEmail}
          error={errors.email}
          placeholder="Enter your email"
        />
        <Button
          onClick={handleClick}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
