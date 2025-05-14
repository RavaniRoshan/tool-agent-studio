
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GitFork, Plus, GitBranch } from 'lucide-react';

interface Repository {
  id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  branches: number;
  lastUpdated: string;
}

const sampleRepositories: Repository[] = [
  {
    id: '1',
    name: 'workflow-engine',
    description: 'Core workflow engine for agent pipelines',
    isPrivate: true,
    branches: 3,
    lastUpdated: '2025-05-12T10:23:45Z'
  },
  {
    id: '2',
    name: 'agent-templates',
    description: 'Collection of reusable agent templates',
    isPrivate: false,
    branches: 2,
    lastUpdated: '2025-05-08T16:42:11Z'
  },
];

const RepositoryManager = () => {
  const [repositories, setRepositories] = useState<Repository[]>(sampleRepositories);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isForkDialogOpen, setIsForkDialogOpen] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  
  const [newRepo, setNewRepo] = useState({
    name: '',
    description: '',
    isPrivate: false
  });

  const handleCreateRepo = () => {
    const newRepository: Repository = {
      id: Date.now().toString(),
      name: newRepo.name,
      description: newRepo.description,
      isPrivate: newRepo.isPrivate,
      branches: 1,
      lastUpdated: new Date().toISOString()
    };
    
    setRepositories([newRepository, ...repositories]);
    setNewRepo({ name: '', description: '', isPrivate: false });
    setIsCreateDialogOpen(false);
  };

  const handleForkRepo = () => {
    if (!selectedRepo) return;
    
    const forkedRepo: Repository = {
      ...selectedRepo,
      id: Date.now().toString(),
      name: `${selectedRepo.name}-fork`,
      lastUpdated: new Date().toISOString()
    };
    
    setRepositories([forkedRepo, ...repositories]);
    setIsForkDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Repositories</h2>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Initialize Repository
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new repository</DialogTitle>
              <DialogDescription>
                Initialize a new repository for your project.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Repository name</Label>
                <Input 
                  id="name" 
                  placeholder="e.g. my-workflow-project" 
                  value={newRepo.name}
                  onChange={(e) => setNewRepo({...newRepo, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input 
                  id="description" 
                  placeholder="Describe your repository" 
                  value={newRepo.description}
                  onChange={(e) => setNewRepo({...newRepo, description: e.target.value})}
                />
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <input 
                  type="checkbox" 
                  id="private" 
                  checked={newRepo.isPrivate}
                  onChange={(e) => setNewRepo({...newRepo, isPrivate: e.target.checked})}
                  className="h-4 w-4"
                />
                <Label htmlFor="private" className="font-normal">Private repository</Label>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateRepo} disabled={!newRepo.name.trim()}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories.map((repo) => (
          <Card key={repo.id} className="hover:border-blue-400 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">{repo.name}</CardTitle>
              <CardDescription>
                Last updated {new Date(repo.lastUpdated).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="mb-2">{repo.description}</p>
              <div className="flex items-center text-sm text-muted-foreground gap-4">
                <span className="flex items-center">
                  <GitBranch className="h-4 w-4 mr-1" />
                  {repo.branches} branches
                </span>
                <span>
                  {repo.isPrivate ? 'Private' : 'Public'}
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                View Code
              </Button>
              
              <Dialog open={isForkDialogOpen && selectedRepo?.id === repo.id} onOpenChange={(open) => {
                setIsForkDialogOpen(open);
                if (open) setSelectedRepo(repo);
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <GitFork className="h-4 w-4 mr-1" />
                    Fork
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Fork repository</DialogTitle>
                    <DialogDescription>
                      Create a personal copy of {repo.name}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <p>This will create a copy of this repository under your account.</p>
                    <p className="text-muted-foreground mt-2">You'll be able to make changes without affecting the original project.</p>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsForkDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleForkRepo}>Create Fork</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RepositoryManager;
