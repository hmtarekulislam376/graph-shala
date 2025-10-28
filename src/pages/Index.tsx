import { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';
import DataInput from '@/components/stats/DataInput';
import ConfigPanel from '@/components/stats/ConfigPanel';
import GraphDisplay from '@/components/stats/GraphDisplay';
import StatsPanel from '@/components/stats/StatsPanel';
import FrequencyTable from '@/components/stats/FrequencyTable';
import { calculateStatistics, createFrequencyDistribution } from '@/lib/statistics';
import type { GraphType } from '@/types/stats';

const Index = () => {
  const [inputData, setInputData] = useState<string>('');
  const [classInterval, setClassInterval] = useState<number>(5);
  const [graphType, setGraphType] = useState<GraphType>('frequency-polygon');

  const numbers = useMemo(() => {
    const cleaned = inputData
      .split(/[,\s\n]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n) && isFinite(n));
    return cleaned;
  }, [inputData]);

  const statistics = useMemo(() => {
    if (numbers.length === 0) return null;
    return calculateStatistics(numbers);
  }, [numbers]);

  const frequencyData = useMemo(() => {
    if (numbers.length === 0) return null;
    return createFrequencyDistribution(numbers, classInterval);
  }, [numbers, classInterval]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Statistics Graph Generator</h1>
                <p className="text-sm text-muted-foreground">পরিসংখ্যান গ্রাফ জেনারেটর</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4" />
              <span>Professional Data Visualization</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Data Input Section */}
          <div className="lg:col-span-2 animate-slide-up">
            <DataInput value={inputData} onChange={setInputData} count={numbers.length} />
          </div>

          {/* Configuration Panel */}
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <ConfigPanel
              classInterval={classInterval}
              onClassIntervalChange={setClassInterval}
              graphType={graphType}
              onGraphTypeChange={setGraphType}
            />
          </div>
        </div>

        {/* Results Section */}
        {numbers.length > 0 && (
          <>
            {/* Statistics Cards */}
            <div className="mb-8 animate-scale-in">
              <StatsPanel statistics={statistics} />
            </div>

            {/* Graph Display */}
            <div className="mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <GraphDisplay
                frequencyData={frequencyData}
                graphType={graphType}
                numbers={numbers}
              />
            </div>

            {/* Frequency Table */}
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <FrequencyTable data={frequencyData} />
            </div>
          </>
        )}

        {/* Empty State */}
        {numbers.length === 0 && (
          <div className="graph-container text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Start Analyzing Your Data</h2>
              <p className="text-muted-foreground mb-2">
                Enter your numbers above to generate beautiful statistics graphs instantly
              </p>
              <p className="text-sm text-muted-foreground font-bengali">
                আপনার সংখ্যা প্রবেশ করান এবং তাৎক্ষণিক গ্রাফ পান
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-white/20 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for students and educators
            </p>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Export graphs as PNG coming soon!
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
