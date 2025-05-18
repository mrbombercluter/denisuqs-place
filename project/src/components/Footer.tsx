import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Denisuq's Configs. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="text-gray-400 text-sm flex items-center">
              Created with <Heart size={14} className="text-red-500 mx-1" /> for the gaming chair community
            </span>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a 
              href="https://fatality.win/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyan-400 text-sm flex items-center hover:text-cyan-300 transition-colors"
            >
              Visit Fatality.win <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center" id="about">
          <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            About Denisuq's Configs
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Widely recognized as a leader in top-tier configuration solutions, Denisuq has earned a reputation for delivering premium, high-performance setups that set the standard in the market. Backed by a passionate community and ongoing updates, our configurations give you the competitive edge you need to stay ahead.
          </p>
        </div>
      </div>
    </footer>
  );
};