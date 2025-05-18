import React, { useCallback } from 'react';
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface ConfigCardProps {
  title: string;
  icon: ReactNode;
  description: string;
  url: string;
  colorClass: string;
}

export const ConfigCard = ({ title, icon, description, url, colorClass }: ConfigCardProps) => {
  const trackClick = useCallback(async () => {
    try {
      const { data: { ip } } = await fetch('https://api.ipify.org?format=json').then(res => res.json());
      
      await supabase.from('clicks').upsert(
        {
          button_name: title,
          ip,
          count: 1
        },
        {
          onConflict: 'button_name,ip',
          ignoreDuplicates: false
        }
      );
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  }, [title]);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
      onClick={trackClick}
    >
      <div className="relative overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-500 h-full transform hover:-translate-y-2">
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm rounded-xl"></div>
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${colorClass}`} style={{ filter: 'blur(1px)' }}></div>
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="bg-gray-800/50 rounded-full p-4 w-fit mb-4">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {title}
          </h3>
          <p className="text-gray-300 mb-6 flex-grow">
            {description}
          </p>
          <div className={`flex items-center text-sm font-medium bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`}>
            <span>Explore Now</span>
            <ArrowRight size={16} className={`ml-1 transition-transform duration-300 group-hover:translate-x-1 bg-gradient-to-r ${colorClass} bg-clip-text text-transparent`} />
          </div>
        </div>
      </div>
    </a>
  );
};