import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Users, User } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  team: string;
  createdAt: string;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'Workflow Engine v2.0',
    description: 'Next generation workflow engine with improved performance',
    team: 'Core Development',
    createdAt: '2025-05-01T14:20:00Z',
    tasks: [
      {
        id: '1',
        title: 'Refactor state management',
        description: 'Implement Redux for global state management',
        status: 'in-progress',
        assignee: 'Alex Johnson',
        priority: 'high',
        createdAt: '2025-05-10T09:15:00Z'
      },
      {
        id: '2',
        title: 'Add drag-and-drop functionality',
        description: 'Implement drag and drop for workflow nodes',
        status: 'todo',
        priority: 'medium',
        createdAt: '2025-05-11T11:30:00Z'
      },
      {
        id: '3',
        title: 'Optimize rendering performance',
        description: 'Reduce render cycles for workflow canvas',
        status: 'done',
        assignee: 'Taylor Smith',
        priority: 'high',
        createdAt: '2025-05-09T14:45:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'LLM Integration',
    description: 'Integrate large language model capabilities',
    team: 'AI Research',
    createdAt: '2025-05-08T10:15:00Z',
    tasks: [
      {
        id: '1',
        title: 'Research API options',
        description: 'Evaluate different LLM APIs for integration',
        status: 'done',
        assignee: 'Morgan Chen',
        priority: 'high',
        createdAt: '2025-05-08T11:00:00Z'
      },
      {
        id: '2',
        title: 'Create model adapter',
        description: 'Build adapter for model API integration',
        status: 'in-progress',
        assignee: 'Morgan Chen',
        priority: 'high',
        createdAt: '2025-05-09T13:20:00Z'
      }
    ]
  }
];

const ProjectBoard = () => {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    team: 'Core Development'
  });
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      team: newProject.team,
      tasks: [],
      createdAt: new Date().toISOString()
    };
    
    setProjects([project, ...projects]);
    setNewProject({ name: '', description: '', team: 'Core Development' });
    setIsCreateDialogOpen(false);
  };

  const handleCreateTask = () => {
    if (!selectedProject) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
      priority: newTask.priority,
      createdAt: new Date().toISOString()
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          tasks: [task, ...project.tasks]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setNewTask({ title: '', description: '', priority: 'medium' });
    setIsTaskDialogOpen(false);
  };

  const getTasksByStatus = (projectId: string, status: Task['status']) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return [];
    
    return project.tasks.filter(task => task.status === status);
  };

  const getPriorityClass = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Projects</h2>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new project</DialogTitle>
              <DialogDescription>
                Set up a new project to track tasks and progress.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project name</Label>
                <Input 
                  id="project-name" 
                  placeholder="e.g. Website Redesign" 
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-description">Description (optional)</Label>
                <Input 
                  id="project-description" 
                  placeholder="Describe your project" 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="project-team">Team</Label>
                <select 
                  id="project-team"
                  className="w-full border border-input rounded-md h-10 px-3 py-2"
                  value={newProject.team}
                  onChange={(e) => setNewProject({...newProject, team: e.target.value})}
                >
                  <option value="Core Development">Core Development</option>
                  <option value="AI Research">AI Research</option>
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateProject} disabled={!newProject.name.trim()}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{project.name}</span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {project.team}
                </span>
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="pb-0">
              <div className="flex justify-between mb-4">
                <h3 className="font-medium">Tasks</h3>
                
                <Dialog open={isTaskDialogOpen && selectedProject?.id === project.id} onOpenChange={(open) => {
                  setIsTaskDialogOpen(open);
                  if (open) setSelectedProject(project);
                }}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create new task</DialogTitle>
                      <DialogDescription>
                        Add a task to {project.name}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="task-title">Task title</Label>
                        <Input 
                          id="task-title" 
                          placeholder="What needs to be done?" 
                          value={newTask.title}
                          onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="task-description">Description</Label>
                        <Input 
                          id="task-description" 
                          placeholder="Add more details" 
                          value={newTask.description}
                          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="task-priority">Priority</Label>
                        <select 
                          id="task-priority"
                          className="w-full border border-input rounded-md h-10 px-3 py-2"
                          value={newTask.priority}
                          onChange={(e) => setNewTask({
                            ...newTask, 
                            priority: e.target.value as 'low' | 'medium' | 'high'
                          })}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsTaskDialogOpen(false)}>Cancel</Button>
                      <Button onClick={handleCreateTask} disabled={!newTask.title.trim()}>Create Task</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Tabs defaultValue="todo" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="todo">To Do</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                  <TabsTrigger value="done">Done</TabsTrigger>
                </TabsList>
                
                {(['todo', 'in-progress', 'review', 'done'] as const).map(status => (
                  <TabsContent key={status} value={status} className="mt-0">
                    <div className="space-y-2 min-h-[200px]">
                      {getTasksByStatus(project.id, status).map(task => (
                        <div 
                          key={task.id} 
                          className="border rounded-md p-3 bg-card hover:border-blue-400 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{task.title}</h4>
                            <span className={`text-xs rounded-full px-2 py-0.5 ${getPriorityClass(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                          {task.assignee && (
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <User className="h-3 w-3 mr-1" />
                              {task.assignee}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {getTasksByStatus(project.id, status).length === 0 && (
                        <div className="border border-dashed rounded-md p-4 flex items-center justify-center">
                          <p className="text-muted-foreground text-sm">No tasks in this column</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectBoard;
