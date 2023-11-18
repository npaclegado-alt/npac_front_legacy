import React from 'react';
import { useStore } from 'reactflow';

interface ConnectionLineProps {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
}
export default ({ fromX, fromY, toX, toY }: ConnectionLineProps) => {
  const { connectionHandleId } = useStore((state) => state);

  return (
    <g>
      <path
        fill="none"
        stroke={connectionHandleId ?? '#fff'}
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={connectionHandleId ?? '#fff'}
        strokeWidth={1.5}
      />
    </g>
  );
};
