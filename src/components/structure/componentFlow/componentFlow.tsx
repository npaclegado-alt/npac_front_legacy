import React, { useEffect, useId } from 'react';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import styles from './styleFlow.module.scss'
import useCalculatePositions from '../../../hooks/calculatePositionNode';
interface FlowProps {
    children: any;
    fullFlow: boolean;
}

export function Flow({
    children,
    fullFlow
}: FlowProps): JSX.Element {
let diagranRef: any = React.useRef(null);
let initialNodes: any = [];

    const diagramNodes = useCalculatePositions(children, diagranRef);
    const diagranNodesInitial: any = diagramNodes[0]?.children;

    function obterAvatarOuIniciais(nome: string) {
        const iniciais = nome?.split(' ')
        .map(word => word[0])
        .slice(0, 2) // Pegar as duas primeiras iniciais
        .join('')
        .toUpperCase();
        return iniciais;
    }

    useEffect(() => {
        const componentWidth: number = diagranRef.current?.offsetWidth || 0;
        const componentHeight: number = diagranRef.current?.offsetHeight || 0;

        const left = componentWidth / 2.1;
        const top = componentHeight / 2.4;

        initialNodes = diagranNodesInitial?.map((item: any, index: number) => {
            return index === 0 ? {
                ...item,
                id: Math.floor(Math.random() * 1000),
                position: {
                    x: left,
                    y: top
                }
            } : {
                ...item,
                id: Math.floor(Math.random() * 1000),
            };
        })
    }, [children, diagranRef, fullFlow]);

    function initDiagram() {
        const $ = go.GraphObject.make;
        const diagram: any =
          $(go.Diagram,
            {
              'undoManager.isEnabled': true,  
              //'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue'},
              model: new go.GraphLinksModel(
                {
                  linkKeyProperty: 'key', 
                }),
                initialScale: 0.8,
                initialViewportSpot: go.Spot.Center,
            });

            diagram.grid =
              $(go.Panel, "Grid",
                $(go.Shape, "LineH", { strokeWidth: 0.5, strokeDashArray: [0, 9.5, 0.5, 0] })
              );
                    
            diagram.toolManager.draggingTool.isGridSnapEnabled = true;
      
        diagram.nodeTemplate =
          $(go.Node, 'auto', 
             { 
                isTreeExpanded: true, 
                isClipping: true,  
            },
            { // when the user clicks on a Node, highlight all Links coming out of the node
                // and all of the Nodes at the other ends of those Links.
              click: (e, node: any) => {
                  // highlight all Links and Nodes coming out of a given Node
                  var diagram: any = node.diagram;
                  diagram.startTransaction("highlight");
                  // remove any previous highlighting
                  diagram.clearHighlighteds();
                  // for each Link coming out of the Node, set Link.isHighlighted
                  node?.findLinksOutOf().each((l: any) => l.isHighlighted = true);
                  // for each Node destination for the Node, set Node.isHighlighted
                  node?.findNodesOutOf().each((n: any) => n.isHighlighted = true);
                  diagram.commitTransaction("highlight");
                }
            },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Panel, "Spot",
                    { 
                        isClipping: true, 
                    },
                    $(go.Shape, "Ellipse", 
                    { 
                        fill: 'white',
                        maxSize: new go.Size(55, 55), 
                        margin: new go.Margin(0),
                        strokeWidth: 0.3,
                    },
                    new go.Binding("stroke", "isHighlighted", h => h ? "#F04E23" : "black")
                    .ofObject(),
                    ),
                    $(go.TextBlock,
                      {   margin: new go.Margin(10),
                          maxSize: new go.Size(100, 30),
                          isMultiline: false,
                          font: "bold 14pt sans-serif",
                          stroke: "#F04E23",
                      },
                      new go.Binding('text').makeTwoWay()
                    ),
                    $(go.Picture,
                    { 
                        maxSize: new go.Size(55, 55), 
                        margin: new go.Margin(10),
                    },
                    new go.Binding("source", "img", (img: string) => img ? img : require('../../../assets/images/user.png')),
                    ),                   
                    ),
                    $(go.Panel, "Spot",
                        $(go.Shape, "RoundedRectangle",
                          {
                            fill: 'white',
                            maxSize: new go.Size(45, 20),
                            margin: new go.Margin(56, 0, 0, 5),
                            strokeWidth: 0.3,
                          }, 
                          new go.Binding("stroke", "isHighlighted", h => h ? "#F04E23" : "black")
                        ),
                        $(go.TextBlock,
                          {
                            margin: new go.Margin(0),
                            maxSize: new go.Size(45, 20),
                            isMultiline: false,
                            font: "bold 10pt sans-serif",
                            stroke: "#F04E23",
                          },
                          new go.Binding('text', 'textBadge').makeTwoWay()
                          )
                    )
          );

          diagram.layout = $(go.TreeLayout);

          diagram.linkTemplate =
          $(go.Link,
            { toShortLength: 4 },
            $(go.Shape,
              // the Shape.stroke color depends on whether Link.isHighlighted is true
              new go.Binding("stroke", "isHighlighted", h => h ? "#F04E23" : "#D2D2D2")
                  .ofObject(),
                  new go.Binding("strokeWidth", "isHighlighted", h => h ? 2 : 1)
                  .ofObject()
                  ),
            $(go.Shape,
              { toArrow: "Standard", strokeWidth: 0 },
              // the Shape.fill color depends on whether Link.isHighlighted is true
              new go.Binding("fill", "isHighlighted", h => h ? "#F04E23" : "#D2D2D2")
                  .ofObject()),

            $(go.TextBlock, 
                { 
                    margin: new go.Margin(10),
                    maxSize: new go.Size(100, 30),
                    isMultiline: false,
                    font: "bold 10pt sans-serif",
                    stroke: "#F04E23",
                    segmentIndex: 0, 
                    segmentFraction: 0.2
                },
                new go.Binding("text").makeTwoWay(),
            ),
            );


            diagram.click = (e: any) => {
                e.diagram.commit((d: any) => d.clearHighlighteds(), "no highlighteds");
              };
      
        return diagram;
      }

      function handleModelChange(changes: go.IncrementalData) {
        console.log('GoJS model changed!', changes);
      }

      function getIndexByRef(ref: string) {
        return diagranNodesInitial.findIndex((item: any) => item.userId === ref);
      }

      function getIndexByUserId(userId: string) {
        return diagranNodesInitial.findIndex((item: any) => item.userId === userId);
      }
   
    return (
        <div
            ref={diagranRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <ReactDiagram
              initDiagram={initDiagram}
              divClassName={styles.diagram_component}
              nodeDataArray={diagranNodesInitial?.map((item: any, index: number) => {
                return {
                    key: getIndexByUserId(item.userId),
                    text: item?.avatar ? '' : obterAvatarOuIniciais(item?.name),
                    textBadge: obterAvatarOuIniciais(item?.name),
                    fig: 'Circle',
                    img: item?.avatar ?? '',
                    color: '#F04E23',
                    //loc: `${item.position.x} ${item.position.y}`
                }
              })}
              linkDataArray={diagranNodesInitial?.map((item: any, index: number) => {
                return {
                    key: index,
                    //text: obterAvatarOuIniciais(item?.name),
                    from:  index === 0 ? '' : getIndexByRef(item.ref),
                    to: getIndexByUserId(item.userId),
                }
              })}
              onModelChange={handleModelChange}
            />
        </div>
    );
}