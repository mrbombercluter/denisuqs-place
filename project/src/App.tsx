import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ConfigButtons } from './components/ConfigButtons';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';
import { createClient } from '@supabase/supabase-js';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data?.ip;
        
        if (!ip) {
          console.error('IP address not found in response:', data);
          throw new Error('Failed to get IP address');
        }

        // Check if IP is blacklisted
        const { data: blacklistData } = await supabase
          .from('blacklisted_ips')
          .select('ip')
          .eq('ip', ip)
          .limit(1);

        if (blacklistData && blacklistData.length > 0) {
          setIsBlacklisted(true);
          toast.error('Access denied');
          setIsLoading(false);
          return;
        }
        
        await supabase.from('visits').insert({
          ip,
          user_agent: navigator.userAgent
        });
      } catch (error) {
        console.error('Error tracking visit:', error);
        setError('Failed to initialize tracking');
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();
  }, []);

  // Prevent right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Something went wrong</h1>
          <p className="text-gray-400">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isBlacklisted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Access Denied</h1>
          <p className="text-gray-400">Your IP has been blacklisted</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="animate-pulse text-cyan-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Toaster position="top-right" />
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Hero />
          <ConfigButtons />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;