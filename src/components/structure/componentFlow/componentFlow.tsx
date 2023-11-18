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
    } from 'reactflow';

import useCalculatePositions from '../../../hooks/calculatePositionNode';
import createNode from './createNode';
import connectionLines from './connectionLines';

import 'reactflow/dist/style.css';
import styles from './styleFlow.module.scss';

interface FlowProps {
    children: any;
    fullFlow: boolean;
}

interface NodeData {
    label: React.ReactNode;
    avatar: any;
}

interface NodeProps {
    id: string;
    position: any;
    data: NodeData;
    style: React.CSSProperties;
    children?: any;
}

const nodeTypes = {
    custom: createNode,
  };

export function Flow({
    children,
    fullFlow
}: FlowProps): JSX.Element {
    let initialNodes: NodeProps[] | any = [];
    let nodesHook: any = [];
    let initialEdges: any = [];
    const componentRef: any = useRef<HTMLDivElement>();

    nodesHook = useCalculatePositions(children, componentRef);
    
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

        
        if (nodesHook) {
            console.log('iniTialNodes', nodesHook)
            initialNodes = nodesHook[0]?.children?.map((item: any, index: number) => {
                console.log('item', item)
                const { x, y } = item.position;
                return index === 0 ? {
                    id: `${item?.userId}`,
                    position: { 
                        x: left,
                        y: top,
                    },
                    type: 'custom',
                    data: { 
                        label: obterAvatarOuIniciais(item.name), 
                        avatar: item.avatar ?? '',
                        position: {
                            x: left,
                            y: top,
                        },
                        index: index,
                        childrens: item.children,
                        id: item.userId,
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
            } : {
                    id: `${item?.userId}`,
                    position: { 
                        x,
                        y,
                    },
                    type: 'custom',
                    data: { 
                        label: obterAvatarOuIniciais(item.name), 
                        avatar: item.avatar ?? '',
                        position: { 
                            x,
                            y,
                        },
                        index: index,
                        childrens: item.children,
                        id: item.userId,
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
                sourceHandle: `${item?.userId}`,
                type: 'straight',
                style: { 
                    stroke: '#F04E23',
                },
                MarkerType: 'arrow',
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
            nodeTypes={nodeTypes}
            connectionLineComponent={connectionLines}
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