export interface TreeNode {
  id: string;
  type: 'object' | 'array' | 'primitive';
  data: {
    label: string;
    value?: any;
    path: string;
    nodeType: 'object' | 'array' | 'primitive';
  };
  position: { x: number; y: number };
}

export interface TreeEdge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep';
}
