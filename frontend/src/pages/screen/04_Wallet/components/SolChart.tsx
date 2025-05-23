import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: { widget: new (...args: unknown[]) => unknown };
  }
}

interface SolChartProps {
  symbol: string;
  theme: string;
}

export default function SolChart({ symbol = "BINANCE:SOLUSDT", theme }: SolChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const CONTAINER_ID = "sol_usd_chart";

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const createWidget = () => {
      if (!window.TradingView || !document.getElementById(CONTAINER_ID)) return;

      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval: "15",
        timezone: "Etc/UTC",
        theme,
        container_id: CONTAINER_ID,
        toolbar_bg: theme === "dark" ? "#1A1A1D" : "#f1f3f6",
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        hotlist: true,
        calendar: true,
      });
    };

    if (window.TradingView) {
      createWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = createWidget;
      document.head.appendChild(script);
    }

    return () => {
      const container = document.getElementById(CONTAINER_ID);
      if (container) container.innerHTML = "";
    };
  }, [symbol, theme]);

  return (
    <div
      id={CONTAINER_ID}
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
