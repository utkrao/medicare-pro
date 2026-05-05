import './LineChart.css';

interface Point {
  label: string;
  value: number;
}

interface LineChartProps {
  data: Point[];
  height?: number;
  color?: string;
}

export const LineChart = ({ data, height = 200, color = 'var(--accent)' }: LineChartProps) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((d.value - min) / range) * 100;
    return x + ',' + y;
  }).join(' ');

  return (
    <div className="line-chart" style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="line-chart__svg">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = 100 - ((d.value - min) / range) * 100;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="3"
              fill={color}
              className="line-chart__dot"
            />
          );
        })}
      </svg>
      <div className="line-chart__labels">
        {data.map((d, i) => (
          <span key={i} className="line-chart__label">{d.label}</span>
        ))}
      </div>
    </div>
  );
};
