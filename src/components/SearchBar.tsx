interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-bar">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        placeholder="Search for products, brands and more…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search items"
      />
      <button className="search-btn" aria-label="Submit search">Search</button>
    </div>
  );
}
