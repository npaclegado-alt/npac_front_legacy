import React, 
{ 
    useCallback,
    useEffect 
} from 'react';
import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    BackgroundVariant,
    Node,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes: Node<{ label: string }, string | undefined>[] = [
    {
        id: '1',
        position: { x: 250, y: 140 },
        data: { label: '1' },
        style: { 
            width: '2rem', 
            height: '2rem', 
            borderRadius: '2rem', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } as React.CSSProperties,
    },
    {
        id: '2',
        position: { x: 100, y: 200 },
        data: { label: '2' },
        style: { 
            width: '2rem', 
            height: '2rem', 
            borderRadius: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } as React.CSSProperties,
    },
];
//const initialNodes = [
//    { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, style: { shape: 'ellipse' } },
//    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, style: { shape: 'ellipse' } },
//  ];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export function Flow(): JSX.Element {
       
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback(
      (params: any) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );

    const variant: BackgroundVariant | any = 'dots';

    return (
        <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        >
            {false && <MiniMap />}
            <Controls />
            <Background 
                variant={variant} 
                gap={12} 
                size={1} 
                color="#2b2b2b"
                style={{
                    backgroundColor: "#f2f2f2",
                    borderRadius: '0.25rem'
                }}
            />
        </ReactFlow>
    );
}