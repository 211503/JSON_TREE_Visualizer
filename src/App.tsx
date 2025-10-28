import { useState, useEffect } from 'react';
import JsonInput from './components/JsonInput';
import TreeVisualization from './components/TreeVisualization';
import ThemeToggle from './components/ThemeToggle';
import { jsonToTree } from './utils/jsonToTree';
import { TreeNode, TreeEdge } from './types/json';

function App() {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [edges, setEdges] = useState<TreeEdge[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleJsonSubmit = (json: any) => {
    const { nodes: newNodes, edges: newEdges } = jsonToTree(json);
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            JSON Tree Visualizer
          </h1>
          <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <JsonInput onJsonSubmit={handleJsonSubmit} onClear={handleClear} />
          </div>

          <div className="flex flex-col min-h-[600px]">
            <TreeVisualization initialNodes={nodes} initialEdges={edges} />
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Built with React, TypeScript, Tailwind CSS, and React Flow</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
