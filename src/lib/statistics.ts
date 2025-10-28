import type { Statistics, FrequencyDistribution, FrequencyClass } from '@/types/stats';

export function calculateStatistics(numbers: number[]): Statistics {
  if (numbers.length === 0) {
    return {
      mean: 0,
      median: 0,
      mode: null,
      range: 0,
      stdDev: 0,
      variance: 0,
      min: 0,
      max: 0,
      count: 0,
    };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const count = numbers.length;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  const mean = sum / count;

  // Median
  let median: number;
  if (count % 2 === 0) {
    median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
  } else {
    median = sorted[Math.floor(count / 2)];
  }

  // Mode
  const frequencyMap: Record<number, number> = {};
  numbers.forEach(num => {
    frequencyMap[num] = (frequencyMap[num] || 0) + 1;
  });
  const maxFrequency = Math.max(...Object.values(frequencyMap));
  const modes = Object.keys(frequencyMap)
    .filter(key => frequencyMap[Number(key)] === maxFrequency)
    .map(Number);
  const mode = maxFrequency > 1 ? modes[0] : null;

  // Range
  const min = sorted[0];
  const max = sorted[count - 1];
  const range = max - min;

  // Variance and Standard Deviation
  const variance = numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);

  return {
    mean: parseFloat(mean.toFixed(2)),
    median: parseFloat(median.toFixed(2)),
    mode,
    range: parseFloat(range.toFixed(2)),
    stdDev: parseFloat(stdDev.toFixed(2)),
    variance: parseFloat(variance.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    max: parseFloat(max.toFixed(2)),
    count,
  };
}

export function createFrequencyDistribution(
  numbers: number[],
  classWidth: number
): FrequencyDistribution {
  if (numbers.length === 0) {
    return { classes: [], totalFrequency: 0 };
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  
  // Adjust starting point to make cleaner intervals
  const startPoint = Math.floor(min / classWidth) * classWidth;
  
  // Calculate number of classes needed
  const numClasses = Math.ceil((max - startPoint) / classWidth);
  
  const classes: FrequencyClass[] = [];
  
  for (let i = 0; i < numClasses; i++) {
    const lowerBound = startPoint + (i * classWidth);
    const upperBound = lowerBound + classWidth;
    const midpoint = (lowerBound + upperBound) / 2;
    
    // Count frequency for this class
    const frequency = numbers.filter(
      num => num >= lowerBound && (i === numClasses - 1 ? num <= upperBound : num < upperBound)
    ).length;
    
    classes.push({
      lowerBound: parseFloat(lowerBound.toFixed(2)),
      upperBound: parseFloat(upperBound.toFixed(2)),
      midpoint: parseFloat(midpoint.toFixed(2)),
      frequency,
      cumulativeFrequency: 0,
      relativeFrequency: 0,
    });
  }

  // Calculate cumulative and relative frequencies
  let cumulative = 0;
  const totalFrequency = numbers.length;
  
  classes.forEach(cls => {
    cumulative += cls.frequency;
    cls.cumulativeFrequency = cumulative;
    cls.relativeFrequency = parseFloat((cls.frequency / totalFrequency * 100).toFixed(2));
  });

  return { classes, totalFrequency };
}
