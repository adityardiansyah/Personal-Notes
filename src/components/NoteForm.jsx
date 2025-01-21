import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { addNote } from "../utils/api";
import { useLanguage } from "../contexts/LanguageContext";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { translations } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setLoading(true);
    try {
      await addNote({ title, body });
      navigate("/");
    } catch (error) {
      console.error("Failed to add note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          {translations.addNewNote}
        </h2>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {translations.title}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:opacity-50 transition-colors duration-200"
            placeholder={translations.enterTitle}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {translations.content}
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={loading}
            rows="6"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-800 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     disabled:opacity-50 transition-colors duration-200 resize-none"
            placeholder={translations.enterContent}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md
                   disabled:opacity-50 transition-colors duration-200"
        >
          {loading ? translations.loading : translations.addNote}
        </button>
      </form>
    </div>
  );
};

NoteForm.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default NoteForm;
