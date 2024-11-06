import {
  Node as XYFlowNode,
  Edge as XYFlowEdge,
  MarkerType,
} from '@xyflow/react';

import type {
  BlockSchema,
  CanvasResponse,
  EdgeSchema,
} from '@features/canvas/types/canvas.type';
import type { BlockItem } from '@features/canvas/types/block.type';

export const transformCanvasResponse = (response: CanvasResponse) => {
  const transformedNodes: XYFlowNode[] = response.data.canvas.blocks.map(
    (block) => ({
      id: block.id,
      type: 'custom',
      position: JSON.parse(block.position),
      data: {
        block: {
          type: block.type,
          name: block.name,
          fields: block.args,
        } as BlockItem,
      },
    })
  );

  const transformedEdges: XYFlowEdge[] = response.data.canvas.edges.map(
    (edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'smoothstep',
      markerEnd: { type: MarkerType.ArrowClosed, width: 30, height: 30 },
    })
  );

  return { nodes: transformedNodes, edges: transformedEdges };
};

export const transformNodesToBlockSchema = (
  nodes: XYFlowNode[]
): BlockSchema[] => {
  return nodes.map((node) => {
    const data = node.data as { block: BlockItem };
    return {
      id: node.id,
      position: JSON.stringify(node.position),
      name: data.block.name,
      type: data.block.type,
      args: data.block.fields,
    };
  });
};

export const transformEdgesToEdgeSchema = (
  edges: XYFlowEdge[]
): EdgeSchema[] => {
  return edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
  }));
};
