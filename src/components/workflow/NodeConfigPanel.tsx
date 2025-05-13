
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Node } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface NodeConfigPanelProps {
  selectedNode: Node | null;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ selectedNode }) => {
  if (!selectedNode) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center">
        <div className="text-muted-foreground">
          <p>Select a node to configure</p>
          <p className="text-sm">Click on any node in the workflow to edit its properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="font-medium">Node Configuration</h3>
        <p className="text-sm text-muted-foreground">
          {selectedNode.type === 'agent' 
            ? 'Configure agent settings'
            : selectedNode.type === 'tool'
            ? 'Configure tool parameters'
            : 'Configure flow control'}
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="node-name">Name</Label>
            <Input id="node-name" defaultValue={selectedNode.data?.label} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="node-description">Description</Label>
            <Textarea 
              id="node-description" 
              defaultValue={selectedNode.data?.description}
              className="resize-none"
              rows={3}
            />
          </div>
          
          {selectedNode.type === 'agent' && (
            <AgentConfig />
          )}
          
          {selectedNode.type === 'tool' && (
            <ToolConfig />
          )}
          
          {selectedNode.type === 'trigger' && (
            <TriggerConfig />
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <Button className="w-full">Apply Changes</Button>
      </div>
    </div>
  );
};

const AgentConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Model Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <select id="model" className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
              <option>GPT-4 Turbo</option>
              <option>Claude 3 Opus</option>
              <option>Gemini Pro</option>
              <option>Mistral Large</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <Input 
              id="temperature"
              type="range"
              min="0"
              max="1"
              step="0.1"
              defaultValue="0.7"
              className="w-full"
            />
            <div className="flex justify-between text-xs">
              <span>Precise</span>
              <span>Creative</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Enter instructions for the agent..."
            rows={5}
            className="resize-none"
          />
        </CardContent>
      </Card>
    </div>
  );
};

const ToolConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">API Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="endpoint">API Endpoint</Label>
            <Input id="endpoint" placeholder="https://api.example.com/v1" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="auth-type">Authentication</Label>
            <select id="auth-type" className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
              <option>API Key</option>
              <option>OAuth 2.0</option>
              <option>Basic Auth</option>
              <option>None</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" type="password" placeholder="Enter API key" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Parameters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Input Parameters</Label>
              <Button variant="outline" size="sm">Add</Button>
            </div>
            <div className="border rounded-md p-2 text-center text-sm text-muted-foreground">
              No parameters configured
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TriggerConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Trigger Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trigger-type">Trigger Type</Label>
            <select id="trigger-type" className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
              <option>Manual</option>
              <option>Scheduled</option>
              <option>Webhook</option>
              <option>Event-based</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule (if applicable)</Label>
            <Input id="schedule" placeholder="e.g., Daily at 9AM" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NodeConfigPanel;
