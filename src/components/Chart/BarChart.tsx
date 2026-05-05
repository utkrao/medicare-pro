import './BarChart.css';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  maxValue?: number;
  height?: number;
}

export const BarChart = ({ data, maxValue, height = 200 }: BarChartProps) => {
  const max = maxValue || Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bar-chart" style={{ height }}>
      <div className="bar-chart__bars">
        {data.map((item, i) => (
          <div key={i} className="bar-chart__item">
            <div className="bar-chart__bar-wrapper">
              <div
                className="bar-chart__bar"
                style={{
                  height: String((item.value / max) * 100) + '%',
                  background: item.color || 'var(--accent)',
                }}
              >
                <span className="bar-chart__tooltip">{item.value}</span>
              </div>
            </div>
            <span className="bar-chart__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
