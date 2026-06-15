import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  required?: boolean;
}

export function CustomSelect({ options, value, onChange, placeholder, required }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-bg-panel border text-left p-3 text-xs uppercase tracking-wider focus:outline-none rounded-none flex items-center justify-between font-sans transition-colors ${isOpen ? 'border-brand-green' : 'border-stone-gray'} ${value ? 'text-text-primary' : 'text-text-secondary'}`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-brand-green' : 'text-text-secondary'}`} />
      </button>
      
      {/* Required hidden input to satisfy form validation if needed */}
      {required && (
         <input type="text" required value={value} onChange={() => {}} className="absolute opacity-0 w-full h-full pointer-events-none -z-10" tabIndex={-1} />
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-bg-panel border border-stone-gray shadow-xl max-h-60 overflow-y-auto custom-scrollbar">
          {options.map((option) => (
            <div
              key={option}
              className={`p-3 text-xs uppercase tracking-wider cursor-pointer hover:bg-bg-panel transition-colors flex items-center justify-between ${value === option ? 'text-brand-green font-bold bg-bg-panel/50' : 'text-text-primary'}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              <span className="truncate">{option}</span>
              {value === option && <Check className="w-3 h-3" />}
            </div>
          ))}
          {options.length === 0 && (
             <div className="p-3 text-xs uppercase tracking-wider text-text-secondary italic">Tidak ada opsi tersedia</div>
          )}
        </div>
      )}
    </div>
  );
}
