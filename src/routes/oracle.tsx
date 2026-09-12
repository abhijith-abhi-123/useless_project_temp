import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";

const PREDICTIONS = [
  { text: "PROBABLY ON", tone: "good" },
  { text: "MAYBE OFF", tone: "warn" },
  { text: "DEFINITELY UNCERTAIN", tone: "warn" },
  { text: "SCHRÖDINGER'S CURRENT", tone: "good" },
  { text: "LOAD SHEDDING INCOMING", tone: "bad" },
  { text: "TRANSFORMER NAPPING", tone: "warn" },
  { text: "POWER WILL EXIST UNTIL IT DOESN'T", tone: "good" },
  { text: "GRID IS VIBING", tone: "good" },
  { text: "OUTAGE OUTLOOK: CLOUDY", tone: "warn" },
  { text: "KSEB STRUCK", tone: "bad" },
];

const STATUS_VARIANTS = [
  { text: "Probably ON", tone: "good" },
  { text: "Maybe ON", tone: "warn" },
  { text: "Technically live", tone: "good" },
  { text: "Holding on", tone: "warn" },
  { text: "Barely alive", tone: "bad" },
];

const CUT_TIMES = [
  "In 5 minutes. Or 5 hours.",
  "During your next meeting.",
  "When the rain starts.",
  "Between now and later.",
  "Right after you plug in the iron.",
  "During the cricket match.",
  "Whenever KSEB feels like it.",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

/** Short electrical zap using the Web Audio API. */
function playZap(kind: "cut" | "restore") {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sawtooth";
    const t = ctx.currentTime;
    if (kind === "cut") {
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.35);
    } else {
      osc.frequency.setValueAtTime(60, t);
      osc.frequency.exponentialRampToValueAtTime(680, t + 0.3);
    }
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.14, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);
    osc.onended = () => void ctx.close();
  } catch {
    /* audio is optional */
  }
}

function buzz(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* vibration is optional */
  }
}

