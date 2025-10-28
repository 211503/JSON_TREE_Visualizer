import { TreeNode, TreeEdge } from '../types/json';

export function jsonToTree(json: any): { nodes: TreeNode[]; edges: TreeEdge[] } {
  const nodes: TreeNode[] = [];
  const edges: TreeEdge[] = [];
  let nodeIdCounter = 0;

  function getNodeType(value: any): 'object' | 'array' | 'primitive' {
    if (Array.isArray(value)) return 'array';
    if (value !== null && typeof value === 'object') return 'object';
    return 'primitive';
  }

  function traverse(
    value: any,
    key: string,
    parentId: string | null,
    path: string,
    level: number,
    indexInLevel: number
  ) {
    const nodeId = `node-${nodeIdCounter++}`;
    const nodeType = getNodeType(value);

    let label = key;
    let displayValue: any = undefined;

    if (nodeType === 'primitive') {
      displayValue = value;
      label = `${key}: ${JSON.stringify(value)}`;
    } else if (nodeType === 'array') {
      label = `${key} []`;
    } else {
      label = key;
    }

    const node: TreeNode = {
      id: nodeId,
      type: nodeType,
      data: {
        label,
        value: displayValue,
        path,
        nodeType,
      },
      position: {
        x: indexInLevel * 250,
        y: level * 120,
      },
    };

    nodes.push(node);

    if (parentId) {
      edges.push({
        id: `edge-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        type: 'smoothstep',
      });
    }

    if (nodeType === 'object') {
      const keys = Object.keys(value);
      keys.forEach((k, idx) => {
        const childPath = path ? `${path}.${k}` : k;
        traverse(value[k], k, nodeId, childPath, level + 1, indexInLevel * keys.length + idx);
      });
    } else if (nodeType === 'array') {
      value.forEach((item: any, idx: number) => {
        const childPath = `${path}[${idx}]`;
        traverse(item, `[${idx}]`, nodeId, childPath, level + 1, indexInLevel * value.length + idx);
      });
    }
  }

  if (json !== null && json !== undefined) {
    const rootType = getNodeType(json);
    const rootLabel = rootType === 'object' ? 'root' : rootType === 'array' ? 'root []' : 'root';
    traverse(json, rootLabel, null, '$', 0, 0);
  }

  return { nodes, edges };
}

export function searchNodeByPath(nodes: TreeNode[], searchPath: string): TreeNode | null {
  const normalizedSearch = searchPath.trim().replace(/^\$\.?/, '');

  for (const node of nodes) {
    const nodePath = node.data.path.replace(/^\$\.?/, '');
    if (nodePath === normalizedSearch) {
      return node;
    }
  }

  return null;
}
