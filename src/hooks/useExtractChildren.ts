import { useState, useEffect } from 'react';
import { ITreeNodeSphere } from '../contexts/interfaces';

let sephereDepth: number = 0;

export function useExtractChildren(data: ITreeNodeSphere) {
  const [childrenArray, setChildrenArray] = useState<ITreeNodeSphere[]>([]);
  
  useEffect(() => {
    function extractChildrenRecursive(data: ITreeNodeSphere) {
        const newData = {...data, depth: sephereDepth};
        setChildrenArray((prevChildren) => [...prevChildren, newData]);
        if (data?.children?.length > 0) {
            sephereDepth++;
            for (const child of data?.children) {
                extractChildrenRecursive({ ...child});         
            }
            sephereDepth--;
        }
    }
      setChildrenArray([]);
      extractChildrenRecursive(data);
    }, [data]);
    
  return childrenArray;
}