import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const ADVICE = [
  "Pay the bill before the electricity decides to pay you back.",
  "Your balance is more stable than our predictions.",
  "Please charge your phone before checking your balance.",
  "Electricity: available until further notice.",
  "Financial accuracy is approximately 12%.",
];

const FAILURES = [
  "The Oracle predicted that you shouldn't pay today.",
  "Payment rejected: the transformer is on a tea break.",
  "Your money arrived, but the voltage did not.",
  "Bank says yes. Oracle says absolutely not.",
  "Transaction cancelled due to unscheduled cosmic load shedding.",
  "We lost your payment somewhere near a substation.",
];

export const Route = createFileRoute("/balance")({
  head: () => ({
    meta: [
      { title: "Power Balance Details — KSEB Power Cut Oracle" },
      {
        name: "description",
        content:
          "A completely fictional electricity account: demo balance, invented usage figures and Oracle financial advice.",
      },
      {
        property: "og:title",
        content: "Power Balance Details — KSEB Power Cut Oracle",
      },
      {
        property: "og:description",
        content: "Your completely fictional electricity account. All data is made up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Balance,
});

function Balance() {
  const [advice, setAdvice] = useState(ADVICE[0]!);
  const [failure, setFailure] = useState(FAILURES[0]!);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setAdvice(ADVICE[Math.floor(Math.random() * ADVICE.length)]!);
  }, []);

  const pay = () => {
    setFailure(FAILURES[Math.floor(Math.random() * FAILURES.length)]!);
    setModal(true);
  };

  const tryAgain = () => {
    let next = failure;
    while (next === failure && FAILURES.length > 1) {
      next = FAILURES[Math.floor(Math.random() * FAILURES.length)]!;
    }
    setFailure(next);
  };

  return (
    <div className="kseb-app kseb-balance">
      <div className="kseb-fx" aria-hidden="true">
        <span className="kseb-fx-grid" />
        <span className="kseb-fx-scan" />
      </div>

      <div className="kseb-balance-wrap">
        <Link to="/oracle" className="kseb-navlink kseb-back">
          ← BACK TO ORACLE
        </Link>

        <h1 className="kseb-balance-title">⚡ POWER BALANCE DETAILS</h1>
        <p className="kseb-balance-sub">
          “Your completely fictional electricity account.”
        </p>

        <section className="kseb-account">
          <div className="kseb-account-head">
            <div>
              <div className="small">CONSUMER STATUS</div>
              <div className="status status--good">
                <span className="dot" aria-hidden="true" />
                <span>ACTIVE</span>
              </div>
            </div>
            <div className="kseb-account-bal">
              <div className="small">ACCOUNT BALANCE</div>
              <div className="kseb-bal-figure">₹ 247.50</div>
            </div>
          </div>

          <dl className="kseb-facts">
            <div>
              <dt>LAST BILL</dt>
              <dd>₹ 1,284.00</dd>
            </div>
            <div>
              <dt>CURRENT MONTH USAGE</dt>
              <dd>218 kWh</dd>
            </div>
            <div>
              <dt>AVERAGE DAILY USAGE</dt>
              <dd>7.2 kWh</dd>
            </div>
            <div>
              <dt>ESTIMATED NEXT BILL</dt>
              <dd>₹ 1,410.00</dd>
            </div>
            <div>
              <dt>NEXT BILLING DATE</dt>
              <dd>30 September 2026</dd>
            </div>
            <div>
              <dt>DATA SOURCE</dt>
              <dd>Pure imagination</dd>
            </div>
          </dl>
        </section>

        <section className="kseb-advice">
          <div className="kicker">ORACLE ADVICE</div>
          <p>“{advice}”</p>
        </section>

        <section className="kseb-status-card">
          <div className="kicker">BALANCE STATUS</div>
          <div className="kseb-bal-figure kseb-bal-warn">₹247.50</div>
          <div className="kseb-meter" aria-hidden="true">
            <span style={{ width: "34%" }} />
          </div>
          <p className="kseb-status-line">
            STATUS: <strong>⚠️ PLEASE PAY SOON</strong>
          </p>
        </section>

        <div className="controls">
          <button type="button" className="btn kseb-pay" onClick={pay}>
            💳 PAY ELECTRICITY BILL
          </button>
          <Link to="/oracle" className="btn kseb-btn-alt">
            ← BACK TO ORACLE
          </Link>
        </div>

        <p className="kseb-disclaimer">
          UNOFFICIAL DEMO • NOT AFFILIATED WITH KSEB • ALL DATA IS FICTIONAL
        </p>
      </div>

      {modal && (
        <div
          className="kseb-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Payment system"
        >
          <div className="kseb-modal">
            <div className="kicker">PAYMENT SYSTEM</div>
            <h2 className="kseb-modal-title">Payment failed.</h2>
            <div className="small">Reason:</div>
            <p className="kseb-modal-reason">“{failure}”</p>
            <div className="kseb-modal-actions">
              <button type="button" className="btn" onClick={tryAgain}>
                TRY AGAIN
              </button>
              <button
                type="button"
                className="btn kseb-btn-alt"
                onClick={() => setModal(false)}
              >
                GO BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
