import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSEB Power Cut Oracle — Unreliable Power Forecasting" },
      {
        name: "description",
        content:
          "A cinematic, completely unofficial power-cut forecasting demo. Enter the Oracle and find out if the lights survive.",
      },
      {
        property: "og:title",
        content: "KSEB Power Cut Oracle — Unreliable Power Forecasting",
      },
      {
        property: "og:description",
        content:
          "The most unreliable power forecasting system. Predicting power cuts with absolutely no idea what we're doing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

const BOOT_LINES = [
  "CONNECTING TO GRID...",
  "CALIBRATING ORACLE...",
  "ERROR: PREDICTION RELIABILITY NOT FOUND",
];

function Home() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);
  const [line, setLine] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const enter = () => {
    if (entering) return;
    setEntering(true);
    setLine(0);
    timers.current.push(setTimeout(() => setLine(1), 550));
    timers.current.push(setTimeout(() => setLine(2), 1100));
    timers.current.push(setTimeout(() => navigate({ to: "/oracle" }), 1750));
  };

  return (
    <div className="kseb-app kseb-home">
      <div className="kseb-fx" aria-hidden="true">
        <span className="kseb-fx-grid" />
        <span className="kseb-fx-glow" />
        <span className="kseb-fx-scan" />
        <span className="kseb-fx-bolt" />
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="kseb-particle"
            style={{
              left: `${(i * 7.3 + 4) % 100}%`,
              animationDelay: `${(i % 7) * 1.4}s`,
              animationDuration: `${9 + (i % 5) * 2.5}s`,
            }}
          />
        ))}
      </div>

      <main className="kseb-home-main">
        <div className="kseb-home-logo" aria-hidden="true">
          ⚡
        </div>
        <h1 className="kseb-home-title">KSEB POWER CUT ORACLE</h1>
        <p className="kseb-home-tag">
          THE MOST UNRELIABLE POWER FORECASTING SYSTEM
        </p>
        <p className="kseb-home-desc">
          “Predicting power cuts with absolutely no idea what we're doing.”
        </p>

        <div className="kseb-online">
          <span className="kseb-online-dot" aria-hidden="true" />
          SYSTEM ONLINE
        </div>

        <button
          type="button"
          className="kseb-enter-btn"
          onClick={enter}
          disabled={entering}
        >
          ENTER THE ORACLE →
        </button>

        <p className="kseb-disclaimer">
          UNOFFICIAL DEMO • NOT AFFILIATED WITH KSEB • ALL DATA IS FICTIONAL
        </p>
      </main>

      {entering && (
        <div className="kseb-boot" role="status" aria-live="polite">
          <div className="kseb-boot-scan" aria-hidden="true" />
          <div className="kseb-boot-lines">
            {BOOT_LINES.slice(0, line + 1).map((l, i) => (
              <p
                key={l}
                className={
                  i === 2 ? "kseb-boot-line kseb-boot-err" : "kseb-boot-line"
                }
              >
                {l}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
