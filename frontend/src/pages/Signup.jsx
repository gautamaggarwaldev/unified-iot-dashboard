import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", {
        email,
        password
      });

      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          Create Account
        </h2>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
