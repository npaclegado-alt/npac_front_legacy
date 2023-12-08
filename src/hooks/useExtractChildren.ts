import { useState, useEffect } from 'react';

let sephereDepth: number = 0;
interface Child {
  userId: string;
  name: string;
  email: string;
  role: string;
  children: any[];
  avatar?: string;
  depth?: number;
  address?: [];
}

export function useExtractChildren(data: Child) {
  const [childrenArray, setChildrenArray] = useState<Child[]>([]);
  
  useEffect(() => {
    function extractChildrenRecursive(data: Child) {
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