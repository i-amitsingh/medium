import CreateUser from "../components/CreateUser";
import Login from "../components/Login";
import { useState } from "react";

function Landing() {
  const [view, setView] = useState(false);
  return (
    <div>
      {!view ? (
        <div className="h-screen bg-gray-100 flex flex-col justify-center items-center gap-5 w-auto">
          <Login />
          <button
            className=" bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 px-4"
            onClick={() => setView(!view)}
          >
            Create New Account
          </button>
        </div>
      ) : (
        <div className="h-screen bg-gray-100 flex flex-col justify-center items-center gap-5 w-auto">
          <CreateUser />
          <button
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 px-4"
            onClick={() => setView(!view)}
          >
            Login Existing Account
          </button>
        </div>
      )}
    </div>
  );
}

export default Landing;
