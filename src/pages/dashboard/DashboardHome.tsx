
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Bot, Package, Users, Workflow, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for dashboard
const stats = [
  { name: 'Active Agents', value: '12', icon: Bot, color: 'bg-blue-100 text-blue-600' },
  { name: 'Available Tools', value: '34', icon: Package, color: 'bg-purple-100 text-purple-600' },
  { name: 'Team Members', value: '8', icon: Users, color: 'bg-green-100 text-green-600' },
  { name: 'Active Workflows', value: '5', icon: Workflow, color: 'bg-amber-100 text-amber-600' },
];

const projectData = [
  {
    name: 'Content Generation',
    status: 'In Progress',
    progress: '75%',
    agents: '3',
    lastActive: '2 hours ago',
  },
  {
    name: 'Data Analysis Pipeline',
    status: 'Active',
    progress: '40%',
    agents: '5',
    lastActive: '15 minutes ago',
  },
  {
    name: 'Customer Support Bot',
    status: 'Active',
    progress: '90%',
    agents: '2',
    lastActive: 'Just now',
  },
];

const usageData = [
  { name: 'Mon', GPT4: 140, Claude: 90, Gemini: 70 },
  { name: 'Tue', GPT4: 180, Claude: 100, Gemini: 85 },
  { name: 'Wed', GPT4: 120, Claude: 150, Gemini: 110 },
  { name: 'Thu', GPT4: 200, Claude: 130, Gemini: 90 },
  { name: 'Fri', GPT4: 220, Claude: 170, Gemini: 120 },
  { name: 'Sat', GPT4: 120, Claude: 80, Gemini: 60 },
  { name: 'Sun', GPT4: 90, Claude: 50, Gemini: 40 },
];

const alertsData = [
  {
    title: 'High token usage alert',
    description: 'GPT-4 usage is 85% of your monthly quota',
    time: '30 minutes ago',
    type: 'warning',
  },
  {
    title: 'Workflow error',
    description: 'Failed to connect to external API in data analysis workflow',
    time: '2 hours ago',
    type: 'error',
  },
  {
    title: 'New team member added',
    description: 'Alex Johnson joined the workspace',
    time: '1 day ago',
    type: 'info',
  },
];

const statusColors = {
  'Active': 'bg-green-100 text-green-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Paused': 'bg-amber-100 text-amber-700',
  'Archived': 'bg-gray-100 text-gray-700',
};

const alertColors = {
  'warning': 'bg-amber-100 text-amber-700',
  'error': 'bg-red-100 text-red-700',
  'info': 'bg-blue-100 text-blue-700',
};

const DashboardHome = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to CrewHub! Here's what's happening.</p>
        </div>
        <Button>Create New Project</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Model Usage</CardTitle>
            <CardDescription>Token usage across models for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usageData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="GPT4" fill="#3b82f6" name="GPT-4" />
                <Bar dataKey="Claude" fill="#7e22ce" name="Claude" />
                <Bar dataKey="Gemini" fill="#22c55e" name="Gemini" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alertsData.map((alert, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${alertColors[alert.type as keyof typeof alertColors]}`}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Alerts</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Your currently running projects and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Project Name</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Progress</th>
                    <th className="text-left py-3 px-4 font-medium">Agents</th>
                    <th className="text-left py-3 px-4 font-medium">Last Active</th>
                    <th className="text-left py-3 px-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {projectData.map((project, index) => (
                    <tr key={index} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-4">{project.name}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                          {project.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: project.progress }}
                          ></div>
                        </div>
                        <div className="text-xs text-right mt-1">{project.progress}</div>
                      </td>
                      <td className="py-3 px-4">{project.agents}</td>
                      <td className="py-3 px-4">{project.lastActive}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline">View All Projects</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
