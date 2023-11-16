import { useEffect, useState, RefObject } from 'react';

interface Node {
  children?: Node[];
  [key: string]: any;
}

const useCalculatePositions = (children: Node[], componentRef: RefObject<HTMLElement>) => {
  const [nodes, setNodes] = useState<Node[]>([]);

  const calculatePositions = (node: Node, angle: number, parentX: number, parentY: number): Node => {
    const radians = angle * (Math.PI / 180);
    const distance = 80; // Ajuste conforme necessário

    const x = distance * Math.cos(radians) + parentX;
    const y = distance * Math.sin(radians) + parentY;

    return {
      ...node,
      position: { x, y },
      children: node.children?.map((child, index) => calculatePositions(child, index * (360 / (node.children?.length || 1)), x, y)),
    };
  };

  useEffect(() => {
    const componentWidth: number = componentRef.current?.offsetWidth || 0;
    const componentHeight: number = componentRef.current?.offsetHeight || 0;

    const left = componentWidth / 2.1;
    const top = componentHeight / 2.4;

    if (!isNaN(left) && !isNaN(top)) {
      const rootNode = {
        position: { x: left, y: top },
        children: children.map((child, index) => calculatePositions(child, index * (360 / children.length), left, top)),
      };

      setNodes([rootNode]);
    }
  }, [children, componentRef]);

  return nodes;
};

export default useCalculatePositions;
