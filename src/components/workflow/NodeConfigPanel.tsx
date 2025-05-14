
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Node } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Key, ShieldCheck, Brain, Cpu, Code } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface NodeConfigPanelProps {
  selectedNode: Node | null;
}

const NodeConfigPanel: React.FC<NodeConfigPanelProps> = ({ selectedNode }) => {
  const [activeTab, setActiveTab] = useState('general');

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
      
      <div className="p-4 border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
            <TabsTrigger value="advanced" className="flex-1">Advanced</TabsTrigger>
            {selectedNode.type === 'agent' && (
              <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
            )}
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <TabsContent value="general" className="space-y-6 mt-0">
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
              <AgentGeneralConfig />
            )}
            
            {selectedNode.type === 'tool' && (
              <ToolGeneralConfig />
            )}
            
            {selectedNode.type === 'trigger' && (
              <TriggerGeneralConfig />
            )}
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-6 mt-0">
            {selectedNode.type === 'agent' && (
              <AgentAdvancedConfig />
            )}
            
            {selectedNode.type === 'tool' && (
              <ToolAdvancedConfig />
            )}
            
            {selectedNode.type === 'trigger' && (
              <TriggerAdvancedConfig />
            )}
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6 mt-0">
            {selectedNode.type === 'agent' && (
              <AgentSecurityConfig />
            )}
          </TabsContent>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t flex space-x-2 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Apply Changes</Button>
      </div>
    </div>
  );
};

