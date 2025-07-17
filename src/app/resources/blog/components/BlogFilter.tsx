import { CATEGORIES } from '../data/posts';
import { BlogFilterState } from '../types/blog';

interface BlogFilterProps {
  filter: BlogFilterState;
  onFilterChange: (filter: Partial<BlogFilterState>) => void;
}

export function BlogFilter({ filter, onFilterChange }: BlogFilterProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search articles..."
          className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fcba28] text-white placeholder-gray-400 backdrop-blur-lg"
          value={filter.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange({ category })}
            className={`relative overflow-hidden group p-4 rounded-lg border transition-all ${
              filter.category === category
                ? 'border-[#fcba28] bg-[#fcba28]/10'
                : 'border-white/10 bg-white/5 hover:border-white/20'
            }`}
          >
            {/* Background effects */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Content */}
            <div className="relative">
              <h3 className="font-medium text-white mb-1">{category}</h3>
              <p className="text-sm text-gray-400">
                {category === 'All'
                  ? 'Browse all articles'
                  : `Browse ${category.toLowerCase()} articles`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
