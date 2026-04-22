import { CATEGORIES } from '../data/products';

interface CategoryFilterProps {
  active: string;
  onChange: (c: string) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="category-filter" role="list" aria-label="Categories">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          role="listitem"
          className={`cat-chip ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
