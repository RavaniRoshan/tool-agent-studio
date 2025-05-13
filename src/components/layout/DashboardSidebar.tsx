
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Workflow,
  Package,
  BarChart,
  Settings,
  Plus,
  LogOut,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      name: 'Dashboard', 
      path: '/dashboard' 
    },
    { 
      icon: Users, 
      name: 'Agents', 
      path: '/dashboard/agents' 
    },
    { 
      icon: Package, 
      name: 'Tools', 
      path: '/dashboard/tools' 
    },
    { 
      icon: Workflow, 
      name: 'Workflows', 
      path: '/dashboard/workflows' 
    },
    { 
      icon: BarChart, 
      name: 'Analytics', 
      path: '/dashboard/analytics' 
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      
      <SidebarContent>
        <div className="px-4 mb-4">
          <Button className="w-full flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
        
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild className={isActive(item.path) ? "bg-sidebar-accent text-blue-600" : ""}>
                  <Link to={item.path}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/dashboard/settings">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
