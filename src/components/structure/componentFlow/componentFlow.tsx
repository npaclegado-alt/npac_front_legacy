import React, 
{ 
    useCallback,
    useEffect, 
    useRef
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
    BaseEdge,
    MarkerType,
} from 'reactflow';

import FloatingEdge from './floatingEdge';
import FloatingConnectionLine from './floatingConnectionLine';

import 'reactflow/dist/style.css';

interface FlowProps {
    children: any;
}

const edgeTypes = {
    floating: FloatingEdge,
  };

export function Flow({
    children
}: FlowProps): JSX.Element {
    let initialNodes: Node<{ label: string }, string | undefined>[] = [];
    let initialEdges: any = [];
    const componentRef: any = useRef<HTMLDivElement>();
    const [nodesInitials, setNodesInitials] = React.useState<any>([]);
    
    console.log('nodesInitials', children);
    useEffect(() => {
        const componentWidth: any = componentRef?.current?.offsetWidth;
        const componentHeight: any = componentRef?.current?.offsetHeight;
        const left = componentWidth / 2.1;
        const top = componentHeight / 2.4;
        
        if (!isNaN(left) && !isNaN(top)) {
            initialNodes = children?.map((item: any, index: number) => {
                const degrees = index * (360 / 8);
                const radians = degrees * (Math.PI / 180);
                const x = 80 * Math.cos(radians) + left;
                const y = 80 * Math.sin(radians) + top;
                return index === 0 ? {
                    id: `${item?.userId}`,
                    position: { x: left, y: top },
                    data: { label: item?.name?.slice(0, 2) },
                    style: { 
                        width: '2rem', 
                        height: '2rem', 
                        borderRadius: '2rem', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } as React.CSSProperties,
                } : {
                    id: `${item?.userId}`,
                    position: { 
                        x: x, 
                        y: y 
                    },
                    data: { label: item?.name?.slice(0, 2) },
                    style: { 
                        width: '2rem', 
                        height: '2rem', 
                        borderRadius: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    } as React.CSSProperties,
                }
            });

            if (initialNodes) {
                console.log('nodesInitials', initialNodes);
                setNodes(initialNodes)
            }
        }

        initialEdges = children?.map((item: any, index: number) => {
            return {
                id: `edge-${index}`,
                source: `${item?.ref}`,
                target: `${item?.userId}`,
                type: 'floating',
                markerEnd: { 
                    type: MarkerType.Arrow 
                }
            }
        });

        if (initialEdges) {
            setEdges(initialEdges)
        }
    }, [componentRef, children]);

    //[{ id: 'e1-2', source: '1', target: '2' }];
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    
    const onConnect = useCallback(
      (params: any) => setEdges((eds) => addEdge(params, eds)),
      [setEdges],
    );

    const variant: BackgroundVariant | any = 'dots';

    return (
        <div
            ref={(ref) => (componentRef.current = ref)}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            edgeTypes={edgeTypes}
            connectionLineComponent={FloatingConnectionLine}
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
        </div>
    );
}