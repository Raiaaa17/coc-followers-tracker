import { useMemo } from "react";

interface SparklineProps {
  data: number[];
  trend: number;
  width?: number;
  height?: number;
}

export function Sparkline({
  data,
  trend,
  width = 80,
  height = 24,
}: SparklineProps) {
  const pathData = useMemo(() => {
    if (data.length < 2) return "";

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    if (range === 0) {
      const y = height / 2;
      return `M 0 ${y} L ${width} ${y}`;
    }

    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x} ${y}`;
    });

    return `M ${points.join(" L ")}`;
  }, [data, width, height]);

  const strokeColor = trend >= 0 ? "rgb(34 197 94)" : "rgb(239 68 68)";

  return (
    <svg width={width} height={height} className="overflow-visible">
      <path
        d={pathData}
        stroke={strokeColor}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
