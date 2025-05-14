
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Database, Code } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'data' | 'api' | 'utility';
  tags: string[];
  imageUrl: string;
  popularity: number;
}

const sampleTools: Tool[] = [
  {
    id: 't1',
    name: 'Database Connector',
    description: 'Connect to various database systems and execute queries',
    category: 'data',
    tags: ['database', 'sql', 'storage'],
    imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Database',
    popularity: 87
  },
  {
    id: 't2',
    name: 'API Gateway',
    description: 'Make requests to external APIs and transform responses',
    category: 'api',
    tags: ['api', 'http', 'rest'],
    imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=API',
    popularity: 92
  },
  {
    id: 't3',
    name: 'Text Processor',
    description: 'Process and analyze text data with NLP capabilities',
    category: 'utility',
    tags: ['nlp', 'text', 'analysis'],
    imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Text',
    popularity: 78
  },
  {
    id: 't4',
    name: 'Image Analyzer',
    description: 'Extract information and insights from images',
    category: 'utility',
    tags: ['image', 'vision', 'analysis'],
    imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Image',
    popularity: 74
  },
  {
    id: 't5',
    name: 'Data Transformer',
    description: 'Transform data between different formats and schemas',
    category: 'data',
    tags: ['etl', 'transform', 'data'],
    imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=ETL',
    popularity: 82
  },
  {
    id: 't6',
    name: 'Authentication Service',
    description: 'Manage authentication with various identity providers',
    category: 'api',
    tags: ['auth', 'identity', 'security'],
    imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Auth',
    popularity: 89
  },
];

const ToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredTools = sampleTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'data': return <Database className="h-4 w-4" />;
      case 'api': return <Code className="h-4 w-4" />;
      case 'utility': return <Package className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tool Catalog</h1>
          <p className="text-muted-foreground">
            Explore and integrate tools for your workflows
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search tools..." 
              className="pl-8" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs 
            defaultValue="all" 
            className="w-full sm:w-auto"
            value={activeCategory}
            onValueChange={setActiveCategory}
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="utility">Utility</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map(tool => (
            <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-full">
                <AspectRatio ratio={2/1}>
                  <img 
                    src={tool.imageUrl} 
                    alt={tool.name}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <div className="flex items-center">
                    {getCategoryIcon(tool.category)}
                  </div>
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Popularity: {tool.popularity}%
                  </div>
                  <button className="text-xs text-blue-600 hover:underline">
                    Add to workflow
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-1">No tools found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;
