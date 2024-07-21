import { createUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
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
    const response = await createUser(user);
    if (response) {
      navigate("/home");
    }
    if (response.status !== 200) {
      alert("User account could not be created.");
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Create User</h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name" className="mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            maxLength={20}
            onChange={handleChange}
            className="mb-4 p-2 border rounded-md"
          />
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
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