export const Route = createFileRoute("/oracle")({
  head: () => ({
    meta: [
      { title: "Oracle Dashboard — KSEB Power Cut Oracle" },
      {
        name: "description",
        content:
          "Live-ish grid status, mystery cut timings and invented accuracy figures from the KSEB Power Cut Oracle dashboard.",
      },
      {
        property: "og:title",
        content: "Oracle Dashboard — KSEB Power Cut Oracle",
      },
      {
        property: "og:description",
        content:
          "Will the power stay on? Our advanced prediction system has absolutely no idea.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Oracle,
});

function Oracle() {
  const [prediction, setPrediction] = useState(PREDICTIONS[0]!);
  const [status, setStatus] = useState(STATUS_VARIANTS[0]!);
  const [nextCut, setNextCut] = useState("Somewhere between now and later.");
  const [accuracy, setAccuracy] = useState("87.3%");
  const [voltage, setVoltage] = useState("230V (Nominal)");
  const [blackout, setBlackout] = useState(false);
  const [blackoutMsg, setBlackoutMsg] = useState(false);
  const [surge, setSurge] = useState(false);
  const [predicting, setPredicting] = useState(false);
  const [showBalanceCta, setShowBalanceCta] = useState(false);

  const cutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const surgeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const predictTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const voltTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scheduleBlackout = useCallback(() => {
    if (cutTimer.current) clearTimeout(cutTimer.current);
    cutTimer.current = setTimeout(
      () => {
        setBlackout(true);
        setBlackoutMsg(false);
        playZap("cut");
        buzz([90, 60, 140]);
        if (msgTimer.current) clearTimeout(msgTimer.current);
        msgTimer.current = setTimeout(() => setBlackoutMsg(true), 4000);
      },
      Math.random() * 14000 + 10000
    );
  }, []);

  // Blackout scheduling — Oracle page only, cleaned up on unmount.
  useEffect(() => {
    scheduleBlackout();
    return () => {
      if (cutTimer.current) clearTimeout(cutTimer.current);
      if (msgTimer.current) clearTimeout(msgTimer.current);
      if (surgeTimer.current) clearTimeout(surgeTimer.current);
      if (predictTimer.current) clearTimeout(predictTimer.current);
    };
  }, [scheduleBlackout]);

  // Random voltage fluctuation.
  useEffect(() => {
    voltTimer.current = setInterval(() => {
      if (blackout) return;
      const v = 205 + Math.floor(Math.random() * 45);
      setVoltage(
        `${v}V (${v < 215 ? "Sagging" : v > 238 ? "Surging" : "Nominal"})`
      );
    }, 2600);
    return () => {
      if (voltTimer.current) clearInterval(voltTimer.current);
    };
  }, [blackout]);

  const predict = useCallback(() => {
    if (predicting) return;
    setPredicting(true);
    setShowBalanceCta(false);
    buzz(35);
    if (predictTimer.current) clearTimeout(predictTimer.current);
    predictTimer.current = setTimeout(() => {
      setPrediction(getRandomItem(PREDICTIONS));
      setStatus(getRandomItem(STATUS_VARIANTS));
      setNextCut(getRandomItem(CUT_TIMES));
      setAccuracy((Math.random() * 20 + 75).toFixed(1) + "%");
      setPredicting(false);
      setShowBalanceCta(true);
    }, 900);
  }, [predicting]);

  const recover = useCallback(() => {
    if (!blackout) return;
    if (msgTimer.current) clearTimeout(msgTimer.current);
    setBlackout(false);
    setBlackoutMsg(false);
    setSurge(true);
    playZap("restore");
    buzz([40, 40, 40]);
    if (surgeTimer.current) clearTimeout(surgeTimer.current);
    surgeTimer.current = setTimeout(() => setSurge(false), 600);
    scheduleBlackout();
  }, [blackout, scheduleBlackout]);

  return (
    <div className={`kseb-app${surge ? " power-surge" : ""}`}>
      <div id="app">
        <header>
          <div className="brand">
            <div className="logo" aria-hidden="true">
              ⚡
            </div>
            <div>
              <h1>KSEB POWER CUT ORACLE</h1>
              <p>UNOFFICIAL • COMPLETELY UNRELIABLE</p>
            </div>
          </div>
          <div className="kseb-header-actions">
            <Link to="/" className="kseb-navlink">
              ⌂ HOME
            </Link>
            <span className="badge">LIVE*</span>
          </div>
        </header>

        <main>
          <section className="hero">
            <span className="kicker">POWER FORECAST ENGINE v3.1</span>
            <h2>Will the power stay on?</h2>
            <p className="sub">
              Our advanced prediction system has absolutely no idea. But it
              looks convincing.
            </p>

            <div className="oracle">
              <div className="small">CURRENT ORACLE VERDICT</div>
              {predicting ? (
                <div className="prediction prediction--warn kseb-flicker">
                  CONSULTING TRANSFORMER…
                </div>
              ) : (
                <div className={`prediction prediction--${prediction.tone}`}>
                  {prediction.text}
                </div>
              )}
              <div className="small">
                {predicting
                  ? "Rerouting vibes through the substation…"
                  : "Calculating confidence from vibes…"}
              </div>
            </div>
          </section>

          <section className="grid" aria-label="Grid statistics">
            <article className="card">
              <div className="icon" aria-hidden="true">
                🔌
              </div>
              <h3>Grid Status</h3>
              <div className={`status status--${status.tone}`}>
                <span className="dot" aria-hidden="true" />
                <span>{status.text}</span>
              </div>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">
                🕐
              </div>
              <h3>Next Mystery Cut</h3>
              <p>{nextCut}</p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">
                📊
              </div>
              <h3>Prediction Accuracy</h3>
              <p>
                {accuracy}*
                <br />
                <span className="small">*number invented by the app.</span>
              </p>
            </article>

            <article className="card">
              <div className="icon" aria-hidden="true">
                ⚡
              </div>
              <h3>Voltage Stability</h3>
              <p>{voltage}</p>
            </article>
          </section>

          <div className="controls">
            <button
              className="btn"
              onClick={predict}
              type="button"
              disabled={predicting}
            >
              {predicting ? "🔮 CONSULTING…" : "🔮 PREDICT AGAIN"}
            </button>

            {showBalanceCta && (
              <Link to="/balance" className="btn kseb-btn-alt">
                VIEW BALANCE DETAILS →
              </Link>
            )}
          </div>
        </main>

        <footer>
          NOT AFFILIATED WITH KSEB • FOR ENTERTAINMENT / COLLEGE DEMO PURPOSES
          ONLY
        </footer>
      </div>

      <div
        id="blackout"
        className={blackout ? "dead" : ""}
        onClick={recover}
        role="button"
        aria-label="Power has cut out. Tap anywhere to check the fuse."
        aria-hidden={!blackout}
      >
        {blackoutMsg && (
          <span id="blackoutMsg">
            ⚡ (KSEB struck. Tap anywhere to check the fuse.)
          </span>
        )}
      </div>
    </div>
  );
}
