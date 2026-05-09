import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import toast from "react-hot-toast";

import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/register",
        {
          username,
          email,
          password,
        }
      );

      toast.success(
        "Registered Successfully"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.detail ||
        "Registration Failed"
      );

    }
  };

  return (
    <div className="
      min-h-screen
      flex
      bg-gradient-to-br
      from-[#0f172a]
      via-[#111827]
      to-[#1e293b]
      overflow-hidden
    ">

      {/* LEFT SIDE */}
      <div className="
        hidden lg:flex
        flex-1 relative
        items-center
        justify-center
        p-16
      ">

        {/* GLOW */}
        <div className="
          absolute w-[500px]
          h-[500px]
          bg-purple-500/20
          blur-[120px]
          rounded-full
        " />

        <div className="
          relative z-10
          max-w-xl
        ">

          <p className="
            uppercase tracking-[0.4rem]
            text-purple-400 font-semibold
          ">
            Future Of Finance
          </p>

          <h1 className="
            text-7xl font-black
            text-white mt-6
            leading-tight
          ">
            Start Your
            Smart Finance
            Journey.
          </h1>

          <p className="
            text-gray-400 text-xl
            mt-8 leading-relaxed
          ">
            Create your account and
            unlock a futuristic
            finance management
            experience.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="
        flex-1 flex
        items-center
        justify-center
        p-8
      ">

        <motion.form
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          onSubmit={handleRegister}
          className="
            w-full max-w-md
            rounded-[2rem]
            p-10
            backdrop-blur-2xl
            border border-white/10
            bg-white/5
            shadow-2xl
          "
        >

          <div className="mb-10">

            <h1 className="
              text-5xl font-black
              text-white
            ">
              Create Account
            </h1>

            <p className="
              text-gray-400 mt-4
              text-lg
            ">
              Join the next generation
              finance platform.
            </p>

          </div>

          {/* USERNAME */}
          <div className="mb-6">

            <label className="
              text-gray-400 text-sm
            ">
              Username
            </label>

            <div className="
              mt-3 flex items-center
              gap-4 px-5 py-4
              rounded-2xl
              bg-white/5
              border border-white/10
            ">

              <FaUser className="
                text-purple-400
              " />

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="
                  bg-transparent
                  outline-none
                  w-full text-white
                "
                required
              />

            </div>

          </div>

          {/* EMAIL */}
          <div className="mb-6">

            <label className="
              text-gray-400 text-sm
            ">
              Email
            </label>

            <div className="
              mt-3 flex items-center
              gap-4 px-5 py-4
              rounded-2xl
              bg-white/5
              border border-white/10
            ">

              <FaEnvelope className="
                text-purple-400
              " />

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="
                  bg-transparent
                  outline-none
                  w-full text-white
                "
                required
              />

            </div>

          </div>

          {/* PASSWORD */}
          <div className="mb-8">

            <label className="
              text-gray-400 text-sm
            ">
              Password
            </label>

            <div className="
              mt-3 flex items-center
              gap-4 px-5 py-4
              rounded-2xl
              bg-white/5
              border border-white/10
            ">

              <FaLock className="
                text-purple-400
              " />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="
                  bg-transparent
                  outline-none
                  w-full text-white
                "
                required
              />

            </div>

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="
              w-full py-4 rounded-2xl
              bg-gradient-to-r
              from-purple-500
              via-pink-500
              to-indigo-600
              text-white font-bold
              text-lg
              shadow-2xl
              flex items-center
              justify-center gap-3
            "
          >

            Create Account

            <FaArrowRight />

          </motion.button>

          {/* LOGIN */}
          <p className="
            text-center text-gray-400
            mt-8
          ">

            Already have an account?{" "}

            <Link
              to="/login"
              className="
                text-purple-400
                font-semibold
                hover:underline
              "
            >
              Login
            </Link>

          </p>

        </motion.form>

      </div>

    </div>
  );
}

export default Register;