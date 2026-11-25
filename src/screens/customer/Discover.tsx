import { Link } from 'react-router';

export default function Discover() {

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 22px 0", display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#C8FF3D" }}></span></span><span style={{ font: "800 24px Archivo, sans-serif", letterSpacing: "-0.045em" }}>booth</span></div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><button style={{ display: "flex", alignItems: "center", gap: "6px", height: "36px", padding: "0 14px", borderRadius: "999px", border: "1px solid #E4E2DC", background: "#FFFFFF", font: "500 13px 'Instrument Sans', sans-serif", color: "#111111" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
        Toronto
      </button><Link to="/notifications" aria-label="Notifications, 3 new" style={{ position: "relative", width: "36px", height: "36px", borderRadius: "50%", border: "1px solid #E4E2DC", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4" /></svg><span style={{ position: "absolute", top: "4px", right: "5px", width: "8px", height: "8px", borderRadius: "50%", background: "#111111", border: "2px solid #FFFFFF" }}></span></Link></div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "6px", font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#111111" }}></span>Saturday, Nov 28</span>
      <h1 style={{ margin: "0", font: "700 34px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>Tonight in<br />Toronto.</h1>
    </div>
    <label style={{ display: "flex", alignItems: "center", gap: "10px", height: "48px", padding: "0 16px", borderRadius: "16px", background: "#F3F2EE" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E5D58" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      <span style={{ position: "absolute", left: "-9999px" }}>Search</span>
      <input placeholder="Clubs, King West, DJs" style={{ border: "0", background: "transparent", outline: "none", flex: "1", font: "400 15px 'Instrument Sans', sans-serif", color: "#111111" }} />
    </label>
    <div style={{ display: "flex", gap: "8px", overflow: "hidden" }}>
      <Link to="/tonight" style={{ height: "36px", padding: "0 16px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px", font: "600 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C8FF3D" }}></span>Tonight</Link>
      <button style={{ height: "36px", padding: "0 16px", borderRadius: "999px", border: "1px solid #E4E2DC", background: "#FFFFFF", color: "#111111", font: "500 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>King West</button>
      <button style={{ height: "36px", padding: "0 16px", borderRadius: "999px", border: "1px solid #E4E2DC", background: "#FFFFFF", color: "#111111", font: "500 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>Polson Pier</button>
      <button style={{ height: "36px", padding: "0 16px", borderRadius: "999px", border: "1px solid #E4E2DC", background: "#FFFFFF", color: "#111111", font: "500 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>Hip-hop</button>
    </div>
  </div>

  <div style={{ flex: "1", padding: "16px 22px 0", display: "flex", flexDirection: "column", gap: "14px" }}>
    <Link to="/club" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "156px", boxSizing: "border-box", padding: "18px", borderRadius: "28px", background: "#111111", color: "#FFFFFF" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", height: "28px", padding: "0 12px", borderRadius: "999px", background: "#2A2A28", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C8FF3D" }}></span>4 promoters live</span>
        <span style={{ font: "500 13px 'Instrument Sans', sans-serif" }}>★ 4.7</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ font: "800 46px/0.92 Archivo, sans-serif", letterSpacing: "-0.05em" }}>44 TORONTO</div>
        <div style={{ display: "flex", justifyContent: "space-between", font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>
          <span>King West · Fri &amp; Sat</span>
          <span style={{ color: "#FFFFFF", fontWeight: "600" }}>Tables from $900</span>
        </div>
      </div>
    </Link>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
      <h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Biggest rooms in the city</h2>
      <span style={{ font: "500 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>See all</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column" }}>
      <Link to="/waitlist" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "10px 0", borderBottom: "1px solid #EEECE6" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#2A2A28", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "800 12px Archivo, sans-serif" }}>REBEL</div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>Rebel</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Polson Pier · sold out tonight</span></div>
        <span style={{ font: "600 13px 'Instrument Sans', sans-serif", textDecoration: "underline" }}>Waitlist</span>
      </Link>
      <Link to="/club" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "10px 0", borderBottom: "1px solid #EEECE6" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#D9D6CC", color: "#111111", display: "flex", alignItems: "center", justifyContent: "center", font: "800 11px Archivo, sans-serif" }}>TOYBOX</div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>Toybox</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>King West · ★ 4.4</span></div>
        <span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>$700+</span>
      </Link>
      <Link to="/club" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "10px 0" }}>
        <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "#5B5A55", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "800 13px Archivo, sans-serif" }}>EFS</div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>EFS</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>King West · ★ 4.3</span></div>
        <span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>$800+</span>
      </Link>
    </div>
  </div>

  <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "84px", paddingBottom: "18px", boxSizing: "border-box", borderTop: "1px solid #EEECE6", background: "#FFFFFF" }}>
    <Link to="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "600 11px 'Instrument Sans', sans-serif", color: "#111111", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>Discover</Link>
    <Link to="/requests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16v10H8l-4 4z" /></svg>Offers</Link>
    <Link to="/requests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>Bookings</Link>
    <Link to="/profile" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>Profile</Link>
  </nav>
</div>
  );
}
