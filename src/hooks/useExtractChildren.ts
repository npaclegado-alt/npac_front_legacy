import { useState, useEffect } from 'react';

interface Child {
  userId: string;
  name: string;
  email: string;
  role: string;
  children: any[];
  avatar?: string;
}

export function useExtractChildren(data: Child) {
  const [childrenArray, setChildrenArray] = useState<Child[]>([]);
  
  useEffect(() => {
    function extractChildrenRecursive(data: Child) {
        setChildrenArray((prevChildren) => [...prevChildren, data]);
        if (data?.children?.length > 0) {
            for (const child of data?.children) {
                extractChildrenRecursive(child);         
            }
        }
    }
      setChildrenArray([]);
      extractChildrenRecursive(data);
    }, [data]);
    
  return childrenArray;
}