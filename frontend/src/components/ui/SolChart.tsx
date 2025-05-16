import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: { widget: new (...args: unknown[]) => unknown };
  }
}
interface SolChartProps {
  symbol: string;
}

export default function SolChart({
  symbol = "BINANCE:SOLUSDT",
}: SolChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !window.TradingView) return;

    const createWidget = () => {
      if (!containerRef.current || !window.TradingView) return;

      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        autosize: true,
        symbol,
        interval: "15",
        timezone: "Etc/UTC",
        theme: "light",
        container_id: containerRef.current.id,
        toolbar_bg: "#f1f3f6",
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
      container.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      id="sol_usd_chart"
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
