import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials", err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
          IoT Dashboard Login
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

        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center mt-3 dark:text-gray-300">
          No account?{" "}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
