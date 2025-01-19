import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Halaman Tidak Ditemukan
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Maaf, halaman yang Anda cari tidak ada.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
