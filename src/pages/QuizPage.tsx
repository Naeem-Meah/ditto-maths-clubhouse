
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Dummy quiz content - In a real app, this would be fetched from a backend
const generateDummyQuiz = (yearId: string, topicId: string): QuizQuestion[] => {
  // This is a simplified version - in a real app, questions would be fetched from a backend
  const questions: QuizQuestion[] = [];
  
  for (let i = 1; i <= 10; i++) {
    let question = "";
    let options: string[] = [];
    let correctAnswer = "";
    
    if (topicId === "addition") {
      const num1 = Math.floor(Math.random() * (yearId === "1" ? 10 : 20)) + 1;
      const num2 = Math.floor(Math.random() * (yearId === "1" ? 10 : 20)) + 1;
      question = `What is ${num1} + ${num2}?`;
      correctAnswer = (num1 + num2).toString();
      
      options = [
        correctAnswer,
        (num1 + num2 + 1).toString(),
        (num1 + num2 - 1).toString(),
        (num1 + num2 + 2).toString(),
      ];
    } else if (topicId === "subtraction") {
      let num1 = Math.floor(Math.random() * (yearId === "1" ? 15 : 30)) + 5;
      let num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
      question = `What is ${num1} - ${num2}?`;
      correctAnswer = (num1 - num2).toString();
      
      options = [
        correctAnswer,
        (num1 - num2 + 1).toString(),
        (num1 - num2 - 1).toString(),
        (num1 - num2 + 2).toString(),
      ];
    } else if (topicId === "multiplication") {
      const multiplier = parseInt(yearId) <= 2 ? 10 : 12;
      const num1 = Math.floor(Math.random() * multiplier) + 1;
      const num2 = Math.floor(Math.random() * multiplier) + 1;
      question = `What is ${num1} × ${num2}?`;
      correctAnswer = (num1 * num2).toString();
      
      options = [
        correctAnswer,
        (num1 * num2 + 1).toString(),
        (num1 * num2 - 1).toString(),
        (num1 * (num2 + 1)).toString(),
      ];
    } else if (topicId === "division") {
      const num2 = Math.floor(Math.random() * 10) + 1;
      const num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      question = `What is ${num1} ÷ ${num2}?`;
      correctAnswer = (num1 / num2).toString();
      
      options = [
        correctAnswer,
        (num1 / num2 + 1).toString(),
        (num1 / num2 - 1).toString(),
        ((num1 + num2) / num2).toString(),
      ];
    } else {
      // Default questions for any other topic
      question = `Question ${i} for Year ${yearId}, Topic ${topicId}`;
      correctAnswer = `Answer ${i}`;
      options = [`Answer ${i}`, `Option B`, `Option C`, `Option D`];
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    questions.push({
      id: i,
      question,
      options,
      correctAnswer,
    });
  }
  
  return questions;
};

const QuizPage = () => {
  const { yearId, topicId } = useParams<{ yearId: string; topicId: string }>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (yearId && topicId) {
      // In a real app, we would fetch questions from an API
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const dummyQuestions = generateDummyQuiz(yearId, topicId);
        setQuestions(dummyQuestions);
        setLoading(false);
      }, 1000);
    }
  }, [yearId, topicId]);

  const handleOptionSelect = (option: string) => {
    if (!isAnswerChecked) {
      setSelectedOption(option);
    }
  };

  const checkAnswer = () => {
    if (!selectedOption) {
      toast.error("Please select an answer");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setIsCorrect(isAnswerCorrect);
    setIsAnswerChecked(true);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
      toast.success("Correct! Well done!");
    } else {
      toast.error(`Oops! The correct answer is ${currentQuestion.correctAnswer}`);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Quiz completed, navigate to results page
      navigate("/results", {
        state: {
          score,
          totalQuestions: questions.length,
          yearId,
          topicId
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="text-2xl font-semibold mb-4">Loading Quiz...</div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">Score: {score}/{currentQuestionIndex}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-8 text-center">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "quiz-option",
                selectedOption === option && "selected",
                isAnswerChecked && selectedOption === option && isCorrect && "correct",
                isAnswerChecked && selectedOption === option && !isCorrect && "incorrect",
                isAnswerChecked && option === currentQuestion.correctAnswer && "correct"
              )}
              onClick={() => handleOptionSelect(option)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="text-lg">{option}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          {!isAnswerChecked ? (
            <Button 
              onClick={checkAnswer} 
              disabled={!selectedOption}
              size="lg"
              className="px-8"
            >
              Check Answer
            </Button>
          ) : (
            <Button 
              onClick={nextQuestion} 
              size="lg"
              className="px-8"
            >
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default QuizPage;
