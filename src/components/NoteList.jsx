import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import { getActiveNotes, getArchivedNotes } from "../utils/api";
import { useLanguage } from "../contexts/LanguageContext";

const NoteList = ({ archived = false }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { translations } = useLanguage();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = archived
          ? await getArchivedNotes()
          : await getActiveNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [archived]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600 dark:text-gray-300">
          {translations.loading}
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">
          {archived ? translations.noArchivedNotes : translations.noNotes}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-200 hover:shadow-lg"
        >
          <div className="p-6">
            <Link to={`/notes/${note.id}`} className="block">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                {note.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {showFormattedDate(note.createdAt)}
              </p>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                {note.body}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
