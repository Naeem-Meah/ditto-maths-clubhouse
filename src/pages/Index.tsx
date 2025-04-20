
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

const Index = () => {
  const navigate = useNavigate();
  
  // This component simply redirects to our HomePage
  return <HomePage />;
};

export default Index;
