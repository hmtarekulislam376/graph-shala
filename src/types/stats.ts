export type InputMode = 'raw-data' | 'grouped-frequency';

export type GraphType = 
  | 'frequency-polygon' 
  | 'histogram' 
  | 'ogive' 
  | 'bar-chart' 
  | 'pie-chart';

export interface Statistics {
  mean: number;
  median: number;
  mode: number | null;
  range: number;
  stdDev: number;
  variance: number;
  min: number;
  max: number;
  count: number;
}

export interface FrequencyClass {
  lowerBound: number;
  upperBound: number;
  midpoint: number;
  frequency: number;
  cumulativeFrequency: number;
  relativeFrequency: number;
}

export interface FrequencyDistribution {
  classes: FrequencyClass[];
  totalFrequency: number;
}
