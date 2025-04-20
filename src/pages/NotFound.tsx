
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-semibold mb-4">Oops! Page not found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto px-8">
              Go to Homepage
            </Button>
          </Link>
          <div className="text-sm text-gray-500 pt-4">
            Need help? <a href="#" className="text-primary hover:underline">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
