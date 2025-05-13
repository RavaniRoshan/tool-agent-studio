
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WorkflowCard {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
}

const sampleWorkflows: WorkflowCard[] = [
  {
    id: '1',
    name: 'Content Generation Pipeline',
    description: 'Multi-stage workflow for creating and refining content across platforms',
    updatedAt: '2025-05-10T14:23:45Z',
  },
  {
    id: '2',
    name: 'Customer Support Automation',
    description: 'Handles customer inquiries with specialized agents and tools',
    updatedAt: '2025-05-09T09:17:23Z',
  },
  {
    id: '3',
    name: 'Data Analysis Flow',
    description: 'Processes data through multiple analysis stages and generates reports',
    updatedAt: '2025-05-07T16:42:11Z',
  },
];

const WorkflowsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">
            Create and manage your AI agent workflows
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/workflows/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Workflow
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleWorkflows.map((workflow) => (
          <Link key={workflow.id} to={`/dashboard/workflows/${workflow.id}`}>
            <Card className="h-full hover:border-blue-400 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle>{workflow.name}</CardTitle>
                <CardDescription>
                  Last updated {new Date(workflow.updatedAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{workflow.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkflowsPage;
