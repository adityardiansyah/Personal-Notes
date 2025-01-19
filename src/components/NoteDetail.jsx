import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";

const NoteDetail = ({ notes, deleteNote, toggleArchive }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return (
      <p className="text-center text-gray-500 mt-8">Catatan tidak ditemukan</p>
    );
  }

  const handleDelete = () => {
    deleteNote(note.id);
    navigate("/");
  };

  const handleToggleArchive = () => {
    toggleArchive(note.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {showFormattedDate(note.createdAt)}
      </p>
      <p className="text-gray-700 mb-6">{note.body}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Hapus
        </button>
        <button
          onClick={handleToggleArchive}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          {note.archived ? "Batal Arsip" : "Arsipkan"}
        </button>
      </div>
    </div>
  );
};

NoteDetail.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteNote: PropTypes.func.isRequired,
  toggleArchive: PropTypes.func.isRequired,
};

export default NoteDetail;
