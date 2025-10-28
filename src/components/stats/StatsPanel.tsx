import { TrendingUp, Target, BarChart2, Maximize2, Activity, PieChart } from 'lucide-react';
import type { Statistics } from '@/types/stats';

interface StatsPanelProps {
  statistics: Statistics | null;
}

const StatsPanel = ({ statistics }: StatsPanelProps) => {
  if (!statistics) return null;

  const stats = [
    {
      label: 'Mean',
      labelBn: 'গড়',
      value: statistics.mean,
      icon: TrendingUp,
      color: 'from-primary to-primary-dark',
    },
    {
      label: 'Median',
      labelBn: 'মধ্যক',
      value: statistics.median,
      icon: Target,
      color: 'from-secondary to-emerald-700',
    },
    {
      label: 'Mode',
      labelBn: 'প্রচুরক',
      value: statistics.mode ?? 'None',
      icon: BarChart2,
      color: 'from-accent to-purple-700',
    },
    {
      label: 'Range',
      labelBn: 'পরিসর',
      value: statistics.range,
      icon: Maximize2,
      color: 'from-orange-500 to-orange-700',
    },
    {
      label: 'Std Deviation',
      labelBn: 'পরিমিত ব্যবধান',
      value: statistics.stdDev,
      icon: Activity,
      color: 'from-pink-500 to-pink-700',
    },
    {
      label: 'Count',
      labelBn: 'মোট সংখ্যা',
      value: statistics.count,
      icon: PieChart,
      color: 'from-cyan-500 to-cyan-700',
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <div className="bg-gradient-to-r from-primary to-accent p-2 rounded-lg">
          <BarChart2 className="w-5 h-5 text-white" />
        </div>
        Statistical Measures
        <span className="font-bengali text-base text-muted-foreground ml-2">পরিসংখ্যান</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="stat-card group hover:scale-105"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`bg-gradient-to-br ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {typeof stat.value === 'number' ? stat.value.toFixed(2) : stat.value}
              </div>
              <div className="text-sm font-semibold text-muted-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs font-bengali text-muted-foreground">
                {stat.labelBn}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsPanel;
