
import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AgentNode, ToolNode, TriggerNode } from '@/components/workflow/nodes';
import NodePanel from '@/components/workflow/NodePanel';
import NodeConfigPanel from '@/components/workflow/NodeConfigPanel';

const nodeTypes: NodeTypes = {
  agent: AgentNode,
  tool: ToolNode,
  trigger: TriggerNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 100 },
    data: { label: 'Start Trigger', description: 'Initiates the workflow' },
  }
];

const initialEdges: Edge[] = [];

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  
  const onConnect = useCallback((params: Connection) => 
    setEdges((eds) => addEdge(params, eds)), [setEdges]);
  
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="h-[calc(100vh-9rem)]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Workflow Builder</h1>
          <p className="text-muted-foreground">Design your agent workflow</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button>Save Workflow</Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-12rem)]">
          {/* Node Library Panel */}
          <ResizablePanel defaultSize={20} minSize={15}>
            <div className="h-full border-r">
              <NodePanel />
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Flow Canvas */}
          <ResizablePanel defaultSize={55} minSize={30}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              className="bg-slate-50"
            >
              <Controls />
              <MiniMap />
              <Background gap={12} size={1} />
            </ReactFlow>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Configuration Panel */}
          <ResizablePanel defaultSize={25} minSize={20}>
            <div className="h-full border-l">
              <NodeConfigPanel selectedNode={selectedNode} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkflowBuilder;
