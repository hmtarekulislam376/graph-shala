import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Table as TableIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FrequencyDistribution } from '@/types/stats';

interface FrequencyTableProps {
  data: FrequencyDistribution | null;
}

const FrequencyTable = ({ data }: FrequencyTableProps) => {
  if (!data || data.classes.length === 0) return null;

  return (
    <div className="graph-container">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1 flex items-center gap-2">
            <TableIcon className="w-6 h-6 text-primary" />
            Frequency Distribution Table
          </h2>
          <p className="text-sm font-bengali text-muted-foreground">গণসংখ্যা নিবেশন সারণি</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-2 hover:bg-secondary/10 hover:text-secondary hover:border-secondary"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-primary/10 to-accent/10">
              <TableHead className="font-bold text-foreground">
                Class Interval
                <div className="text-xs font-normal font-bengali text-muted-foreground">শ্রেণী ব্যবধান</div>
              </TableHead>
              <TableHead className="font-bold text-foreground text-center">
                Midpoint
                <div className="text-xs font-normal font-bengali text-muted-foreground">মধ্যবিন্দু</div>
              </TableHead>
              <TableHead className="font-bold text-foreground text-center">
                Frequency
                <div className="text-xs font-normal font-bengali text-muted-foreground">গণসংখ্যা</div>
              </TableHead>
              <TableHead className="font-bold text-foreground text-center">
                Cumulative Frequency
                <div className="text-xs font-normal font-bengali text-muted-foreground">ক্রমযুক্ত গণসংখ্যা</div>
              </TableHead>
              <TableHead className="font-bold text-foreground text-center">
                Relative Frequency (%)
                <div className="text-xs font-normal font-bengali text-muted-foreground">আপেক্ষিক গণসংখ্যা</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.classes.map((cls, index) => (
              <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                <TableCell className="font-medium">
                  {cls.lowerBound} - {cls.upperBound}
                </TableCell>
                <TableCell className="text-center">{cls.midpoint}</TableCell>
                <TableCell className="text-center font-semibold text-primary">
                  {cls.frequency}
                </TableCell>
                <TableCell className="text-center font-semibold text-secondary">
                  {cls.cumulativeFrequency}
                </TableCell>
                <TableCell className="text-center">{cls.relativeFrequency}%</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-muted/50 font-bold">
              <TableCell colSpan={2} className="text-right">Total</TableCell>
              <TableCell className="text-center text-primary">{data.totalFrequency}</TableCell>
              <TableCell className="text-center text-secondary">{data.totalFrequency}</TableCell>
              <TableCell className="text-center">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FrequencyTable;
