import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { FileUp, RefreshCw, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface DataInputProps {
  value: string;
  onChange: (value: string) => void;
  count: number;
}

const SAMPLE_DATA = '78, 85, 92, 68, 73, 89, 95, 71, 84, 88, 76, 91, 69, 82, 87, 93, 75, 80, 86, 79, 90, 72, 83, 94, 77, 81, 85, 70, 88, 92';

const DataInput = ({ value, onChange, count }: DataInputProps) => {
  const handleSampleData = () => {
    onChange(SAMPLE_DATA);
    toast.success('Sample data loaded!', {
      description: '30 numbers added for testing',
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
            আপনার সংখ্যা প্রবেশ করান
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-primary">{count} numbers</p>
          <p className="text-xs text-muted-foreground">{count} টি সংখ্যা</p>
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter numbers separated by comma, space, or new line&#10;Example: 78, 85, 92, 68, 73&#10;or: 78 85 92 68 73&#10;or one number per line"
        className="min-h-[200px] font-mono text-base resize-none mb-4 border-2 focus:border-primary transition-colors"
      />

      <div className="flex flex-wrap gap-3">
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

      <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <p className="text-sm text-muted-foreground">
          <strong>Tip:</strong> You can paste directly from Excel or enter numbers in any format.
          Supported formats: <code className="bg-background px-1 rounded">78, 85, 92</code> or{' '}
          <code className="bg-background px-1 rounded">78 85 92</code> or one per line.
        </p>
      </div>
    </div>
  );
};

export default DataInput;
