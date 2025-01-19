import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";
import PropTypes from "prop-types";

const NoteList = ({ notes }) => {
  if (notes.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Tidak ada catatan</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {notes.map((note) => (
        <div
          key={note.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              <Link
                to={`/notes/${note.id}`}
                className="text-blue-600 hover:underline"
              >
                {note.title}
              </Link>
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {showFormattedDate(note.createdAt)}
            </p>
            <p className="text-gray-700">{note.body.substring(0, 100)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
};

export default NoteList;
