
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RepositoryManager from '@/components/collaboration/RepositoryManager';
import TeamManager from '@/components/collaboration/TeamManager';
import ProjectBoard from '@/components/collaboration/ProjectBoard';

const CollaborationPage = () => {
  const [activeTab, setActiveTab] = useState("repositories");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Collaboration Hub</h1>
        <p className="text-muted-foreground">
          Manage repositories, teams, and projects
        </p>
      </div>

      <Tabs 
        defaultValue="repositories" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="repositories">Repositories</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="repositories" className="mt-6">
          <RepositoryManager />
        </TabsContent>
        
        <TabsContent value="teams" className="mt-6">
          <TeamManager />
        </TabsContent>
        
        <TabsContent value="projects" className="mt-6">
          <ProjectBoard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollaborationPage;
