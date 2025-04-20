
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Plus, Minus, Divide, Multiply } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  color: string;
}

// Define topic data for each year
const topicsByYear: Record<string, Topic[]> = {
  "1": [
    { 
      id: "counting", 
      name: "Counting", 
      icon: <Plus />, 
      description: "Learn to count up to 100", 
      color: "bg-blue-100 text-blue-700" 
    },
    { 
      id: "addition", 
      name: "Addition", 
      icon: <Plus />, 
      description: "Adding numbers up to 20", 
      color: "bg-green-100 text-green-700" 
    },
    { 
      id: "subtraction", 
      name: "Subtraction", 
      icon: <Minus />, 
      description: "Subtracting numbers within 20", 
      color: "bg-red-100 text-red-700" 
    },
  ],
  "2": [
    { 
      id: "addition", 
      name: "Addition", 
      icon: <Plus />, 
      description: "Adding numbers up to 100", 
      color: "bg-green-100 text-green-700" 
    },
    { 
      id: "subtraction", 
      name: "Subtraction", 
      icon: <Minus />, 
      description: "Subtracting numbers up to 100", 
      color: "bg-red-100 text-red-700" 
    },
    { 
      id: "multiplication", 
      name: "Multiplication", 
      icon: <Multiply />, 
      description: "2, 5 and 10 times tables", 
      color: "bg-purple-100 text-purple-700" 
    },
  ],
  "3": [
    { 
      id: "addition", 
      name: "Addition", 
      icon: <Plus />, 
      description: "Adding numbers up to 1000", 
      color: "bg-green-100 text-green-700" 
    },
    { 
      id: "subtraction", 
      name: "Subtraction", 
      icon: <Minus />, 
      description: "Subtracting numbers up to 1000", 
      color: "bg-red-100 text-red-700" 
    },
    { 
      id: "multiplication", 
      name: "Multiplication", 
      icon: <Multiply />, 
      description: "3, 4 and 8 times tables", 
      color: "bg-purple-100 text-purple-700" 
    },
    { 
      id: "division", 
      name: "Division", 
      icon: <Divide />, 
      description: "Dividing by 3, 4 and 8", 
      color: "bg-orange-100 text-orange-700" 
    },
  ],
  "4": [
    { 
      id: "addition", 
      name: "Addition", 
      icon: <Plus />, 
      description: "Adding numbers up to 10,000", 
      color: "bg-green-100 text-green-700" 
    },
    { 
      id: "subtraction", 
      name: "Subtraction", 
      icon: <Minus />, 
      description: "Subtracting numbers up to 10,000", 
      color: "bg-red-100 text-red-700" 
    },
    { 
      id: "multiplication", 
      name: "Multiplication", 
      icon: <Multiply />, 
      description: "All times tables up to 12", 
      color: "bg-purple-100 text-purple-700" 
    },
    { 
      id: "division", 
      name: "Division", 
      icon: <Divide />, 
      description: "Dividing with remainders", 
      color: "bg-orange-100 text-orange-700" 
    },
  ],
  "5": [
    { 
      id: "addition", 
      name: "Addition", 
      icon: <Plus />, 
      description: "Adding numbers with multiple digits", 
      color: "bg-green-100 text-green-700" 
    },
    { 
      id: "subtraction", 
      name: "Subtraction", 
      icon: <Minus />, 
      description: "Subtracting numbers with multiple digits", 
      color: "bg-red-100 text-red-700" 
    },
    { 
      id: "multiplication", 
      name: "Multiplication", 
      icon: <Multiply />, 
      description: "Multiplying numbers up to 4 digits", 
      color: "bg-purple-100 text-purple-700" 
    },
    { 
      id: "division", 
      name: "Division", 
      icon: <Divide />, 
      description: "Dividing numbers up to 4 digits", 
      color: "bg-orange-100 text-orange-700" 
    },
  ],
  "6": [
    { 
      id: "addition", 
      name: "Addition", 
      icon: <Plus />, 
      description: "Advanced addition problems", 
      color: "bg-green-100 text-green-700" 
    },
    { 
      id: "subtraction", 
      name: "Subtraction", 
      icon: <Minus />, 
      description: "Advanced subtraction problems", 
      color: "bg-red-100 text-red-700" 
    },
    { 
      id: "multiplication", 
      name: "Multiplication", 
      icon: <Multiply />, 
      description: "Multi-step multiplication problems", 
      color: "bg-purple-100 text-purple-700" 
    },
    { 
      id: "division", 
      name: "Division", 
      icon: <Divide />, 
      description: "Long division and decimal division", 
      color: "bg-orange-100 text-orange-700" 
    },
  ]
};

const TopicSelectionPage = () => {
  const { yearId } = useParams<{ yearId: string }>();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (yearId && topicsByYear[yearId]) {
      setTopics(topicsByYear[yearId]);
    }
  }, [yearId]);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    // Navigate to quiz page for the selected year and topic
    setTimeout(() => {
      navigate(`/quiz/${yearId}/${topicId}`);
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Year {yearId} Topics
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Select a topic to practice your maths skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            className={cn(
              "topic-card border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md animate-fade-in",
              selectedTopic === topic.id ? "border-primary ring-2 ring-primary ring-opacity-50" : "border-gray-200"
            )}
            onClick={() => handleTopicSelect(topic.id)}
          >
            <div className="p-6 flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", topic.color)}>
                {topic.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{topic.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{topic.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicSelectionPage;
