import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">Fixo</Link>
      </h1>
      <div>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
