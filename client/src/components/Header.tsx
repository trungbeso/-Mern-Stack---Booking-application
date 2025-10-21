import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
  const { isLoggin } = useAppContext();

  return (
    <div className="bg-blue-800 py-6 flex justify-between">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Hotel California</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggin ? (
            <>
              <Link to="/my-bookings">My Bookings</Link>
              <Link to="/my-hotels">My Hotels</Link>
              <button>Sign Out</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex items-center text-white px-3 font-bold hover:bg-gray-100 hover:text-blue-800 rounded-full"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
