
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("dittoLearnUser");
    window.location.href = "/";
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-primary font-bold text-2xl">Ditto Learn</div>
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="hidden md:inline-block text-gray-700">
                Hello, {user?.name || "Student"}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
