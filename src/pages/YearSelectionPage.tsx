
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const years = [
  { id: 1, name: "Year 1", age: "Ages 5-6", color: "from-blue-400 to-blue-300" },
  { id: 2, name: "Year 2", age: "Ages 6-7", color: "from-green-400 to-green-300" },
  { id: 3, name: "Year 3", age: "Ages 7-8", color: "from-yellow-400 to-yellow-300" },
  { id: 4, name: "Year 4", age: "Ages 8-9", color: "from-orange-400 to-orange-300" },
  { id: 5, name: "Year 5", age: "Ages 9-10", color: "from-red-400 to-red-300" },
  { id: 6, name: "Year 6", age: "Ages 10-11", color: "from-purple-400 to-purple-300" },
];

const YearSelectionPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleYearSelect = (yearId: number) => {
    setSelectedYear(yearId);
    // Navigate to topics page for the selected year
    setTimeout(() => {
      navigate(`/topics/${yearId}`);
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Year Group</h1>
      <p className="text-gray-600 text-center mb-12">
        Select your school year to find the right maths topics for you.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {years.map((year) => (
          <Card
            key={year.id}
            className={cn(
              "year-card border-2 overflow-hidden cursor-pointer transition-all hover:shadow-md animate-fade-in",
              selectedYear === year.id ? "border-primary ring-2 ring-primary ring-opacity-50" : "border-gray-200"
            )}
            onClick={() => handleYearSelect(year.id)}
          >
            <div className={cn("w-full h-24 flex items-center justify-center bg-gradient-to-r", year.color)}>
              <span className="text-4xl font-bold text-white">{year.id}</span>
            </div>
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">{year.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{year.age}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YearSelectionPage;
