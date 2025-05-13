
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { Bot, Package, Zap } from 'lucide-react';

interface NodeData {
  label: string;
  description?: string;
}

export const AgentNode = memo(({ data }: { data: NodeData }) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-blue-300 bg-blue-50 shadow-sm w-48">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Bot className="h-5 w-5 text-blue-500" />
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs text-gray-500">{data.description}</div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export const ToolNode = memo(({ data }: { data: NodeData }) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-purple-300 bg-purple-50 shadow-sm w-48">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-purple-500" />
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs text-gray-500">{data.description}</div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});

export const TriggerNode = memo(({ data }: { data: NodeData }) => {
  return (
    <div className="px-4 py-2 rounded-md border-2 border-amber-300 bg-amber-50 shadow-sm w-48">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-500" />
        <div>
          <div className="font-semibold text-sm">{data.label}</div>
          {data.description && (
            <div className="text-xs text-gray-500">{data.description}</div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
});
