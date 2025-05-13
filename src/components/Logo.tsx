
import React from 'react';
import { Workflow } from 'lucide-react';

interface LogoProps {
  withText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  withText = true, 
  size = 'md',
  className = ''
}) => {
  const iconSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  };
  
  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Workflow className={`text-blue-600 ${iconSize[size]}`} />
      {withText && (
        <span className={`font-bold ${textSize[size]}`}>
          <span className="text-blue-600">Crew</span>
          <span className="text-purple-600">Hub</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
