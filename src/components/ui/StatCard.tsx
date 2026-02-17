import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useAnimatedCounter } from '@/hooks';

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  format?: (v: number) => string;
  accent?: string;
  trend?: { value: number; positive: boolean };
}

export default function StatCard({ label, value, icon: Icon, format, accent = 'text-primary-400', trend }: StatCardProps) {
  const animated = useAnimatedCounter(value);
  const display = format ? format(animated) : animated.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass group relative overflow-hidden rounded-2xl p-5"
    >
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-500/10 blur-2xl transition-all duration-500 group-hover:bg-primary-500/20" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-surface-400">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{display}</p>
          {trend && (
            <span className={`mt-1 inline-flex items-center text-xs font-medium ${trend.positive ? 'text-primary-400' : 'text-danger-400'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-surface-700/80 ${accent}`}>
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
}
