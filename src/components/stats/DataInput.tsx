import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, RefreshCw, Copy, Table2 } from 'lucide-react';
import { toast } from 'sonner';
import type { InputMode } from '@/types/stats';

interface DataInputProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
  mode: InputMode;
  onModeChange: (mode: InputMode) => void;
}

const SAMPLE_RAW_DATA = '78, 85, 92, 68, 73, 89, 95, 71, 84, 88, 76, 91, 69, 82, 87, 93, 75, 80, 86, 79, 90, 72, 83, 94, 77, 81, 85, 70, 88, 92';
const SAMPLE_GROUPED_DATA = `61-68: 7
69-76: 9
77-84: 12
85-92: 8
93-100: 4`;

const DataInput = ({ value, onChange, count, mode, onModeChange }: DataInputProps) => {
  const handleSampleData = () => {
    onChange(mode === 'raw-data' ? SAMPLE_RAW_DATA : SAMPLE_GROUPED_DATA);
    toast.success('Sample data loaded!', {
      description: mode === 'raw-data' ? '30 numbers added' : '5 classes added',
    });
  };

  const handleClear = () => {
    onChange('');
    toast.info('Input cleared');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(value + (value ? '\n' : '') + text);
      toast.success('Data pasted from clipboard');
    } catch (error) {
      toast.error('Failed to paste', {
        description: 'Please check clipboard permissions',
      });
    }
  };

  return (
    <div className="input-section">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileUp className="w-5 h-5 text-primary" />
            Data Input
          </h2>
          <p className="text-sm text-muted-foreground font-bengali mt-1">
            আপনার ডেটা প্রবেশ করান
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-primary">
            {mode === 'raw-data' ? `${count} numbers` : `${count} total frequency`}
          </p>
          <p className="text-xs text-muted-foreground">
            {mode === 'raw-data' ? `${count} টি সংখ্যা` : `${count} মোট গণসংখ্যা`}
          </p>
        </div>
      </div>

      <Tabs value={mode} onValueChange={(v) => onModeChange(v as InputMode)} className="mb-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="raw-data" className="gap-2">
            <FileUp className="w-4 h-4" />
            Raw Data
          </TabsTrigger>
          <TabsTrigger value="grouped-frequency" className="gap-2">
            <Table2 className="w-4 h-4" />
            Grouped Frequency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="raw-data" className="mt-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter numbers separated by comma, space, or new line&#10;Example: 78, 85, 92, 68, 73&#10;or: 78 85 92 68 73&#10;or one number per line"
            className="min-h-[200px] font-mono text-base resize-none border-2 focus:border-primary transition-colors"
          />
        </TabsContent>

        <TabsContent value="grouped-frequency" className="mt-4">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter class intervals with frequencies (one per line)&#10;Format: 61-68: 7&#10;Example:&#10;61-68: 7&#10;69-76: 9&#10;77-84: 12"
            className="min-h-[200px] font-mono text-base resize-none border-2 focus:border-primary transition-colors"
          />
        </TabsContent>
      </Tabs>

      <div className="flex flex-wrap gap-3 mb-4">
        <Button
          onClick={handleSampleData}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>Sample Data</span>
          <span className="font-bengali text-xs">নমুনা তথ্য</span>
        </Button>

        <Button
          onClick={handlePaste}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-primary/5 hover:text-primary hover:border-primary transition-colors"
        >
          <FileUp className="w-4 h-4" />
          <span>Paste</span>
        </Button>

        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          className="flex items-center gap-2 hover:bg-destructive/5 hover:text-destructive hover:border-destructive transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Clear</span>
          <span className="font-bengali text-xs">মুছুন</span>
        </Button>
      </div>

      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-sm text-muted-foreground">
          {mode === 'raw-data' ? (
            <>
              <strong>Tip:</strong> You can paste directly from Excel or enter numbers in any format.
              Supported formats: <code className="bg-background px-1 rounded">78, 85, 92</code> or{' '}
              <code className="bg-background px-1 rounded">78 85 92</code> or one per line.
            </>
          ) : (
            <>
              <strong>Tip:</strong> Enter grouped frequency data with class intervals.
              Format: <code className="bg-background px-1 rounded">61-68: 7</code> where 61-68 is the class interval and 7 is the frequency.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default DataInput;
