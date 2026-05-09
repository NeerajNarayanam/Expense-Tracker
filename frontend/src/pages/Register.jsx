import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/register", {
        username,
        email,
        password,
      });

      toast.success(
        "Registered Successfully"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.detail ||
        "Registration Failed"
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
        onSubmit={handleRegister}
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
          Register
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="
              w-full border p-3 rounded-xl
            "
            required
          />

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
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600">

            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-blue-600
                font-semibold
                hover:underline
              "
            >
              Login
            </Link>

          </p>

        </div>

      </form>

    </div>
  );
}

export default Register;