import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Navigation from "./components/Navigation";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NotFound from "./components/NotFound";
import PropTypes from "prop-types";

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Navigation />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <NoteList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/archived"
                    element={
                      <ProtectedRoute>
                        <NoteList archived />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes/new"
                    element={
                      <ProtectedRoute>
                        <NoteForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/notes/:id"
                    element={
                      <ProtectedRoute>
                        <NoteDetail />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
