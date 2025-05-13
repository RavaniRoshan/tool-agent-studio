
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Bot, Plus, Sparkles, Link, Settings } from 'lucide-react';

// Mock data for agents
const agentsData = [
  {
    id: 1,
    name: 'GPT-4 Assistant',
    model: 'OpenAI GPT-4',
    description: 'General purpose assistant optimized for creative tasks',
    status: 'Active',
    category: 'Assistant',
    tags: ['Creative', 'Writing', 'General'],
    costPerToken: '$0.01',
    usagePercentage: 75,
  },
  {
    id: 2,
    name: 'Data Analyst',
    model: 'Claude 3 Opus',
    description: 'Specialized agent for data analysis and visualization',
    status: 'Active',
    category: 'Specialist',
    tags: ['Data', 'Analysis', 'Finance'],
    costPerToken: '$0.012',
    usagePercentage: 45,
  },
  {
    id: 3,
    name: 'Code Reviewer',
    model: 'GPT-4',
    description: 'Reviews and suggests improvements to code',
    status: 'Active',
    category: 'Developer',
    tags: ['Code', 'Review', 'Security'],
    costPerToken: '$0.01',
    usagePercentage: 60,
  },
  {
    id: 4,
    name: 'Customer Support Bot',
    model: 'Claude 3 Sonnet',
    description: 'Handles customer queries and support tickets',
    status: 'Paused',
    category: 'Support',
    tags: ['Customer Service', 'FAQ'],
    costPerToken: '$0.008',
    usagePercentage: 20,
  },
  {
    id: 5,
    name: 'Research Assistant',
    model: 'Gemini Pro',
    description: 'Performs in-depth research and summarizes findings',
    status: 'Active',
    category: 'Researcher',
    tags: ['Research', 'Summarization'],
    costPerToken: '$0.0075',
    usagePercentage: 50,
  },
  {
    id: 6,
    name: 'Sentiment Analyzer',
    model: 'Custom Fine-tuned',
    description: 'Analyzes text for emotional sentiment and tone',
    status: 'Inactive',
    category: 'Specialist',
    tags: ['Sentiment', 'Analysis', 'Marketing'],
    costPerToken: '$0.015',
    usagePercentage: 10,
  },
];

const statusColors = {
  'Active': 'bg-green-100 text-green-700',
  'Paused': 'bg-amber-100 text-amber-700',
  'Inactive': 'bg-gray-100 text-gray-700',
};

const AgentsPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">AI Agents</h1>
          <p className="text-muted-foreground">Configure and manage your AI agents</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Agent
        </Button>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="my-agents">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="my-agents">My Agents</TabsTrigger>
              <TabsTrigger value="available-models">Available Models</TabsTrigger>
              <TabsTrigger value="custom-agents">Custom Agents</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search agents..."
                className="pl-10 w-[250px]"
              />
            </div>
          </div>
          
          <TabsContent value="my-agents" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentsData.map((agent) => (
                <Card key={agent.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-100 rounded-md">
                          <Bot className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>{agent.model}</CardDescription>
                        </div>
                      </div>
                      <Badge className={statusColors[agent.status as keyof typeof statusColors]}>
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-muted-foreground">{agent.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="border-t pt-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {agent.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Cost per token</p>
                        <p className="font-medium">{agent.costPerToken}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Usage</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-blue-600 h-1.5 rounded-full" 
                              style={{ width: `${agent.usagePercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-xs">{agent.usagePercentage}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Link className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Sparkles className="h-4 w-4 mr-1" />
                      Fine-tune
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="available-models">
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <Bot className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Available AI Models</h3>
              <p className="text-muted-foreground mb-4">
                Browse and connect to popular AI models from OpenAI, Anthropic, Google, and more.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Connect a Model
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="custom-agents">
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <Sparkles className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Custom Agents</h3>
              <p className="text-muted-foreground mb-4">
                Create specialized agents with custom instructions, knowledge bases, and tools.
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Agent
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentsPage;
