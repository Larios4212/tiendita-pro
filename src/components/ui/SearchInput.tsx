import { Search, X } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Buscar...', className = '' }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-surface-700/60 bg-surface-800/80 py-2.5 pl-9 pr-9 text-sm text-white placeholder-surface-500 outline-none transition focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
