
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import HomePage from "./pages/HomePage";
import YearSelectionPage from "./pages/YearSelectionPage";
import TopicSelectionPage from "./pages/TopicSelectionPage";
import QuizPage from "./pages/QuizPage";
import QuizResultsPage from "./pages/QuizResultsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import AuthLayout from "./components/AuthLayout";
import RequireAuth from "./components/RequireAuth";

const queryClient = new QueryClient();

// Create an authentication context
export const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: { name: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
}>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  // Check for saved login state on app startup
  useEffect(() => {
    const savedUser = localStorage.getItem("dittoLearnUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* HomePage: require login */}
                <Route
                  index
                  element={
                    <RequireAuth>
                      <HomePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="years"
                  element={
                    <RequireAuth>
                      <YearSelectionPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="topics/:yearId"
                  element={
                    <RequireAuth>
                      <TopicSelectionPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="quiz/:yearId/:topicId"
                  element={
                    <RequireAuth>
                      <QuizPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="results"
                  element={
                    <RequireAuth>
                      <QuizResultsPage />
                    </RequireAuth>
                  }
                />
              </Route>
              {/* Auth pages don't require login */}
              <Route path="/" element={<AuthLayout />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
