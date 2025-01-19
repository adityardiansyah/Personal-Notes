import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import NoteForm from "./components/NoteForm";
import SearchBar from "./components/SearchBar";
import NotFound from "./components/NotFound";
import { getAllNotes } from "./utils/local-data";

const App = () => {
  const [notes, setNotes] = useState(getAllNotes());
  const [searchKeyword, setSearchKeyword] = useState("");

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: `notes-${+new Date()}`,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              Notes App
            </Link>
            <div className="space-x-4">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <Link to="/archived" className="hover:underline">
                Archived
              </Link>
              <Link
                to="/notes/new"
                className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100"
              >
                New Note
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto mt-8 px-4">
          <SearchBar keyword={searchKeyword} setKeyword={setSearchKeyword} />
          <Routes>
            <Route
              path="/"
              element={
                <NoteList
                  notes={filteredNotes.filter((note) => !note.archived)}
                />
              }
            />
            <Route
              path="/archived"
              element={
                <NoteList
                  notes={filteredNotes.filter((note) => note.archived)}
                />
              }
            />
            <Route path="/notes/new" element={<NoteForm addNote={addNote} />} />
            <Route
              path="/notes/:id"
              element={
                <NoteDetail
                  notes={notes}
                  deleteNote={deleteNote}
                  toggleArchive={toggleArchive}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
