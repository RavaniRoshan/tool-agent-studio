
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Workflow, Package, Users, BarChart, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 hero-gradient text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              The Collaborative Platform for AI Agent Orchestration
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 animate-fade-up">
              Assemble, configure, and manage teams of specialized AI models and tools to tackle complex projects efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for AI Orchestration
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              CrewHub provides all the tools you need to build, manage, and scale your AI workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Bot className="h-8 w-8" />,
                title: "AI Agent Management",
                description: "Integrate and manage major AI models with detailed configuration options and performance metrics."
              },
              {
                icon: <Package className="h-8 w-8" />,
                title: "Tool Integration",
                description: "Access a comprehensive catalog of tools and connect them to your AI workflows with ease."
              },
              {
                icon: <Workflow className="h-8 w-8" />,
                title: "Visual Workflow Builder",
                description: "Create complex AI workflows with an intuitive drag-and-drop interface and conditional logic."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Team Collaboration",
                description: "Work together in real-time with version control, commenting, and shared workspaces."
              },
              {
                icon: <BarChart className="h-8 w-8" />,
                title: "Advanced Analytics",
                description: "Track performance, costs, and usage statistics across your AI models and workflows."
              },
              {
                icon: <Code className="h-8 w-8" />,
                title: "Developer API",
                description: "Integrate CrewHub with your existing systems through our comprehensive API."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md card-hover">
                <div className="p-2 bg-blue-50 rounded-lg inline-block mb-4">
                  <div className="text-blue-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works Section */}
      <section className="py-16 bg-gray-50" id="solutions">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How CrewHub Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform streamlines the process of working with AI, from setup to execution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "Create Your Workspace",
                description: "Set up projects, invite team members, and configure your workspace settings."
              },
              {
                number: "02",
                title: "Build Your AI Crew",
                description: "Select and configure AI agents and tools from our extensive catalog."
              },
              {
                number: "03",
                title: "Design Workflows",
                description: "Create visual workflows connecting agents and tools to solve complex problems."
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-blue-100">{step.number}</div>
                <h3 className="text-xl font-semibold mt-2">{step.title}</h3>
                <p className="mt-2 text-gray-600">{step.description}</p>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-24 border-t-2 border-dashed border-blue-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform How Your Team Works with AI?
            </h2>
            <p className="text-lg mb-8 text-blue-100">
              Join the growing community of teams using CrewHub to unlock the full potential of AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                  Get Started for Free
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
