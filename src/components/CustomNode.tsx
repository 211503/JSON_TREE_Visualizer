import { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string;
    value?: any;
    path: string;
    nodeType: 'object' | 'array' | 'primitive';
    isHighlighted?: boolean;
  };
}

function CustomNode({ data }: CustomNodeProps) {
  const getNodeColor = () => {
    switch (data.nodeType) {
      case 'object':
        return 'bg-blue-500';
      case 'array':
        return 'bg-green-500';
      case 'primitive':
        return 'bg-orange-400';
      default:
        return 'bg-gray-500';
    }
  };

  const getNodeBorderColor = () => {
    switch (data.nodeType) {
      case 'object':
        return 'border-blue-600';
      case 'array':
        return 'border-green-600';
      case 'primitive':
        return 'border-orange-500';
      default:
        return 'border-gray-600';
    }
  };

  return (
    <div
      className={`px-4 py-2 rounded-lg border-2 shadow-lg min-w-[120px] text-center transition-all ${
        data.isHighlighted
          ? 'ring-4 ring-yellow-400 ring-offset-2 scale-110'
          : ''
      } ${getNodeColor()} ${getNodeBorderColor()}`}
      title={`Path: ${data.path}\nValue: ${data.value !== undefined ? JSON.stringify(data.value) : 'N/A'}`}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="text-white font-medium text-sm break-words">
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}

export default memo(CustomNode);
