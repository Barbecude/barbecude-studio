'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminShortcut() {
  const router = useRouter();
  const [keys, setKeys] = useState<string[]>([]);
  const [isPrompting, setIsPrompting] = useState(false);
  const [secret, setSecret] = useState('');

  useEffect(() => {
    const keysDown = new Set<string>();
    let recentKeys: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPrompting) return;
      
      keysDown.add(e.key);
      recentKeys.push(e.key);
      if (recentKeys.length > 2) recentKeys.shift();

      const isSimultaneous = keysDown.has('ArrowUp') && (keysDown.has('u') || keysDown.has('U'));
      const isSequential = recentKeys[0] === 'ArrowUp' && (recentKeys[1] === 'u' || recentKeys[1] === 'U');

      if (isSimultaneous || isSequential) {
        setIsPrompting(true);
        recentKeys = [];
        keysDown.clear();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysDown.delete(e.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPrompting]);

  useEffect(() => {
    if (isPrompting) {
      // Focus on input when prompting
      const el = document.getElementById('secret-admin-input');
      if (el) el.focus();
    }
  }, [isPrompting]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret === '123') {
      router.push('/admin');
    } else {
      alert('Secret code invalid.');
    }
    setSecret('');
    setIsPrompting(false);
  };

  if (!isPrompting) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="minecraft-panel p-8 bg-bg-panel border border-stone-gray animate-fade-in text-center">
        <h2 className="text-xl font-bold tracking-widest text-primary mb-4">Restricted Access</h2>
        <input 
          id="secret-admin-input"
          type="password" 
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder="Enter secret code..."
          className="w-full bg-bg-panel border border-stone-gray text-center text-text-primary p-3 text-lg focus:border-primary focus:outline-none rounded-none tracking-[0.5em] mb-4"
        />
        <div className="flex gap-4">
           <button type="button" onClick={() => setIsPrompting(false)} className="minecraft-btn w-full bg-bg-light text-text-secondary border-0 text-xs tracking-wider py-3 font-bold">Cancel</button>
           <button type="submit" className="minecraft-btn w-full border-0 text-xs tracking-wider py-3 font-bold">Login</button>
        </div>
      </form>
    </div>
  );
}
