import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "username",
        response.data.username
      );

      toast.success("Login Successful");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Login Failed"
      );

    }
  };

  return (
    <div
      className="
        min-h-screen flex justify-center
        items-center bg-gray-100
      "
    >

      <form
        onSubmit={handleLogin}
        className="
          bg-white p-10 rounded-3xl
          shadow-xl w-[400px]
        "
      >

        <h1
          className="
            text-4xl font-bold mb-8
            text-center
          "
        >
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full border p-3 rounded-xl
            "
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full border p-3 rounded-xl
            "
            required
          />

          <button
            className="
              w-full bg-black text-white
              py-3 rounded-xl
              hover:bg-gray-800 transition
            "
          >
            Login
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-blue-600
                font-semibold
                hover:underline
              "
            >
              Sign Up
            </Link>

          </p>

        </div>

      </form>

    </div>
  );
}

export default Login;