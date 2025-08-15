import dagre from "@dagrejs/dagre";
import type { EventArrow, EventNode } from "../stores/useEventStore";

export interface DagreLayoutOptions {
  nodeWidth?: number;
  nodeHeight?: number;
  rankdir?: "LR" | "TB" | "RL" | "BT";
  nodesep?: number;
  ranksep?: number;
}

export function getDagreLayout(
  nodes: EventNode[],
  options: DagreLayoutOptions = {}
) {
  const {
    nodeWidth = 160,
    nodeHeight = 80,
    rankdir = "LR",
    nodesep = 20,
    ranksep = 40,
  } = options;
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir, nodesep, ranksep });
  g.setDefaultEdgeLabel(() => ({}));
  nodes.forEach((node) => {
    g.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  nodes.forEach((node) => {
    if (node.next && Array.isArray(node.next)) {
      node.next.forEach((link: EventArrow) => {
        g.setEdge(link.from, link.to);
      });
    }
  });
  dagre.layout(g);
  // 왼쪽 정렬: 가장 작은 x값을 0으로 맞춤
  let minX = Infinity;
  nodes.forEach((node) => {
    const pos = g.node(node.id);
    if (pos?.x !== undefined && pos.x < minX) minX = pos.x;
  });
  return nodes.map((node) => {
    const pos = g.node(node.id);
    return {
      ...node,
      x: (pos?.x ?? 0) - minX,
      y: pos?.y ?? 0,
    };
  });
}
