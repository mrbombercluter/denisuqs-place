import React from 'react';
import { Shield, Award, Zap } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            Premium Configurations
          </span>{' '}
          <br />
          <span className="text-white relative inline-block mt-1">
            by Denisuq
            <span className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-purple-500"></span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl mx-auto leading-relaxed">
          Experience unmatched performance with the market's leading configurations.
          Precision-engineered for competitive advantage.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
          <div className="flex items-center justify-center space-x-2 text-cyan-300">
            <Shield size={24} className="text-cyan-400" />
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-cyan-300">
            <Award size={24} className="text-cyan-400" />
            <span>Best on Market</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-cyan-300">
            <Zap size={24} className="text-cyan-400" />
            <span>Lifetime Updates</span>
          </div>
        </div>
      </div>
      
      <div className="relative mt-12 mb-8 overflow-hidden mx-auto max-w-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm"></div>
        <div className="relative p-6 text-center">
          <p className="font-medium text-cyan-300 animate-pulse">
            ONLY 20FAT - 4 Paypal - 4 LTC
          </p>
        </div>
      </div>
    </section>
  );
};