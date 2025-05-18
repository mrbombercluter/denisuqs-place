import React from 'react';
import { ConfigCard } from './ConfigCard';
import { Database, CloudOff, Zap, MessageSquare, MessageCircle, Users } from 'lucide-react';

export const ConfigButtons = () => {
  const configs = [
    {
      id: 1,
      title: 'Community Spread',
      icon: <Database className="w-10 h-10 text-cyan-400 group-hover:text-white transition-colors duration-300" />,
      description: 'Our flagship configuration with optimal spread settings for elite gameplay',
      url: 'https://fatality.win/resources/💎denisuqs-community-config-👑best-config-on-market🔥special-sale🔥.5510/',
      color: 'from-blue-500 to-cyan-400',
    },
    {
      id: 2,
      title: 'Community NoSpread',
      icon: <CloudOff className="w-10 h-10 text-purple-400 group-hover:text-white transition-colors duration-300" />,
      description: 'Enhanced precision with zero spread for the ultimate competitive edge',
      url: 'https://fatality.win/resources/💎denisuqs-nospread-config-👑always-on-top👑-lifetime-updates💎.7922/',
      color: 'from-purple-500 to-pink-400',
    },
    {
      id: 3,
      title: 'Semirage Config',
      icon: <Zap className="w-10 h-10 text-pink-400 group-hover:text-white transition-colors duration-300" />,
      description: 'Balanced semi-rage configuration for optimal performance',
      url: 'https://fatality.win/resources/💎denisuqs-nospread-config-👑always-on-top👑-lifetime-updates💎.7922/',
      color: 'from-red-500 to-orange-400',
    },
    {
      id: 4,
      title: 'Config Thread',
      icon: <MessageSquare className="w-10 h-10 text-green-400 group-hover:text-white transition-colors duration-300" />,
      description: 'Join the discussion about our premium configurations',
      url: 'https://fatality.win/threads/paid-cs2-💎denisuqs-community-config-👑best-config-on-market👑-lifetime-updates-24-7-support-fast-delivery💎🔖65-discount🔖.17246/',
      color: 'from-green-500 to-emerald-400',
    },
    {
      id: 5,
      title: 'Discord',
      icon: <MessageCircle className="w-10 h-10 text-blue-400 group-hover:text-white transition-colors duration-300" />,
      description: 'Join our Discord community for support and updates',
      url: 'https://discord.gg/denisuqcom',
      color: 'from-blue-600 to-indigo-400',
    },
  ];

  return (
    <section id="configs" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 relative inline-block mx-auto">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Premium Configurations
        </span>
        <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-purple-600"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {configs.map((config) => (
          <ConfigCard
            key={config.id}
            title={config.title}
            icon={config.icon}
            description={config.description}
            url={config.url}
            colorClass={config.color}
          />
        ))}
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <div className="relative pb-[56.25%] h-0 rounded-xl overflow-hidden shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/XPWJrGYlkmI?autoplay=1&mute=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-xl"
          ></iframe>
        </div>
      </div>
    </section>
  );
};