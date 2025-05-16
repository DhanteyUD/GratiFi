// src/components/SolChart.tsx
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: { widget: new (...args: unknown[]) => unknown };
  }
}

export default function SolChart() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const createWidget = () => {
      if (!containerRef.current || !window.TradingView) return;

      // clear out any old widget
      containerRef.current.innerHTML = "";

      new window.TradingView.widget({
        autosize: true,
        symbol: "BINANCE:SOLUSDT",
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
      // script already loaded by another instance
      createWidget();
    } else {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = createWidget;
      containerRef.current.appendChild(script);
    }

    // cleanup on unmount
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, []);

  return (
    <div
      id="sol_usd_chart"
      ref={containerRef}
      // give it a real height, otherwise 0px!
      style={{ width: "100%", height: "400px" }}
    />
  );
}
