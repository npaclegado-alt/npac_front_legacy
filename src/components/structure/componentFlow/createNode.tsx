import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import styles from './styleFlow.module.scss';
interface NodeProps {
    targetPosition?: any;
    sourcePosition?: any;
    data: any;
    isConnectable: boolean;
}
export default function CustonNode({ data, isConnectable, targetPosition, sourcePosition }: NodeProps) {
    console.log('rendering ColorPickerNode', data, 'isConnectable', isConnectable, 'targetPosition', targetPosition, 'sourcePosition', sourcePosition);
  return (
    <>
      {data.index !== 0 && (
            <Handle
              type="target"
              position={Position.Bottom}
              style={{ background: '#555' }}
              onConnect={(params) => console.log('handle onConnect', params)}
              isConnectable={false}
            />
            )
        }
        <div className={styles.customLabel}>
            {data.avatar ?
                <img src={data.avatar} alt="" /> : 
                <p>
                    {data.label}
                </p>
            }
        </div>
      {data?.childrens?.map((item: any, index: number) => {
        return (
        <Handle
            type="source"
            position={(item?.position?.x < data?.position?.x) ? Position.Right : Position.Left}
            id={item?.userId}
            style={{ top: 10, background: '#555' }}
            isConnectable={false}
        />)
      })}
    </>
  );
}
