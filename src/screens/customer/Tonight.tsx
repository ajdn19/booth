import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Tonight() {
  const [state, setState] = useMergeState({ on: true });
  const v = (() => {
    const on = state.on;
    return {
      deals: [
        { club: '44 Toronto', table: 'Booth B4 · up to 6', price: '$675', was: '$900', off: '25% off', ends: '11:30pm' },
        { club: 'EFS', table: 'Booth · up to 6', price: '$600', was: '$800', off: '25% off', ends: '11pm' }
      ],
      checked: on ? true : false, track: on ? '#C8FF3D' : '#5B5A55', knob: on ? '24px' : '4px',
      toggle: () => setState({ on: !on })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#111111", color: "#FFFFFF", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 14px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <span style={{ display: "flex", alignItems: "center", gap: "6px", font: "600 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C8FF3D" }}></span>Sat Nov 28 · 10:14pm</span>
    </div>
    <h1 style={{ margin: "0", font: "800 34px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>Tonight.</h1>
    <span style={{ font: "400 14px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Tables that just opened, and late deals from clubs filling their last spots.</span>
  </div>

  <div style={{ flex: "1", padding: "4px 16px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
    <span style={{ padding: "0 4px", font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", color: "#C8FF3D" }}>JUST OPENED</span>
    <div style={{ padding: "14px", borderRadius: "20px", background: "#FFFFFF", color: "#111111", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#C8FF3D", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4" /></svg></span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>Main VIP opened at Toybox</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>2 min ago · up to 10 · $1,600</span></span>
      <Link to="/club" style={{ height: "36px", padding: "0 14px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", font: "600 12px 'Instrument Sans', sans-serif" }}>Grab it</Link>
    </div>
    <div style={{ padding: "14px", borderRadius: "20px", background: "#2A2A28", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#3A3A36", display: "flex", alignItems: "center", justifyContent: "center", font: "800 11px Archivo, sans-serif" }}>REBEL</span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>Booth opened at Rebel</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>You're #1 on the waitlist · claim in 14:32</span></span>
      <Link to="/waitlist" style={{ height: "36px", padding: "0 14px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", font: "600 12px 'Instrument Sans', sans-serif" }}>Claim</Link>
    </div>

    <span style={{ padding: "8px 4px 0", font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", color: "#C8FF3D" }}>LAST-MINUTE DEALS · AFTER 10PM</span>
    {v.deals.map((d, dIdx) => (
          <Fragment key={dIdx}>
      <div style={{ padding: "14px", borderRadius: "20px", background: "#FFFFFF", color: "#111111", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>{d.club}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{d.table}</span></span>
          <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}><span style={{ font: "800 22px Archivo, sans-serif" }}>{d.price}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58", textDecoration: "line-through" }}>{d.was}</span></span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ height: "26px", padding: "0 10px", borderRadius: "999px", background: "#111111", color: "#C8FF3D", display: "flex", alignItems: "center", font: "700 11px 'Instrument Sans', sans-serif" }}>{d.off} · ends {d.ends}</span>
          <Link to="/checkout" style={{ font: "600 13px 'Instrument Sans', sans-serif", textDecoration: "underline" }}>Book now</Link>
        </div>
      </div>
    </Fragment>
          ))}
  </div>

  <div style={{ padding: "12px 20px 28px" }}>
    <button onClick={v.toggle} role="switch" aria-checked={v.checked} style={{ width: "100%", height: "56px", padding: "0 8px 0 20px", borderRadius: "999px", border: "0", background: "#2A2A28", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "space-between", font: "600 15px 'Instrument Sans', sans-serif", cursor: "pointer" }}>
      <span>Alert me when tables open tonight</span>
      <span style={{ width: "52px", height: "32px", borderRadius: "999px", background: v.track, position: "relative" }}><span style={{ position: "absolute", top: "4px", left: v.knob, width: "24px", height: "24px", borderRadius: "50%", background: "#111111" }}></span></span>
    </button>
  </div>
</div>
  );
}