// Agent configuration components
const AgentGeneralConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Model Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">AI Model</Label>
            <Select defaultValue="gpt-4-turbo">
              <SelectTrigger>
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="mistral-large">Mistral Large</SelectItem>
                <SelectItem value="llama-3-70b">Llama 3 70B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperature</Label>
            <div className="space-y-1">
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
                <span>Precise (0.0)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max-tokens">Max Response Length</Label>
            <Select defaultValue="4000">
              <SelectTrigger>
                <SelectValue placeholder="Select length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1000">1,000 tokens</SelectItem>
                <SelectItem value="2000">2,000 tokens</SelectItem>
                <SelectItem value="4000">4,000 tokens</SelectItem>
                <SelectItem value="8000">8,000 tokens</SelectItem>
                <SelectItem value="16000">16,000 tokens</SelectItem>
                <SelectItem value="32000">32,000 tokens</SelectItem>
              </SelectContent>
            </Select>
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
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Knowledge Sources</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Source
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="rounded-md border p-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Market Research PDF</p>
              <p className="text-xs text-muted-foreground">PDF Document • 2.4 MB</p>
            </div>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
          <div className="rounded-md border p-3 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Customer Support FAQ</p>
              <p className="text-xs text-muted-foreground">Text • 145 KB</p>
            </div>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AgentAdvancedConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Response Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="json-output">JSON Output</Label>
              <p className="text-xs text-muted-foreground">Force structured JSON responses</p>
            </div>
            <Switch id="json-output" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="markdown-support">Markdown Support</Label>
              <p className="text-xs text-muted-foreground">Enable markdown formatting in responses</p>
            </div>
            <Switch id="markdown-support" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="stream-response">Stream Response</Label>
              <p className="text-xs text-muted-foreground">Display responses as they are generated</p>
            </div>
            <Switch id="stream-response" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Function Calling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="function-calling">Enable Function Calling</Label>
              <p className="text-xs text-muted-foreground">Allow agent to call tools and APIs</p>
            </div>
            <Switch id="function-calling" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="function-calling-mode">Function Calling Mode</Label>
            <RadioGroup defaultValue="auto" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auto" id="r1" />
                <Label htmlFor="r1">Auto (recommended)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="required" id="r2" />
                <Label htmlFor="r2">Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="none" id="r3" />
                <Label htmlFor="r3">None</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">System Prompts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="system-prompt">Pre-context System Prompt</Label>
            <Textarea 
              id="system-prompt"
              placeholder="Instructions that run before user input..."
              className="resize-none h-24"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="post-prompt">Post-context System Prompt</Label>
            <Textarea 
              id="post-prompt"
              placeholder="Instructions that run after user input..."
              className="resize-none h-24"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AgentSecurityConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Access Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="require-auth">Require Authentication</Label>
              <p className="text-xs text-muted-foreground">Users must be logged in to access this agent</p>
            </div>
            <Switch id="require-auth" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="access-level">Access Level</Label>
            <Select defaultValue="authenticated">
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public (anyone)</SelectItem>
                <SelectItem value="authenticated">Authenticated users</SelectItem>
                <SelectItem value="admin">Admins only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Content Safety</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="content-filtering">Content Filtering</Label>
              <p className="text-xs text-muted-foreground">Filter unsafe or inappropriate content</p>
            </div>
            <Switch id="content-filtering" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="filtering-level">Filtering Level</Label>
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select filtering level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="pii-redaction">PII Redaction</Label>
              <p className="text-xs text-muted-foreground">Redact personally identifiable information</p>
            </div>
            <Switch id="pii-redaction" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Authentication Keys</CardTitle>
          <Button variant="outline" size="sm">
            <Key className="h-4 w-4 mr-1" />
            Add Key
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-3 text-center text-sm text-muted-foreground">
            No API keys configured
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Tool configuration components
const ToolGeneralConfig = () => {
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
            <Select defaultValue="apiKey">
              <SelectTrigger>
                <SelectValue placeholder="Select auth type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apiKey">API Key</SelectItem>
                <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                <SelectItem value="basic">Basic Auth</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" type="password" placeholder="Enter API key" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="method">Request Method</Label>
            <Select defaultValue="GET">
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm">Parameters</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Parameter
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-muted p-3 text-center text-sm text-muted-foreground">
            No parameters configured
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ToolAdvancedConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Request Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="timeout">Request Timeout (ms)</Label>
            <Input id="timeout" type="number" defaultValue="30000" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="retries">Max Retries</Label>
            <Input id="retries" type="number" defaultValue="3" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="follow-redirects">Follow Redirects</Label>
              <p className="text-xs text-muted-foreground">Automatically follow HTTP redirects</p>
            </div>
            <Switch id="follow-redirects" defaultChecked />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Headers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input placeholder="Header name" />
              </div>
              <div className="flex-1">
                <Input placeholder="Value" />
              </div>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Response Transformation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="transform-script">Transformation Script</Label>
            <Textarea 
              id="transform-script" 
              className="font-mono text-sm"
              placeholder="// Transform response using JavaScript"
              rows={6}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="cache-response">Cache Responses</Label>
              <p className="text-xs text-muted-foreground">Cache identical requests to improve performance</p>
            </div>
            <Switch id="cache-response" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Trigger configuration components
const TriggerGeneralConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Trigger Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trigger-type">Trigger Type</Label>
            <Select defaultValue="manual">
              <SelectTrigger>
                <SelectValue placeholder="Select trigger type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="event">Event-based</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule (CRON Expression)</Label>
            <Input id="schedule" placeholder="e.g., 0 9 * * *" />
            <p className="text-xs text-muted-foreground mt-1">Example: "0 9 * * *" runs daily at 9 AM</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Input Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="initial-data">Initial Data (JSON)</Label>
            <Textarea 
              id="initial-data" 
              className="font-mono text-sm resize-none"
              placeholder='{ "key": "value" }'
              rows={5}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TriggerAdvancedConfig = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Event Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-source">Event Source Type</Label>
            <Select defaultValue="webhook">
              <SelectTrigger>
                <SelectValue placeholder="Select event source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="webhook">Webhook</SelectItem>
                <SelectItem value="api">REST API</SelectItem>
                <SelectItem value="database">Database Change</SelectItem>
                <SelectItem value="message-queue">Message Queue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event-filter">Event Filter (JSON Path)</Label>
            <Input id="event-filter" placeholder="e.g., $.event.type" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Webhook Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="webhook-url">Webhook URL</Label>
            </div>
            <Button variant="outline" size="sm">
              Copy
            </Button>
          </div>
          <Input id="webhook-url" value="https://example.com/webhook/ABC123" readOnly className="bg-muted" />
          
          <div className="space-y-2">
            <Label htmlFor="secret-key">Secret Key</Label>
            <div className="flex gap-2">
              <Input id="secret-key" type="password" value="••••••••••••••••" readOnly className="flex-1 bg-muted" />
              <Button variant="outline" size="sm">
                Regenerate
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="verify-signature">Verify Signature</Label>
              <p className="text-xs text-muted-foreground">Verify webhook request signatures</p>
            </div>
            <Switch id="verify-signature" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NodeConfigPanel;
