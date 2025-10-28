import { useState } from 'react';
import { Search, CheckCircle, XCircle } from 'lucide-react';

interface SearchBarProps {
  onSearch: (path: string) => boolean;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<'found' | 'not-found' | null>(null);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setSearchResult(null);
      return;
    }
    const found = onSearch(searchValue);
    setSearchResult(found ? 'found' : 'not-found');
    setTimeout(() => setSearchResult(null), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., $.user.address.city or items[0].name"
          className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Search
      </button>
      {searchResult && (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          searchResult === 'found'
            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
        }`}>
          {searchResult === 'found' ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Match found</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5" />
              <span className="font-medium">No match found</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
