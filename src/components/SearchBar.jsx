import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

const SearchBar = ({ keyword, setKeyword }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    setSearchParams(newKeyword ? { keyword: newKeyword } : {});
  };

  useEffect(() => {
    const keywordFromUrl = searchParams.get("keyword") || "";
    setKeyword(keywordFromUrl);
  }, []);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Cari catatan..."
        value={keyword}
        onChange={handleSearch}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string,
  setKeyword: PropTypes.func,
};

export default SearchBar;
