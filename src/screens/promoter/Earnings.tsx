import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Earnings() {
  const [state, setState] = useMergeState({ copied: false });
  const v = (() => {
    const n = 11;
    const qr = [];
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const corner = (cx: number, cy: number) => x >= cx && x < cx + 3 && y >= cy && y < cy + 3;
      const on = corner(0, 0) || corner(8, 0) || corner(0, 8) ? !(x % 8 === 1 && y % 8 === 1) : ((x * 5 + y * 3 + x * y) % 4) < 2;
      qr.push(on ? '#111111' : '#FFFFFF');
    }
    return { qr: qr, copyLabel: state.copied ? 'Copied ✓' : 'Copy link', copy: () => setState({ copied: true }) };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 20px", background: "#111111", color: "#FFFFFF", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Jordan K. · November</span>
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 46px/1 Archivo, sans-serif", letterSpacing: "-0.05em" }}>$2,140</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>commission earned this month · 10% of table spend</span></div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: "16px", background: "#2A2A28" }}>
      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>Next payout · $420</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Fri Nov 27 to bank ••• 4417</span></span>
      <span style={{ height: "26px", padding: "0 10px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif" }}>Scheduled</span>
    </div>
  </div>

  <div style={{ flex: "1", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", gap: "14px", alignItems: "center" }}>
      <div style={{ width: "76px", height: "76px", padding: "6px", boxSizing: "border-box", borderRadius: "12px", border: "1px solid #E4E2DC", display: "grid", gridTemplateColumns: "repeat(11, minmax(0, 1fr))", flexShrink: "0" }} role="img" aria-label="QR code for Jordan's booking link">
        {v.qr.map((c, cIdx) => (
              <Fragment key={cIdx}><span style={{ background: c, aspectRatio: "1" }}></span></Fragment>
              ))}
      </div>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ font: "700 16px Archivo, sans-serif" }}>Your booking link</span>
        <span style={{ font: "500 13px 'Instrument Sans', sans-serif" }}>booth.to/jordan</span>
        <span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>38 bookings came from your link · always credited to you</span>
      </div>
    </div>
    <div style={{ display: "flex", gap: "8px" }}>
      <button onClick={v.copy} style={{ flex: "1", height: "44px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 13px 'Instrument Sans', sans-serif", cursor: "pointer" }}>{v.copyLabel}</button>
      <button style={{ flex: "1", height: "44px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", color: "#111111", font: "600 13px 'Instrument Sans', sans-serif" }}>Share to Instagram</button>
    </div>

    <div style={{ borderRadius: "22px", background: "#FFFFFF", padding: "6px 14px", display: "flex", flexDirection: "column" }}>
      <span style={{ padding: "10px 0 4px", font: "700 15px Archivo, sans-serif" }}>Recent tables</span>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span><span style={{ fontWeight: "600" }}>Main VIP 2</span> · Nov 28 · via your link</span><span style={{ fontWeight: "600" }}>+$185</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span><span style={{ fontWeight: "600" }}>Booth 1</span> · Nov 28</span><span style={{ fontWeight: "600" }}>+$90</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span><span style={{ fontWeight: "600" }}>Toybox booth</span> · Nov 21</span><span style={{ fontWeight: "600" }}>+$65</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", font: "400 14px 'Instrument Sans', sans-serif" }}><span><span style={{ fontWeight: "600" }}>DJ side</span> · Nov 14 · no-show</span><span style={{ color: "#5E5D58" }}>$0</span></div>
    </div>
  </div>

  <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "84px", paddingBottom: "18px", boxSizing: "border-box", borderTop: "1px solid #E4E2DC", background: "#FFFFFF" }}>
    <Link to="/promoter/app" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M13 3 4 14h7l-1 7 9-11h-7z" /></svg>Requests</Link>
    <Link to="/promoter/app/guests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4 1.5 4.5 4" /></svg>Guests</Link>
    <Link to="/promoter/app/chats" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16v10H8l-4 4z" /></svg>Chats</Link>
    <Link to="/promoter/app/earnings" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "600 11px 'Instrument Sans', sans-serif", color: "#111111", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v18M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7" /></svg>Earnings</Link>
  </nav>
</div>
  );
}
