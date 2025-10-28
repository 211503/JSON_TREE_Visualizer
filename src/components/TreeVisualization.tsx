import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import SearchBar from './SearchBar';
import { TreeNode, TreeEdge } from '../types/json';
import { searchNodeByPath } from '../utils/jsonToTree';
import { Download, Copy, Check } from 'lucide-react';

interface TreeVisualizationProps {
  initialNodes: TreeNode[];
  initialEdges: TreeEdge[];
}

const nodeTypes = {
  object: CustomNode,
  array: CustomNode,
  primitive: CustomNode,
};

function TreeVisualizationContent({ initialNodes, initialEdges }: TreeVisualizationProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [highlightedNodeId, setHighlightedNodeId] = useState<string | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const { fitView, setCenter, getZoom } = useReactFlow();

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setTimeout(() => fitView({ padding: 0.2 }), 50);
  }, [initialNodes, initialEdges, setNodes, setEdges, fitView]);

  const handleSearch = useCallback(
    (path: string): boolean => {
      const foundNode = searchNodeByPath(initialNodes, path);

      if (foundNode) {
        setHighlightedNodeId(foundNode.id);

        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            data: {
              ...node.data,
              isHighlighted: node.id === foundNode.id,
            },
          }))
        );

        const zoom = getZoom();
        setCenter(foundNode.position.x + 100, foundNode.position.y + 50, {
          zoom,
          duration: 800,
        });

        setTimeout(() => {
          setHighlightedNodeId(null);
          setNodes((nds) =>
            nds.map((node) => ({
              ...node,
              data: {
                ...node.data,
                isHighlighted: false,
              },
            }))
          );
        }, 3000);

        return true;
      }

      return false;
    },
    [initialNodes, setNodes, setCenter, getZoom]
  );

  const handleNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    const path = node.data.path;
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  }, []);

  const handleDownloadImage = useCallback(() => {
    const reactFlowElement = document.querySelector('.react-flow') as HTMLElement;
    if (!reactFlowElement) return;

    import('html-to-image').then(({ toPng }) => {
      toPng(reactFlowElement, {
        backgroundColor: '#ffffff',
        filter: (node) => {
          return !node.classList?.contains('react-flow__controls') &&
                 !node.classList?.contains('react-flow__minimap');
        },
      }).then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'json-tree.png';
        link.href = dataUrl;
        link.click();
      });
    });
  }, []);

  if (initialNodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
        Generate a tree to visualize your JSON data
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownloadImage}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors flex items-center gap-2"
            title="Download as image"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {copiedPath && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <Check className="w-5 h-5" />
          <span>Path copied: {copiedPath}</span>
        </div>
      )}

      <div className="flex-1 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'object':
                  return '#3b82f6';
                case 'array':
                  return '#22c55e';
                case 'primitive':
                  return '#fb923c';
                default:
                  return '#6b7280';
              }
            }}
          />
        </ReactFlow>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Objects</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Arrays</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Primitives</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Copy className="w-4 h-4" />
          <span>Click any node to copy its path</span>
        </div>
      </div>
    </div>
  );
}

export default function TreeVisualization(props: TreeVisualizationProps) {
  return (
    <ReactFlowProvider>
      <TreeVisualizationContent {...props} />
    </ReactFlowProvider>
  );
}
