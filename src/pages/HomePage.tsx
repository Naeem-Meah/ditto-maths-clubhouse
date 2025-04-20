
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "../App";

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <div className="flex flex-col gap-12 py-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Making maths <span className="text-primary">fun</span> for every primary school child
          </h1>
          <p className="text-lg text-gray-600">
            Ditto Learn helps children ages 5-11 master mathematics through engaging, 
            interactive quizzes tailored to the UK curriculum.
          </p>
          <div className="flex flex-wrap gap-4">
            {isLoggedIn ? (
              <Link to="/years">
                <Button size="lg" className="text-lg px-8 py-6">
                  Start Learning
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="text-lg px-8 py-6">
                    Sign Up Free
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                    Log In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md h-72 rounded-2xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
              <div className="text-6xl animate-bounce-light">🧮</div>
            </div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent rounded-full translate-x-[-50%] translate-y-[50%]"></div>
            <div className="absolute top-0 right-0 w-16 h-16 bg-secondary rounded-full translate-x-[30%] translate-y-[-30%]"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Parents & Children Love Ditto Learn</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-4 text-2xl">
              📚
            </div>
            <h3 className="text-xl font-semibold mb-2">Curriculum Aligned</h3>
            <p className="text-gray-600">
              All content is carefully mapped to the UK primary mathematics curriculum.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4 text-2xl">
              🎮
            </div>
            <h3 className="text-xl font-semibold mb-2">Fun & Engaging</h3>
            <p className="text-gray-600">
              Interactive quizzes make learning enjoyable and keep children motivated.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4 text-2xl">
              📈
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor improvement over time and identify areas that need more practice.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center my-8">
        <h2 className="text-3xl font-bold mb-4">Ready to make maths fun?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of UK primary school children who are building confidence and skills with Ditto Learn.
        </p>
        {isLoggedIn ? (
          <Link to="/years">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Learning Now
            </Button>
          </Link>
        ) : (
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-6">
              Create Free Account
            </Button>
          </Link>
        )}
      </section>
    </div>
  );
};

export default HomePage;
