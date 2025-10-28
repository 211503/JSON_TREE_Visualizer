import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface JsonInputProps {
  onJsonSubmit: (json: any) => void;
  onClear: () => void;
}

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    }
  },
  "items": [
    {
      "name": "item1",
      "price": 100
    },
    {
      "name": "item2",
      "price": 200
    }
  ],
  "active": true
}`;

export default function JsonInput({ onJsonSubmit, onClear }: JsonInputProps) {
  const [jsonText, setJsonText] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string>('');

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setError('');
      onJsonSubmit(parsed);
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message);
    }
  };

  const handleClear = () => {
    setJsonText('');
    setError('');
    onClear();
  };

  return (
    <div className="w-full max-w-2xl">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Paste or type JSON data
      </label>
      <textarea
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter JSON here..."
      />
      {error && (
        <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}
      <div className="mt-4 flex gap-3">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Generate Tree
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
