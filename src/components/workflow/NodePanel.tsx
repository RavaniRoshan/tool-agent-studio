
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const NodePanel = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium mb-2">Components</h3>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search components" className="pl-8" />
        </div>
      </div>
      
      <Tabs defaultValue="agents" className="flex-1 flex flex-col">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="flow">Flow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="agents" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {agents.map((agent) => (
                <NodeItem 
                  key={agent.id}
                  label={agent.label}
                  type="agent"
                  description={agent.description}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="tools" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {tools.map((tool) => (
                <NodeItem 
                  key={tool.id}
                  label={tool.label}
                  type="tool"
                  description={tool.description}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="flow" className="flex-1 m-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {flowControls.map((control) => (
                <NodeItem 
                  key={control.id}
                  label={control.label}
                  type="flow"
                  description={control.description}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const NodeItem = ({ label, type, description }: { 
  label: string;
  type: 'agent' | 'tool' | 'flow';
  description: string;
}) => {
  const bgColor = {
    agent: 'bg-blue-50 border-blue-200',
    tool: 'bg-purple-50 border-purple-200',
    flow: 'bg-gray-50 border-gray-200',
  };
  
  return (
    <div 
      className={`p-3 rounded border ${bgColor[type]} cursor-grab hover:shadow-sm transition-shadow`}
      draggable
    >
      <p className="font-medium text-sm">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
};

// Sample data
const agents = [
  { id: 'a1', label: 'Text Generation', description: 'Creates text based on prompts' },
  { id: 'a2', label: 'Image Analysis', description: 'Analyzes and describes images' },
  { id: 'a3', label: 'Data Extraction', description: 'Extracts structured data from text' },
  { id: 'a4', label: 'Summarization', description: 'Creates concise summaries of content' },
  { id: 'a5', label: 'Chatbot', description: 'Interactive conversational agent' },
];

const tools = [
  { id: 't1', label: 'Web Search', description: 'Searches the internet for information' },
  { id: 't2', label: 'Database Query', description: 'Queries databases for information' },
  { id: 't3', label: 'File Reader', description: 'Reads and processes files' },
  { id: 't4', label: 'Email Sender', description: 'Sends emails based on templates' },
  { id: 't5', label: 'API Connector', description: 'Connects to external APIs' },
];

const flowControls = [
  { id: 'f1', label: 'Condition', description: 'Branches flow based on conditions' },
  { id: 'f2', label: 'Loop', description: 'Repeats operations on collections' },
  { id: 'f3', label: 'Delay', description: 'Adds time delay between operations' },
  { id: 'f4', label: 'Trigger', description: 'Starts workflow execution' },
  { id: 'f5', label: 'Merge', description: 'Combines multiple paths into one' },
];

export default NodePanel;
