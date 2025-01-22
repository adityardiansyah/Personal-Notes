import React, { createContext, useState, useContext, useEffect } from "react";
import en from "../locales/en.json";
import id from "../locales/id.json";
import PropTypes from "prop-types";

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("id");
  const [translations, setTranslations] = useState(id);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
      setTranslations(savedLanguage === "en" ? en : id);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "id" ? "en" : "id";
    setLanguage(newLanguage);
    setTranslations(newLanguage === "en" ? en : id);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
