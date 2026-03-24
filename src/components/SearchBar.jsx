const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="input"
    />
  );
};

export default SearchBar;