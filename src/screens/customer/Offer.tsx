import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Offer() {
  const [state, setState] = useMergeState({ offer: 1800 });
  const v = (() => {
    const cur = { list: 2000, left: 2 };
    const fmt = (n: number) => '$' + n.toLocaleString('en-US');
    const min = Math.round(cur.list * 0.5 / 50) * 50;
    const max = Math.round(cur.list * 1.1 / 50) * 50;
    const offer = Math.min(max, Math.max(min, state.offer));
    const pos = (v: number) => ((v - min) / (max - min)) * 100;
    const ratio = offer / cur.list;
    const p = Math.max(5, Math.min(97, Math.round(((ratio - 0.55) / 0.45) * 100)));
    const chance = ratio >= 0.88 ? 'Most likely to land' : ratio >= 0.75 ? 'Good chance — expect a counter' : 'Long shot';
    return {
      min: min, max: max, offer: offer,
      minLabel: fmt(min), maxLabel: fmt(max),
      offerLabel: fmt(offer), listLabel: fmt(cur.list),
      saveLabel: fmt(Math.max(0, cur.list - offer)),
      sweetLeft: pos(cur.list * 0.88) + '%',
      sweetWidth: (pos(cur.list) - pos(cur.list * 0.88)) + '%',
      fill: pos(offer) + '%',
      slide: (e: React.ChangeEvent<HTMLInputElement>) => setState({ offer: Number(e.target.value) }),
      pct: p + '%',
      ring: ratio >= 0.88 ? '#C8FF3D' : ratio >= 0.75 ? '#FFFFFF' : '#5E5D58',
      chance: chance,
      left: cur.left
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 0", display: "flex", alignItems: "center", gap: "12px" }}>
    <Link to="/club" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
    <div style={{ display: "flex", flexDirection: "column" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>44 Toronto</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>To Maya R. · Sat Nov 28 · 6 guests</span></div>
  </div>

  <div style={{ flex: "1", padding: "20px 20px 0", display: "flex", flexDirection: "column", gap: "18px" }}>
    <h1 style={{ margin: "0", font: "700 34px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>Slide to offer.</h1>

    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 10px 10px 10px", borderRadius: "20px", background: "#111111", color: "#FFFFFF" }}>
      <span style={{ width: "60px", height: "44px", borderRadius: "14px", background: "#C8FF3D", color: "#111111", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px", flexShrink: "0" }}><span style={{ font: "700 13px Archivo, sans-serif" }}>V2</span><span style={{ font: "500 10px 'Instrument Sans', sans-serif" }}>$2K</span></span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>Main VIP · V2</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Front of the dance floor · up to 10</span></span>
      <Link to="/club" style={{ height: "36px", padding: "0 14px", borderRadius: "999px", background: "#2A2A28", display: "flex", alignItems: "center", font: "600 12px 'Instrument Sans', sans-serif" }}>Change</Link>
    </div>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", paddingTop: "6px" }}>
      <span style={{ font: "800 64px/1 Archivo, sans-serif", letterSpacing: "-0.055em" }}>{v.offerLabel}</span>
      <span style={{ font: "400 14px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>List {v.listLabel} · you save {v.saveLabel}</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ position: "relative", height: "22px" }}>
        <span style={{ position: "absolute", left: v.sweetLeft, width: v.sweetWidth, textAlign: "center", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Most likely to land</span>
      </div>
      <div style={{ position: "relative", height: "56px", borderRadius: "999px", background: "#F3F2EE" }}>
        <div style={{ position: "absolute", top: "0", bottom: "0", left: v.sweetLeft, width: v.sweetWidth, background: "#C8FF3D" }}></div>
        <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", width: v.fill, borderRadius: "999px 0 0 999px", background: "rgba(17,17,17,0.08)" }}></div>
        <label style={{ position: "absolute", inset: "0" }}>
          <span style={{ position: "absolute", left: "-9999px" }}>Offer amount</span>
          <input className="bslide" type="range" min={v.min} max={v.max} step="50" value={v.offer} onChange={v.slide} />
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}><span>{v.minLabel}</span><span>{v.maxLabel}</span></div>
    </div>

    <div style={{ padding: "16px", borderRadius: "22px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "16px" }}>
      <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: `5px solid ${v.ring}`, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", font: "700 17px Archivo, sans-serif" }}>{v.pct}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <span style={{ font: "600 16px 'Instrument Sans', sans-serif" }}>{v.chance}</span>
        <span style={{ font: "400 13px/1.35 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Maya replies in ~5 min · {v.left} left tonight</span>
      </div>
    </div>
  </div>

  <div style={{ padding: "14px 20px 30px" }}>
    <Link to="/chat" style={{ height: "56px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "600 16px 'Instrument Sans', sans-serif" }}>Send {v.offerLabel} to Maya</Link>
  </div>
</div>
  );
}
