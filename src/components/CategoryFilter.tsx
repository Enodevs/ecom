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
          key={cat.id}
          role="listitem"
          className={`cat-chip ${active === cat as unknown as string ? 'active' : ''}`}
          onClick={() => onChange(cat as unknown as string)}
        >
          {"" + cat}
        </button>
      ))}
    </div>
  );
}
