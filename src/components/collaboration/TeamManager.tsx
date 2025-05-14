
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, UserPlus, User } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Member' | 'Viewer';
  avatarUrl?: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  createdAt: string;
}

const sampleTeams: Team[] = [
  {
    id: '1',
    name: 'Core Development',
    description: 'Main development team for the workflow engine',
    createdAt: '2025-04-15T09:30:00Z',
    members: [
      { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Owner' },
      { id: '2', name: 'Taylor Smith', email: 'taylor@example.com', role: 'Admin' },
      { id: '3', name: 'Jordan Lee', email: 'jordan@example.com', role: 'Member' },
    ]
  },
  {
    id: '2',
    name: 'AI Research',
    description: 'Team focused on AI integration and research',
    createdAt: '2025-05-01T14:20:00Z',
    members: [
      { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Member' },
      { id: '4', name: 'Morgan Chen', email: 'morgan@example.com', role: 'Owner' },
    ]
  },
];

const TeamManager = () => {
  const [teams, setTeams] = useState<Team[]>(sampleTeams);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
  
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: ''
  });
  
  const [newMember, setNewMember] = useState({
    email: '',
    role: 'Member' as 'Owner' | 'Admin' | 'Member' | 'Viewer'
  });

  const handleCreateTeam = () => {
    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      description: newTeam.description,
      members: [
        { 
          id: '1', 
          name: 'Current User', 
          email: 'user@example.com', 
          role: 'Owner' 
        }
      ],
      createdAt: new Date().toISOString()
    };
    
    setTeams([team, ...teams]);
    setNewTeam({ name: '', description: '' });
    setIsCreateDialogOpen(false);
  };

  const handleInviteMember = () => {
    if (!selectedTeam) return;
    
    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: [
            ...team.members,
            {
              id: Date.now().toString(),
              name: newMember.email.split('@')[0],
              email: newMember.email,
              role: newMember.role
            }
          ]
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    setNewMember({ email: '', role: 'Member' });
    setIsInviteDialogOpen(false);
  };

  const toggleTeamExpand = (teamId: string) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">Teams</h2>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new team</DialogTitle>
              <DialogDescription>
                Create a team to collaborate on projects.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team name</Label>
                <Input 
                  id="team-name" 
                  placeholder="e.g. Frontend Team" 
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="team-description">Description (optional)</Label>
                <Input 
                  id="team-description" 
                  placeholder="Describe your team's purpose" 
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateTeam} disabled={!newTeam.name.trim()}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {teams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <CardHeader className="cursor-pointer" onClick={() => toggleTeamExpand(team.id)}>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{team.name}</span>
                <span className="text-sm text-muted-foreground">
                  {team.members.length} {team.members.length === 1 ? 'member' : 'members'}
                </span>
              </CardTitle>
              <CardDescription>
                {team.description}
              </CardDescription>
            </CardHeader>
            
            {expandedTeamId === team.id && (
              <>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {team.members.map(member => (
                        <TableRow key={member.id}>
                          <TableCell className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {member.name}
                          </TableCell>
                          <TableCell>{member.email}</TableCell>
                          <TableCell>{member.role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                
                <CardFooter className="bg-muted/50 p-3">
                  <Dialog open={isInviteDialogOpen && selectedTeam?.id === team.id} onOpenChange={(open) => {
                    setIsInviteDialogOpen(open);
                    if (open) setSelectedTeam(team);
                  }}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <UserPlus className="h-4 w-4 mr-1" />
                        Invite Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Invite team member</DialogTitle>
                        <DialogDescription>
                          Add a new member to {team.name}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="member-email">Email</Label>
                          <Input 
                            id="member-email" 
                            placeholder="colleague@example.com" 
                            value={newMember.email}
                            onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="member-role">Role</Label>
                          <select 
                            id="member-role"
                            className="w-full border border-input rounded-md h-10 px-3 py-2"
                            value={newMember.role}
                            onChange={(e) => setNewMember({
                              ...newMember, 
                              role: e.target.value as 'Owner' | 'Admin' | 'Member' | 'Viewer'
                            })}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>Cancel</Button>
                        <Button 
                          onClick={handleInviteMember} 
                          disabled={!newMember.email.includes('@')}
                        >
                          Send Invitation
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
