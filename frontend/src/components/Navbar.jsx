import { Link, useLocation, useNavigate } from "react-router-dom";
import { pageData } from "./pageData";
import { TbLogout } from "react-icons/tb";
import { BsFillPersonFill } from "react-icons/bs";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  function handleLogOut() {
    sessionStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="w-screen flex flex-col md:flex-row py-2 px-4 md:px-10 justify-between items-center">
      <div className="flex justify-between items-center w-full md:w-auto">
        <Link to="/home" className="text-2xl font-semibold">
          Medium
        </Link>
        <button
          className="md:hidden text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center mt-2 md:mt-0">
        {pageData.map((page, index) => (
          <Link
            key={index}
            to={page.path}
            className={`px-3 py-2 hover:font-semibold ${
              currentPath === page.path
                ? "text-blue-600 font-semibold"
                : "text-gray-700"
            }`}
          >
            {page.name}
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link
          to="/profile"
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 px-5 py-2 text-semibold text-white rounded-full"
        >
          <p>Profile</p>
          <BsFillPersonFill />
        </Link>
        <Link
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 px-5 py-2 text-semibold text-white rounded-full"
          onClick={handleLogOut}
        >
          <p>Log Out</p>
          <TbLogout />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
