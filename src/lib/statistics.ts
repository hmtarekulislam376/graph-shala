import type { Statistics, FrequencyDistribution, FrequencyClass } from '@/types/stats';

// Calculate statistics from grouped frequency data
export function calculateGroupedStatistics(distribution: FrequencyDistribution): Statistics {
  if (!distribution.classes || distribution.classes.length === 0) {
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

  const classes = distribution.classes;
  const N = distribution.totalFrequency;

  // Calculate Mean using: Mean = Σ(f × x) / N where x is midpoint
  const meanSum = classes.reduce((sum, cls) => sum + (cls.frequency * cls.midpoint), 0);
  const mean = meanSum / N;

  // Calculate Median using: Median = L + ((N/2 - CF) / f) × h
  const medianPosition = N / 2;
  let medianClass = classes[0];
  for (const cls of classes) {
    if (cls.cumulativeFrequency >= medianPosition) {
      medianClass = cls;
      break;
    }
  }
  const medianClassIndex = classes.indexOf(medianClass);
  const cfBefore = medianClassIndex > 0 ? classes[medianClassIndex - 1].cumulativeFrequency : 0;
  const L = medianClass.lowerBound;
  const f = medianClass.frequency;
  const h = medianClass.upperBound - medianClass.lowerBound;
  const median = L + ((medianPosition - cfBefore) / f) * h;

  // Calculate Mode using: Mode = L + ((f1 - f0) / (2f1 - f0 - f2)) × h
  let modalClass = classes[0];
  let maxFrequency = 0;
  let modalClassIndex = 0;
  classes.forEach((cls, index) => {
    if (cls.frequency > maxFrequency) {
      maxFrequency = cls.frequency;
      modalClass = cls;
      modalClassIndex = index;
    }
  });
  
  const f0 = modalClassIndex > 0 ? classes[modalClassIndex - 1].frequency : 0;
  const f1 = modalClass.frequency;
  const f2 = modalClassIndex < classes.length - 1 ? classes[modalClassIndex + 1].frequency : 0;
  const L_mode = modalClass.lowerBound;
  const h_mode = modalClass.upperBound - modalClass.lowerBound;
  const mode = f1 > f0 && f1 > f2 ? L_mode + ((f1 - f0) / (2 * f1 - f0 - f2)) * h_mode : modalClass.midpoint;

  // Calculate Variance and Standard Deviation
  const varianceSum = classes.reduce((sum, cls) => {
    const deviation = cls.midpoint - mean;
    return sum + (cls.frequency * deviation * deviation);
  }, 0);
  const variance = varianceSum / N;
  const stdDev = Math.sqrt(variance);

  // Range
  const min = classes[0].lowerBound;
  const max = classes[classes.length - 1].upperBound;
  const range = max - min;

  return {
    mean: parseFloat(mean.toFixed(2)),
    median: parseFloat(median.toFixed(2)),
    mode: parseFloat(mode.toFixed(2)),
    range: parseFloat(range.toFixed(2)),
    stdDev: parseFloat(stdDev.toFixed(2)),
    variance: parseFloat(variance.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    max: parseFloat(max.toFixed(2)),
    count: N,
  };
}

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

// Parse grouped frequency data from text input
// Expected format: "61-68: 7" or "61-68, 7" or "61-68 7"
export function parseGroupedFrequencyData(input: string): FrequencyDistribution | null {
  const lines = input.trim().split('\n').filter(line => line.trim());
  if (lines.length === 0) return null;

  const classes: FrequencyClass[] = [];
  let totalFrequency = 0;

  for (const line of lines) {
    // Match patterns like "61-68: 7" or "61-68, 7" or "61-68 7"
    const match = line.match(/(\d+\.?\d*)\s*[-–]\s*(\d+\.?\d*)\s*[,:;]?\s*(\d+)/);
    if (!match) continue;

    const lowerBound = parseFloat(match[1]);
    const upperBound = parseFloat(match[2]);
    const frequency = parseInt(match[3]);

    if (isNaN(lowerBound) || isNaN(upperBound) || isNaN(frequency)) continue;

    const midpoint = (lowerBound + upperBound) / 2;
    totalFrequency += frequency;

    classes.push({
      lowerBound: parseFloat(lowerBound.toFixed(2)),
      upperBound: parseFloat(upperBound.toFixed(2)),
      midpoint: parseFloat(midpoint.toFixed(2)),
      frequency,
      cumulativeFrequency: 0,
      relativeFrequency: 0,
    });
  }

  if (classes.length === 0) return null;

  // Calculate cumulative and relative frequencies
  let cumulative = 0;
  classes.forEach(cls => {
    cumulative += cls.frequency;
    cls.cumulativeFrequency = cumulative;
    cls.relativeFrequency = parseFloat((cls.frequency / totalFrequency * 100).toFixed(2));
  });

  return { classes, totalFrequency };
}
