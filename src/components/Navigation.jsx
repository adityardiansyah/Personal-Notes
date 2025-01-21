import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { Sun, Moon } from "lucide-react";

const Navigation = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, translations } = useLanguage();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            {translations.appName}
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {translations.home}
                </Link>
                <Link
                  to="/archived"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {translations.archived}
                </Link>
                <Link
                  to="/notes/new"
                  className=" text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {translations.newNote}
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600 dark:text-gray-300">
                  Hi, {user ? user.name : "Guest"}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                >
                  {translations.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {translations.login}
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {translations.register}
                </Link>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {language === "id" ? "🇺🇸 EN" : "🇮🇩 ID"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
