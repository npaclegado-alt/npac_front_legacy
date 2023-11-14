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
import styles from './styleFlow.module.scss';

interface FlowProps {
    children: any;
    fullFlow: boolean;
}

const edgeTypes = {
    floating: FloatingEdge,
};

export function Flow({
    children,
    fullFlow
}: FlowProps): JSX.Element {
    let initialNodes: Node<{ label: string }, string | undefined>[] = [];
    let initialEdges: any = [];
    const componentRef: any = useRef<HTMLDivElement>();
    
    const changeNode = { default: ({ data }: any) => {
        return (
            <div style={data?.style}>
                {data?.avatar ? (
                    <img
                        src={data?.avatar}
                        alt={data?.label}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '2rem',
                        }}
                    />
                ) : (
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {data?.label}
                    </span>
                )}
            </div>
        )
        },
    }

    function obterAvatarOuIniciais(nome: string) {
            const iniciais = nome?.split(' ')
                .map(word => word[0])
                .slice(0, 2) // Pegar as duas primeiras iniciais
                .join('')
                .toUpperCase();
            return iniciais;
    }
    
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
                    data: { 
                        label: <div className={styles.customLabel}>
                                    {item.avatar ?
                                        <img src={item.avatar} alt="" /> : 
                                        <p>
                                            {obterAvatarOuIniciais(item.name)}
                                        </p>
                                    }
                                </div>, 
                        avatar: item.avatar ?? '',
                    },
                    style: { 
                        width: '2rem', 
                        height: '2rem', 
                        padding: 0,
                        borderRadius: '2rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'semi-bold',
                        fontSize: '1.2rem',
                        color: '#F04E23',
                        backgroundColor: 'transparent',
                        boxShadow: '-2px 2px 2px 1px rgba(0, 0, 0, 0.3)',
                    } as React.CSSProperties,
                } : {
                    id: `${item?.userId}`,
                    position: { 
                        x: x, 
                        y: y 
                    },
                    data: { 
                        label: <div className={styles.customLabel}>
                                    {item.avatar ?
                                        <img src={item.avatar} alt="" /> : 
                                        <p>
                                            {obterAvatarOuIniciais(item.name)}
                                        </p>
                                    }
                                </div>, 
                        avatar: item.avatar ?? ''
                    },
                    style: { 
                        width: '2rem', 
                        height: '2rem', 
                        borderRadius: '2rem',
                        borderColor: '#FFFFFF', 
                        borderWidth: '2px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'semi-bold',
                        fontSize: '1.2rem',
                        color: '#F04E23',
                        backgroundColor: 'transparent',
                        boxShadow: '-2px 2px 2px 1px rgba(0, 0, 0, 0.3)',                       
                    } as React.CSSProperties,
                }
            });

            if (initialNodes) {
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
                    type: MarkerType.Arrow, 
                }
            }
        });

        if (initialEdges) {
            setEdges(initialEdges)
        }
    }, [componentRef, children, fullFlow]);

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
                {fullFlow && <MiniMap />}
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