import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FrequencyDistribution } from '@/types/stats';
import type { GraphType } from '@/types/stats';

interface GraphDisplayProps {
  frequencyData: FrequencyDistribution | null;
  graphType: GraphType;
  numbers: number[];
}

const GraphDisplay = ({ frequencyData, graphType, numbers }: GraphDisplayProps) => {
  if (!frequencyData || frequencyData.classes.length === 0) {
    return (
      <div className="graph-container text-center py-12">
        <p className="text-muted-foreground">No data to display</p>
      </div>
    );
  }

  const chartData = frequencyData.classes.map((cls) => ({
    class: `${cls.lowerBound}-${cls.upperBound}`,
    frequency: cls.frequency,
    cumulative: cls.cumulativeFrequency,
    midpoint: cls.midpoint,
  }));

  const getGraphTitle = () => {
    switch (graphType) {
      case 'frequency-polygon':
        return { en: 'Frequency Polygon', bn: 'গণসংখ্যা বহুভুজ' };
      case 'histogram':
        return { en: 'Histogram', bn: 'স্তম্ভলেখ' };
      case 'ogive':
        return { en: 'Ogive Curve (Cumulative Frequency)', bn: 'অজিভ রেখা' };
      default:
        return { en: 'Graph', bn: 'গ্রাফ' };
    }
  };

  const title = getGraphTitle();

  const renderGraph = () => {
    switch (graphType) {
      case 'frequency-polygon':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(239 84% 59%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(239 84% 59%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis
                dataKey="class"
                stroke="hsl(240 10% 10%)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="hsl(240 10% 10%)"
                style={{ fontSize: '12px' }}
                label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid hsl(220 13% 91%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(240 10% 10% / 0.08)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="frequency"
                stroke="hsl(239 84% 59%)"
                fill="url(#colorFreq)"
                strokeWidth={3}
                name="Frequency (গণসংখ্যা)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'histogram':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(271 76% 53%)" />
                  <stop offset="100%" stopColor="hsl(271 76% 43%)" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis
                dataKey="class"
                stroke="hsl(240 10% 10%)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="hsl(240 10% 10%)"
                style={{ fontSize: '12px' }}
                label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid hsl(220 13% 91%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(240 10% 10% / 0.08)',
                }}
              />
              <Legend />
              <Bar
                dataKey="frequency"
                fill="url(#barGradient)"
                radius={[8, 8, 0, 0]}
                name="Frequency (গণসংখ্যা)"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'ogive':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
              <XAxis
                dataKey="class"
                stroke="hsl(240 10% 10%)"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="hsl(240 10% 10%)"
                style={{ fontSize: '12px' }}
                label={{ value: 'Cumulative Frequency', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid hsl(220 13% 91%)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px hsl(240 10% 10% / 0.08)',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="hsl(160 84% 39%)"
                strokeWidth={3}
                dot={{ fill: 'hsl(160 84% 39%)', r: 5 }}
                name="Cumulative Frequency (ক্রমযুক্ত গণসংখ্যা)"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="graph-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{title.en}</h2>
          <p className="text-sm font-bengali text-muted-foreground">{title.bn}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary"
          >
            <Maximize2 className="w-4 h-4" />
            Fullscreen
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Download className="w-4 h-4" />
            Export PNG
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4">
        {renderGraph()}
      </div>

      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Total Data Points:</strong> {numbers.length} • <strong>Number of Classes:</strong> {frequencyData.classes.length}
        </p>
      </div>
    </div>
  );
};

export default GraphDisplay;
