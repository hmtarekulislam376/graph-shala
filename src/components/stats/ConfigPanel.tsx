import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings2, BarChart2 } from 'lucide-react';
import type { GraphType } from '@/types/stats';

interface ConfigPanelProps {
  classInterval: number;
  onClassIntervalChange: (value: number) => void;
  graphType: GraphType;
  onGraphTypeChange: (value: GraphType) => void;
}

const ConfigPanel = ({
  classInterval,
  onClassIntervalChange,
  graphType,
  onGraphTypeChange,
}: ConfigPanelProps) => {
  return (
    <div className="input-section h-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2 mb-1">
          <Settings2 className="w-5 h-5 text-primary" />
          Configuration
        </h2>
        <p className="text-sm text-muted-foreground font-bengali">
          সেটিংস
        </p>
      </div>

      <div className="space-y-6">
        {/* Class Interval */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            Class Interval
            <span className="font-bengali text-xs ml-2 text-muted-foreground">(শ্রেণী ব্যবধান)</span>
          </Label>
          <Select
            value={classInterval.toString()}
            onValueChange={(val) => onClassIntervalChange(Number(val))}
          >
            <SelectTrigger className="w-full border-2 focus:border-primary transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            Controls the width of each class interval in the distribution
          </p>
        </div>

        {/* Graph Type */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">
            <BarChart2 className="w-4 h-4 inline mr-1" />
            Graph Type
            <span className="font-bengali text-xs ml-2 text-muted-foreground">(গ্রাফের ধরন)</span>
          </Label>
          <Select
            value={graphType}
            onValueChange={(val) => onGraphTypeChange(val as GraphType)}
          >
            <SelectTrigger className="w-full border-2 focus:border-primary transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frequency-polygon">
                <div className="flex flex-col items-start">
                  <span>Frequency Polygon</span>
                  <span className="text-xs font-bengali text-muted-foreground">গণসংখ্যা বহুভুজ</span>
                </div>
              </SelectItem>
              <SelectItem value="histogram">
                <div className="flex flex-col items-start">
                  <span>Histogram</span>
                  <span className="text-xs font-bengali text-muted-foreground">স্তম্ভলেখ</span>
                </div>
              </SelectItem>
              <SelectItem value="ogive">
                <div className="flex flex-col items-start">
                  <span>Ogive Curve</span>
                  <span className="text-xs font-bengali text-muted-foreground">অজিভ রেখা</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-sm mb-2 text-primary">Quick Guide</h3>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• <strong>Frequency Polygon:</strong> Line graph of frequencies</li>
            <li>• <strong>Histogram:</strong> Bar chart showing distribution</li>
            <li>• <strong>Ogive:</strong> Cumulative frequency curve</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConfigPanel;
