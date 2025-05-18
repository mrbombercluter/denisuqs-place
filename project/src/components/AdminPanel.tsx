import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { X, Lock, User, Ban, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface VisitData {
  id: string;
  ip: string;
  user_agent: string;
  created_at: string;
}

interface ClickData {
  id: string;
  button_name: string;
  ip: string;
  created_at: string;
  count: number;
}

interface BlacklistedIP {
  ip: string;
  created_at: string;
  created_by: string;
}

interface AdminLogin {
  ip: string;
  last_login: string;
}

export const AdminPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [visits, setVisits] = useState<VisitData[]>([]);
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [blacklistedIPs, setBlacklistedIPs] = useState<BlacklistedIP[]>([]);
  const [adminIPs, setAdminIPs] = useState<AdminLogin[]>([]);
  const [currentIP, setCurrentIP] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'ADMIN' && password === 'J7#qM9@kL2') {
      setIsAuthenticated(true);
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data?.ip;
        
        if (ip) {
          setCurrentIP(ip);
          await supabase.from('admin_logins').upsert(
            { ip, last_login: new Date().toISOString() },
            { onConflict: 'ip' }
          );
        }
      } catch (error) {
        console.error('Error tracking admin login:', error);
      }
      fetchData();
    } else {
      toast.error('Invalid credentials');
    }
  };

  const fetchData = async () => {
    try {
      const [
        { data: visitsData },
        { data: clicksData },
        { data: blacklistData },
        { data: adminData }
      ] = await Promise.all([
        supabase.from('visits').select('*').order('created_at', { ascending: false }),
        supabase.from('clicks').select('*').order('created_at', { ascending: false }),
        supabase.from('blacklisted_ips').select('*'),
        supabase.from('admin_logins').select('*')
      ]);

      if (visitsData) setVisits(visitsData);
      if (clicksData) setClicks(clicksData);
      if (blacklistData) setBlacklistedIPs(blacklistData);
      if (adminData) setAdminIPs(adminData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };

  const handleBlacklist = async (ip: string) => {
    try {
      const isBlacklisted = blacklistedIPs.some(item => item.ip === ip);
      
      if (isBlacklisted) {
        await supabase.from('blacklisted_ips').delete().eq('ip', ip);
        toast.success(`Removed ${ip} from blacklist`);
      } else {
        await supabase.from('blacklisted_ips').insert({
          ip,
          created_by: currentIP
        });
        toast.success(`Added ${ip} to blacklist`);
      }
      
      fetchData();
    } catch (error) {
      console.error('Error updating blacklist:', error);
      toast.error('Failed to update blacklist');
    }
  };

  const isIPAdmin = (ip: string) => {
    return adminIPs.some(admin => admin.ip === ip);
  };

  const isIPBlacklisted = (ip: string) => {
    return blacklistedIPs.some(item => item.ip === ip);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="bg-gray-900 p-8 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-cyan-500/20">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
            Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <User size={16} />
                Username:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <Lock size={16} />
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Recent Visits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4">IP Address</th>
                      <th className="py-2 px-4">User Agent</th>
                      <th className="py-2 px-4">Timestamp</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visits.map((visit) => (
                      <tr key={visit.id} className="border-b border-gray-800">
                        <td className={`py-2 px-4 ${isIPAdmin(visit.ip) ? 'text-yellow-300' : 'text-gray-300'}`}>
                          {visit.ip}
                          {isIPAdmin(visit.ip) && ' - ADMIN'}
                        </td>
                        <td className="py-2 px-4 text-gray-300">{visit.user_agent}</td>
                        <td className="py-2 px-4 text-gray-300">
                          {new Date(visit.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleBlacklist(visit.ip)}
                            className={`flex items-center gap-2 ${
                              isIPBlacklisted(visit.ip)
                                ? 'text-green-400 hover:text-green-300'
                                : 'text-red-400 hover:text-red-300'
                            } transition-colors`}
                          >
                            {isIPBlacklisted(visit.ip) ? (
                              <>
                                <CheckCircle size={16} />
                                Unblock
                              </>
                            ) : (
                              <>
                                <Ban size={16} />
                                Block
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Button Clicks</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 px-4">Button</th>
                      <th className="py-2 px-4">IP Address</th>
                      <th className="py-2 px-4">Click Count</th>
                      <th className="py-2 px-4">Last Clicked</th>
                      <th className="py-2 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clicks.map((click) => (
                      <tr key={click.id} className="border-b border-gray-800">
                        <td className="py-2 px-4 text-gray-300">{click.button_name}</td>
                        <td className={`py-2 px-4 ${isIPAdmin(click.ip) ? 'text-yellow-300' : 'text-gray-300'}`}>
                          {click.ip}
                          {isIPAdmin(click.ip) && ' - ADMIN'}
                        </td>
                        <td className="py-2 px-4 text-gray-300">{click.count}</td>
                        <td className="py-2 px-4 text-gray-300">
                          {new Date(click.created_at).toLocaleString()}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleBlacklist(click.ip)}
                            className={`flex items-center gap-2 ${
                              isIPBlacklisted(click.ip)
                                ? 'text-green-400 hover:text-green-300'
                                : 'text-red-400 hover:text-red-300'
                            } transition-colors`}
                          >
                            {isIPBlacklisted(click.ip) ? (
                              <>
                                <CheckCircle size={16} />
                                Unblock
                              </>
                            ) : (
                              <>
                                <Ban size={16} />
                                Block
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};