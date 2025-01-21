import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
import { useLanguage } from "../contexts/LanguageContext";

const NoteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { translations } = useLanguage();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNote(id);
        setNote(data);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm(translations.deleteConfirmation)) {
      try {
        await deleteNote(id);
        navigate("/");
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
  };

  const handleToggleArchive = async () => {
    try {
      const { data } = await (note.archived
        ? unarchiveNote(id)
        : archiveNote(id));
      setNote(data);
    } catch (error) {
      console.error("Failed to toggle archive status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-600 dark:text-gray-300">
          {translations.loading}
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">
          {translations.noteNotFound}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {note.title}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {showFormattedDate(note.createdAt)}
        </p>

        <div className="prose dark:prose-invert mb-8">
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
            {note.body}
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
          >
            {translations.delete}
          </button>

          <button
            onClick={handleToggleArchive}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors duration-200"
          >
            {note.archived ? translations.unarchive : translations.archive}
          </button>
        </div>
      </div>
    </div>
  );
};

NoteDetail.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default NoteDetail;
