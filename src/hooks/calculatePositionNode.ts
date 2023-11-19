import { useEffect, useState, RefObject } from 'react';

interface Node {
  children?: Node[];
  [key: string]: any;
}

const useCalculatePositions = (children: Node[], componentRef: RefObject<HTMLElement>) => {
  let positionParent: any = [];
  const [nodes, setNodes] = useState<Node[]>([]);

  const calculatePositions = (node: Node, angle: number, parentX: number, parentY: number, index: number): Node => {
    const radians = angle * (Math.PI / 180);
    let x = parentX;
    let y = parentY;

    if (index === 0) {  
      positionParent.push({
        x: parentX,
        y: parentY,
        zero: true,
        parentId: node.userId,
      });
    } else {
      const parent = positionParent.find((item: any) => item.parentId === node.ref);
      if (parent) {
        if (parent.zero) {
          x = 100 * Math.cos(radians) + parentX;
          y = 100 * Math.sin(radians) + parentY;
          positionParent.push({
            x: 100 * Math.cos(radians) + parentX,
            y: 100 * Math.sin(radians) + parentY,
            zero: false,
            parentId: node.userId,
          });
        } else {
          x = (100 - 10) * Math.cos(radians) + parent.x;
          y = (100 - 10) * Math.sin(radians) + parent.y;
          positionParent.push({
            x: (100 - 10) * Math.cos(radians) + parent.x,
            y: (100 - 10) * Math.sin(radians) + parent.y,
            zero: false,
            parentId: node.userId,
          });
        }
      }
    }

    return {
      ...node,
      position: {
        x,
        y
      },
      children: node.children?.map((child, index) => calculatePositions(child, index * (360 / (node.children?.length || 1)), x, y, index)),
    };
  };

  useEffect(() => {
    const componentWidth: number = componentRef.current?.offsetWidth || 0;
    const componentHeight: number = componentRef.current?.offsetHeight || 0;

    const left = componentWidth / 2.1;
    const top = componentHeight / 2.4;

    if (!isNaN(left) && !isNaN(top)) {
      const rootNode = {
        children: children.map((child, index) => calculatePositions(child, index * (360 / children.length), left, top, index)),
      };
      setNodes([rootNode]);
    }
  }, [children, componentRef]);

  return nodes;
};

export default useCalculatePositions;
