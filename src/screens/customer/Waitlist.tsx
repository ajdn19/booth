import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Waitlist() {
  const [state, setState] = useMergeState({ joined: false, size: 6, types: { booth: true, vip: true } as Record<string, boolean> });
  const v = (() => {
    const types = [['booth', 'Booth'], ['vip', 'Main VIP'], ['dj', 'DJ side']];
    const t = state.types;
    return {
      joining: !state.joined,
      joined: state.joined,
      types: types.map(([id, label]) => {
        const on = !!t[id];
        return { label: label, pressed: on ? true : false, border: on ? '1.5px solid #111111' : '1px solid #D9D6CC', bg: on ? '#111111' : '#FFFFFF', fg: on ? '#FFFFFF' : '#111111', toggle: () => setState({ types: Object.assign({}, t, { [id]: !on }) }) };
      }),
      size: state.size,
      less: () => setState({ size: Math.max(1, state.size - 1) }),
      more: () => setState({ size: Math.min(12, state.size + 1) }),
      ctaLabel: state.joined ? 'Leave waitlist' : 'Notify me when a table opens',
      join: () => setState({ joined: !state.joined })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 20px", background: "#111111", color: "#FFFFFF", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <Link to="/" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
    <span style={{ alignSelf: "flex-start", height: "26px", padding: "0 10px", borderRadius: "999px", background: "#2A2A28", display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em" }}>SOLD OUT · SAT NOV 28</span>
    <span style={{ font: "800 32px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>Rebel is fully<br />booked.</span>
    <span style={{ font: "400 14px/1.4 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Tables open up when groups cancel or don't cover their deposit. Get first dibs.</span>
  </div>

  <div style={{ flex: "1", padding: "18px 16px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
    {v.joining ? (
          <>
      <div style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "14px" }}>
        <span style={{ font: "700 17px Archivo, sans-serif" }}>What would you take?</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {v.types.map((t, tIdx) => (
                <Fragment key={tIdx}>
            <button onClick={t.toggle} aria-pressed={t.pressed} style={{ height: "40px", padding: "0 14px", borderRadius: "999px", border: t.border, background: t.bg, color: t.fg, font: "600 13px 'Instrument Sans', sans-serif", cursor: "pointer" }}>{t.label}</button>
          </Fragment>
                ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>Party size</span>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={v.less} aria-label="Fewer guests" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #E4E2DC", background: "#FFFFFF", font: "500 18px 'Instrument Sans', sans-serif", color: "#111111" }}>−</button>
            <span style={{ font: "700 17px Archivo, sans-serif" }}>{v.size}</span>
            <button onClick={v.more} aria-label="More guests" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "0", background: "#111111", color: "#FFFFFF", font: "500 18px 'Instrument Sans', sans-serif" }}>+</button>
          </div>
        </div>
      </div>
    </>
          ) : null}
    {v.joined ? (
          <>
      <div className="bpop" style={{ padding: "18px", borderRadius: "22px", background: "#FFFFFF", border: "2px solid #111111", display: "flex", alignItems: "center", gap: "14px" }}>
        <span style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#C8FF3D", display: "flex", alignItems: "center", justifyContent: "center", font: "800 20px Archivo, sans-serif" }}>#3</span>
        <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>You're 3rd in line</span><span style={{ font: "400 13px/1.35 'Instrument Sans', sans-serif", color: "#5E5D58" }}>We'll push you the moment a matching table opens. You'll have 15 min to claim it.</span></span>
      </div>
    </>
          ) : null}

    <span style={{ font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58", padding: "0 4px" }}>Tables still open on Sat Nov 28</span>
    <Link to="/club" style={{ padding: "14px", borderRadius: "20px", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "800 11px Archivo, sans-serif" }}>44</span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>44 Toronto</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>King West · 3 tables left</span></span>
      <span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>$900+</span>
    </Link>
    <Link to="/club" style={{ padding: "14px", borderRadius: "20px", background: "#FFFFFF", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#5B5A55", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "800 10px Archivo, sans-serif" }}>TOYBOX</span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>Toybox</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>King West · 4 tables left</span></span>
      <span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>$700+</span>
    </Link>
  </div>

  <div style={{ padding: "12px 20px 28px" }}>
    <button onClick={v.join} style={{ width: "100%", height: "56px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 16px 'Instrument Sans', sans-serif", cursor: "pointer" }}>{v.ctaLabel}</button>
  </div>
</div>
  );
}
