import axios from "axios";
import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await verifyUser(user);
    if (response) {
      sessionStorage.setItem("user", response);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
      navigate("/home");
    } else {
      alert("Login Failed.");
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-sm w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email" className="mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            maxLength={40}
            className="mb-4 p-2 border rounded-md"
          />
          <label htmlFor="password" className="mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            minLength={6}
            maxLength={20}
            onChange={handleChange}
            className="mb-6 p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
