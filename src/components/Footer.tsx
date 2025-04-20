
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="max-w-xs">
            <Link to="/" className="inline-block mb-4">
              <div className="text-primary font-bold text-xl">Ditto Learn</div>
            </Link>
            <p className="text-gray-600 text-sm">
              Making mathematics fun and engaging for primary school children across the UK.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Learning</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/years" className="hover:text-primary transition-colors">Year Groups</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Curriculum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Progress Tracking</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">For Parents</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">For Teachers</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Ditto Learn. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
