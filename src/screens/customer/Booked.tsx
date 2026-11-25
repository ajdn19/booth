import { Link } from 'react-router';

export default function Booked() {

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#111111", color: "#FFFFFF", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div aria-hidden="true" style={{ position: "absolute", inset: "0", pointerEvents: "none" }}>
    <span className="bfall" style={{ position: "absolute", left: "40px", top: "90px", width: "10px", height: "18px", borderRadius: "3px", background: "#C8FF3D", transform: "rotate(20deg)" }}></span>
    <span className="bfall" style={{ position: "absolute", left: "300px", top: "120px", width: "8px", height: "8px", borderRadius: "50%", background: "#FFFFFF", animationDelay: ".2s" }}></span>
    <span className="bfall" style={{ position: "absolute", left: "340px", top: "230px", width: "12px", height: "6px", borderRadius: "3px", background: "#C8FF3D", transform: "rotate(-30deg)", animationDelay: ".35s" }}></span>
    <span className="bfall" style={{ position: "absolute", left: "70px", top: "260px", width: "6px", height: "14px", borderRadius: "3px", background: "#5B5A55", transform: "rotate(45deg)", animationDelay: ".1s" }}></span>
    <span className="bfall" style={{ position: "absolute", left: "190px", top: "70px", width: "9px", height: "9px", borderRadius: "2px", background: "#C8FF3D", transform: "rotate(12deg)", animationDelay: ".5s" }}></span>
    <span className="bfall" style={{ position: "absolute", left: "250px", top: "300px", width: "7px", height: "7px", borderRadius: "50%", background: "#CFCDC6", animationDelay: ".25s" }}></span>
  </div>

  <div style={{ flex: "1", padding: "120px 28px 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "18px" }}>
    <span className="bpop" style={{ width: "112px", height: "112px", borderRadius: "50%", background: "#C8FF3D", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg></span>
    <h1 style={{ margin: "0", font: "800 44px/0.95 Archivo, sans-serif", letterSpacing: "-0.05em" }}>You're in.</h1>
    <span style={{ font: "400 16px/1.45 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>44 Toronto · V2 Main VIP<br />Saturday, Nov 28 · arrive by 11:30pm</span>
    <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
      <span style={{ padding: "12px 16px", borderRadius: "18px", background: "#2A2A28", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}><span style={{ font: "800 26px Archivo, sans-serif" }}>3</span><span style={{ font: "500 11px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>days</span></span>
      <span style={{ padding: "12px 16px", borderRadius: "18px", background: "#2A2A28", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}><span style={{ font: "800 26px Archivo, sans-serif" }}>6</span><span style={{ font: "500 11px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>guests</span></span>
      <span style={{ padding: "12px 16px", borderRadius: "18px", background: "#2A2A28", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}><span style={{ font: "800 26px Archivo, sans-serif" }}>MR</span><span style={{ font: "500 11px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>your host</span></span>
    </div>
  </div>

  <div style={{ padding: "0 20px 30px", display: "flex", flexDirection: "column", gap: "10px" }}>
    <Link to="/split" style={{ height: "56px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", font: "700 16px 'Instrument Sans', sans-serif" }}>Tell the group &amp; split it</Link>
    <div style={{ display: "flex", gap: "10px" }}>
      <button style={{ flex: "1", height: "52px", borderRadius: "999px", border: "0", background: "#2A2A28", color: "#FFFFFF", font: "600 14px 'Instrument Sans', sans-serif" }}>Add to calendar</button>
      <Link to="/pass" style={{ flex: "1", height: "52px", borderRadius: "999px", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center", font: "600 14px 'Instrument Sans', sans-serif" }}>View pass</Link>
    </div>
  </div>
</div>
  );
}
