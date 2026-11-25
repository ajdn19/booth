import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Checkout() {
  const [state, setState] = useMergeState({ qty: { gg: 2, dj: 1, mo: 0 } as Record<string, number>, add: { sparkler: true, cake: false, photo: false } as Record<string, boolean>, pay: 'deposit' });
  const v = (() => {
    const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');
    const min = 1850;
    const bottles: [string, string, number][] = [['gg', 'Grey Goose 750ml', 395], ['dj', 'Don Julio 1942', 750], ['mo', 'Moët Impérial', 350]];
    const addons: [string, string, string, number][] = [['sparkler', 'Sparkler show', 'Bottles arrive with sparklers + sign', 75], ['cake', 'Birthday cake', '6-inch cake from the kitchen', 60], ['photo', 'Table photographer', '20 min, photos sent next day', 120]];
    const q = state.qty;
    const a = state.add;
    const bottleSum = bottles.reduce((s, b) => s + q[b[0]] * b[2], 0);
    const addSum = addons.reduce((s, x) => s + (a[x[0]] ? x[3] : 0), 0);
    const table = Math.max(min, bottleSum);
    const tax = (table + addSum) * 0.13;
    const tip = table * 0.18;
    const total = table + addSum + tax + tip + 25;
    const setQ = (id: string, d: number) => setState({ qty: Object.assign({}, q, { [id]: Math.max(0, q[id] + d) }) });
    const pay = state.pay;
    const opts = [
      ['deposit', 'Pay a deposit now', fmt(total * 0.2), 'Locks the table today. The rest, plus anything you add, is charged to your card at close.'],
      ['close', 'Hold my card, pay at close', '$0 now', 'We hold ' + fmt(total * 0.2) + ' on your card. Everything is charged once at the end of the night.']
    ];
    return {
      payOpts: opts.map(([id, title, now, desc]) => ({ title: title, now: now, desc: desc, checked: id === pay ? true : false, border: id === pay ? '2px solid #111111' : '1px solid #E4E2DC', radio: id === pay ? '7px solid #111111' : '1.5px solid #B5B2A8', pick: () => setState({ pay: id }) })),
      payCta: pay === 'deposit' ? 'Pay deposit · ' + fmt(total * 0.2) : 'Hold card · pay at close',
      minPct: Math.min(100, Math.round((bottleSum / min) * 100)) + '%',
      minLabel: bottleSum >= min ? 'Minimum covered by your pre-order' : fmt(bottleSum) + ' pre-ordered · ' + fmt(min - bottleSum) + ' left to spend on the night',
      bottles: bottles.map((b) => ({ name: b[1], price: fmt(b[2]), qty: q[b[0]], less: () => setQ(b[0], -1), more: () => setQ(b[0], 1), lessLabel: 'Remove ' + b[1], moreLabel: 'Add ' + b[1] })),
      addons: addons.map((x) => {
        const on = !!a[x[0]];
        return { name: x[1], desc: x[2], price: '+' + fmt(x[3]), pressed: on ? true : false, border: on ? '2px solid #111111' : '1px solid #E4E2DC', box: on ? '0' : '1.5px solid #B5B2A8', boxBg: on ? '#111111' : '#FFFFFF', tick: on ? '✓' : '', toggle: () => setState({ add: Object.assign({}, a, { [x[0]]: !on }) }) };
      }),
      tableLabel: fmt(table), addonLabel: fmt(addSum), taxLabel: fmt(tax), tipLabel: fmt(tip),
      totalLabel: fmt(total), depositLabel: fmt(total * 0.2)
    };
  })();

  return (
    <div style={{ width: "100%", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
  <div style={{ padding: "52px 20px 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Link to="/chat" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <h1 style={{ margin: "0", font: "800 28px Archivo, sans-serif", letterSpacing: "-0.03em" }}>Checkout</h1>
    </div>
    <div style={{ padding: "14px", borderRadius: "22px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ width: "60px", height: "44px", borderRadius: "14px", background: "#C8FF3D", color: "#111111", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><span style={{ font: "700 13px Archivo, sans-serif" }}>V2</span><span style={{ font: "500 10px 'Instrument Sans', sans-serif" }}>up to 10</span></span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>44 Toronto · Main VIP</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Sat Nov 28 · with Maya R. · agreed $1,850</span></span>
    </div>
  </div>

  <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>Pre-order bottles</h2><Link to="/club" style={{ font: "600 12px 'Instrument Sans', sans-serif", textDecoration: "underline" }}>Full menu</Link></div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ height: "8px", borderRadius: "4px", background: "#EEECE6", overflow: "hidden" }}><div style={{ height: "8px", borderRadius: "4px", background: "#111111", width: v.minPct }}></div></div>
        <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{v.minLabel}</span>
      </div>
      {v.bottles.map((b, bIdx) => (
            <Fragment key={bIdx}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "40px", height: "40px", borderRadius: "12px", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M10 2h4v4l2 3v12a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z" /></svg></span>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{b.name}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{b.price}</span></span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button onClick={b.less} aria-label={b.lessLabel} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #E4E2DC", background: "#FFFFFF", font: "500 18px 'Instrument Sans', sans-serif", color: "#111111" }}>−</button>
            <span style={{ minWidth: "14px", textAlign: "center", font: "700 15px Archivo, sans-serif" }}>{b.qty}</span>
            <button onClick={b.more} aria-label={b.moreLabel} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "0", background: "#111111", font: "500 18px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>+</button>
          </div>
        </div>
      </Fragment>
            ))}
    </section>

    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>Make it a moment</h2>
      {v.addons.map((a, aIdx) => (
            <Fragment key={aIdx}>
        <button onClick={a.toggle} aria-pressed={a.pressed} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "16px", border: a.border, background: "#FFFFFF", textAlign: "left", cursor: "pointer", color: "#111111" }}>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{a.name}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{a.desc}</span></span>
          <span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{a.price}</span>
          <span style={{ width: "22px", height: "22px", borderRadius: "7px", border: a.box, background: a.boxBg, display: "flex", alignItems: "center", justifyContent: "center", font: "700 13px 'Instrument Sans', sans-serif", color: "#C8FF3D" }}>{a.tick}</span>
        </button>
      </Fragment>
            ))}
    </section>

    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "8px", font: "400 14px 'Instrument Sans', sans-serif" }}>
      <h2 style={{ margin: "0 0 4px", font: "700 18px Archivo, sans-serif" }}>What you'll actually pay</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5E5D58" }}>Table minimum (agreed)</span><span>{v.tableLabel}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5E5D58" }}>Add-ons</span><span>{v.addonLabel}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5E5D58" }}>HST 13%</span><span>{v.taxLabel}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5E5D58" }}>Gratuity 18%</span><span>{v.tipLabel}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#5E5D58" }}>Booth booking fee</span><span>$25</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #EEECE6", font: "800 22px Archivo, sans-serif" }}><span>Total</span><span>{v.totalLabel}</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 12px", borderRadius: "14px", background: "#C8FF3D", font: "600 14px 'Instrument Sans', sans-serif" }}><span>Deposit due today (20%)</span><span>{v.depositLabel}</span></div>
    </section>

    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>Before you pay</h2>
      <div style={{ display: "flex", gap: "10px", font: "400 13px/1.4 'Instrument Sans', sans-serif", color: "#333331" }}><span style={{ fontWeight: "700", color: "#111111" }}>✓</span>Free cancellation until Thu Nov 26, 11:59pm.</div>
      <div style={{ display: "flex", gap: "10px", font: "400 13px/1.4 'Instrument Sans', sans-serif", color: "#333331" }}><span style={{ fontWeight: "700", color: "#111111" }}>✓</span>After that the deposit is non-refundable. Arriving after 12:30am counts as a no-show and the table may be released.</div>
      <div style={{ display: "flex", gap: "10px", font: "400 13px/1.4 'Instrument Sans', sans-serif", color: "#333331" }}><span style={{ fontWeight: "700", color: "#111111" }}>✓</span>Everyone at the table must be 19+ with ID. You're <span style={{ fontWeight: "600", color: "#111111" }}>ID verified</span>.</div>
    </section>
    <section style={{ margin: "14px 0 0", padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>How do you want to pay?</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "16px", background: "#F3F2EE" }}>
        <span style={{ width: "44px", height: "30px", borderRadius: "6px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 10px Archivo, sans-serif" }}>VISA</span>
        <span style={{ flex: "1", display: "flex", flexDirection: "column" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>Card on file · •••• 4417</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Required for every table · covers bottles you add on the night</span></span>
        <Link to="/settings" style={{ font: "600 12px 'Instrument Sans', sans-serif", textDecoration: "underline" }}>Change</Link>
      </div>
      {v.payOpts.map((o, oIdx) => (
            <Fragment key={oIdx}>
        <button onClick={o.pick} role="radio" aria-checked={o.checked} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px", borderRadius: "16px", border: o.border, background: "#FFFFFF", textAlign: "left", cursor: "pointer", color: "#111111" }}>
          <span style={{ width: "22px", height: "22px", borderRadius: "50%", border: o.radio, boxSizing: "border-box", flexShrink: "0", marginTop: "1px" }}></span>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ display: "flex", justifyContent: "space-between", font: "600 14px 'Instrument Sans', sans-serif" }}><span>{o.title}</span><span>{o.now}</span></span><span style={{ font: "400 12px/1.4 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{o.desc}</span></span>
        </button>
      </Fragment>
            ))}
    </section>
  </div>

  <div style={{ padding: "16px 16px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
    <Link to="/split" style={{ height: "56px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "600 16px 'Instrument Sans', sans-serif" }}>Split with your group</Link>
    <Link to="/booked" style={{ height: "52px", borderRadius: "999px", border: "1.5px solid #111111", display: "flex", alignItems: "center", justifyContent: "center", font: "600 15px 'Instrument Sans', sans-serif" }}>{v.payCta}</Link>
  </div>
</div>
  );
}
