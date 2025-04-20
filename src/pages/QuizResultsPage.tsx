
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface QuizResults {
  score: number;
  totalQuestions: number;
  yearId: string;
  topicId: string;
}

const getPerformanceMessage = (percentage: number): string => {
  if (percentage >= 90) return "Outstanding! You're a maths superstar! 🌟";
  if (percentage >= 80) return "Excellent work! You're really good at this! 🎉";
  if (percentage >= 70) return "Great job! You've got solid skills! 👍";
  if (percentage >= 60) return "Good effort! Keep practicing! 😊";
  if (percentage >= 50) return "Nice try! A bit more practice will help! 📚";
  return "Keep going! Practice makes perfect! 💪";
};

const QuizResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state) {
      setResults(location.state as QuizResults);
    } else {
      // If someone navigates directly to results page without taking a quiz
      navigate("/years");
    }
    setLoading(false);
  }, [location.state, navigate]);

  if (loading || !results) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-2xl font-semibold mb-4">Loading results...</div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { score, totalQuestions, yearId, topicId } = results;
  const percentage = Math.round((score / totalQuestions) * 100);
  const performanceMessage = getPerformanceMessage(percentage);

  return (
    <div className="max-w-3xl mx-auto py-12">
      <Card className="p-8 text-center border-2 shadow-sm animate-scale-in">
        <h1 className="text-3xl font-bold mb-6">Quiz Results</h1>
        
        <div className="mb-10">
          <div className="relative w-48 h-48 mx-auto mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-primary stroke-current"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  strokeDasharray={`${percentage * 2.51} 251.2`}
                  strokeDashoffset="0"
                  transform="rotate(-90 50 50)"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div>
                  <div className="text-4xl font-bold">{percentage}%</div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-xl mb-2">
            You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{totalQuestions}</span>
          </div>
          
          <div className="text-lg text-gray-700">{performanceMessage}</div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(`/quiz/${yearId}/${topicId}`)}
            size="lg"
            className="w-full md:w-auto px-8"
          >
            Try Again
          </Button>
          
          <Button 
            onClick={() => navigate(`/topics/${yearId}`)}
            size="lg"
            className="w-full md:w-auto px-8"
          >
            Try Another Topic
          </Button>
          
          <Link to="/years">
            <Button 
              variant="secondary"
              size="lg"
              className="w-full md:w-auto px-8"
            >
              Change Year
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default QuizResultsPage;
