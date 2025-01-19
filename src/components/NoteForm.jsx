import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      addNote({ title, body, archived: false });
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">Tambah Catatan Baru</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Judul
        </label>
        <input
          type="text"
          id="title"
          placeholder="Judul catatan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
          Isi Catatan
        </label>
        <textarea
          id="body"
          placeholder="Isi catatan"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Tambah Catatan
      </button>
    </form>
  );
};

NoteForm.propTypes = {
  note: PropTypes.object,
  addNote: PropTypes.func.isRequired,
};

export default NoteForm;
