import { Store, DollarSign } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' };
const textSizes = { sm: 'text-lg', md: 'text-xl', lg: 'text-3xl' };
const iconSizes = { sm: 16, md: 20, lg: 28 };

export default function Logo({ size = 'md', withText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${sizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25`}>
        <Store size={iconSizes[size]} className="text-white" strokeWidth={2.5} />
        <DollarSign size={iconSizes[size] * 0.45} className="absolute -right-0.5 -top-0.5 text-accent-400" strokeWidth={3} />
      </div>
      {withText && (
        <span className={`${textSizes[size]} font-display font-bold tracking-tight`}>
          <span className="text-white">Tiendita</span>
          <span className="primary-gradient-text">Pro</span>
        </span>
      )}
    </div>
  );
}
