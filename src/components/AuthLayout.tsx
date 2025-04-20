
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-accent to-secondary">
      <div className="py-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-primary font-bold text-2xl">Ditto Learn</div>
        </Link>
      </div>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      <div className="text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Ditto Learn. All rights reserved.
      </div>
    </div>
  );
};

export default AuthLayout;
