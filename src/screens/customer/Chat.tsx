import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Chat() {
  const [state, setState] = useMergeState({ menu: false });
  const v = (() => {
    return { menuOpen: state.menu, toggleMenu: () => setState({ menu: !state.menu }) };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
  <div style={{ padding: "52px 16px 12px", display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #EEECE6" }}>
    <Link to="/offer" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
    <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5B5A55", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 14px Archivo, sans-serif", flexShrink: "0" }}>MR</span>
    <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ display: "flex", alignItems: "center", gap: "5px", font: "600 15px 'Instrument Sans', sans-serif" }}>Maya R.<svg width="15" height="15" viewBox="0 0 24 24" aria-label="Verified" role="img"><circle cx="12" cy="12" r="10" fill="#111111" /><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#C8FF3D" strokeWidth="2.5" /></svg></span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Verified by 44 Toronto · replies in ~5 min</span></span>
    <button onClick={v.toggleMenu} aria-label="More options" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="#111111" aria-hidden="true"><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg></button>
  </div>

  <div style={{ flex: "1", padding: "12px 16px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 12px", borderRadius: "14px", background: "#F3F2EE" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></svg>
      <span style={{ font: "400 12px/1.35 'Instrument Sans', sans-serif", color: "#333331" }}>Keep chat and payments in Booth. You're covered if anything goes wrong.</span>
    </div>
    <span style={{ alignSelf: "center", height: "28px", padding: "0 12px", borderRadius: "999px", border: "1px solid #E4E2DC", display: "flex", alignItems: "center", font: "500 12px 'Instrument Sans', sans-serif" }}>V2 · Main VIP · Sat Nov 28 · 6 guests</span>

    <div style={{ alignSelf: "flex-end", width: "210px", padding: "12px 14px", borderRadius: "18px 18px 4px 18px", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "2px" }}>
      <span style={{ font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", color: "#CFCDC6" }}>YOUR OFFER</span>
      <span style={{ font: "800 24px Archivo, sans-serif" }}>$1,800</span>
    </div>
    <div style={{ alignSelf: "flex-start", maxWidth: "270px", padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "#F3F2EE", font: "400 14px/1.4 'Instrument Sans', sans-serif" }}>Hey! V2 is a great spot, right on the dance floor. I can do $1,850 with a bottle upgrade and entry before midnight.</div>
    <div style={{ alignSelf: "flex-start", width: "260px", padding: "14px", borderRadius: "20px", border: "2px solid #111111", display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", color: "#5E5D58" }}>OFFER FROM MAYA</span>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ font: "800 26px Archivo, sans-serif" }}>$1,850</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>list $2,000</span></div>
      <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#333331" }}>V2 Main VIP · bottle upgrade · entry before 12</span>
      <div style={{ display: "flex", gap: "6px" }}>
        <Link to="/offer" style={{ flex: "1", height: "40px", borderRadius: "999px", border: "1px solid #D9D6CC", display: "flex", alignItems: "center", justifyContent: "center", font: "600 13px 'Instrument Sans', sans-serif" }}>Counter</Link>
        <Link to="/checkout" style={{ flex: "1", height: "40px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "600 13px 'Instrument Sans', sans-serif" }}>Accept</Link>
      </div>
    </div>
    <div style={{ alignSelf: "flex-end", maxWidth: "240px", padding: "10px 14px", borderRadius: "18px 18px 4px 18px", background: "#111111", color: "#FFFFFF", font: "400 14px/1.4 'Instrument Sans', sans-serif" }}>Could we bring 8 instead of 6?</div>
    <div style={{ alignSelf: "flex-start", maxWidth: "270px", padding: "10px 14px", borderRadius: "18px 18px 18px 4px", background: "#F3F2EE", font: "400 14px/1.4 'Instrument Sans', sans-serif" }}>Yes, V2 fits up to 10. Same price.</div>
  </div>

  <div style={{ padding: "10px 16px 28px", borderTop: "1px solid #EEECE6" }}>
    <label style={{ display: "flex", alignItems: "center", gap: "8px", height: "48px", padding: "0 6px 0 16px", borderRadius: "999px", background: "#F3F2EE" }}>
      <span style={{ position: "absolute", left: "-9999px" }}>Message Maya</span>
      <input placeholder="Message Maya" style={{ flex: "1", border: "0", background: "transparent", outline: "none", font: "400 15px 'Instrument Sans', sans-serif", color: "#111111" }} />
      <button aria-label="Send" style={{ width: "38px", height: "38px", borderRadius: "50%", border: "0", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
    </label>
  </div>

  {v.menuOpen ? (
        <>
    <div style={{ position: "absolute", top: "104px", right: "16px", width: "220px", padding: "6px", borderRadius: "18px", background: "#FFFFFF", boxShadow: "0 12px 36px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column" }}>
      <button style={{ height: "44px", padding: "0 12px", border: "0", borderRadius: "12px", background: "#FFFFFF", textAlign: "left", font: "500 14px 'Instrument Sans', sans-serif", color: "#111111" }}>View Maya's profile</button>
      <button style={{ height: "44px", padding: "0 12px", border: "0", borderRadius: "12px", background: "#FFFFFF", textAlign: "left", font: "500 14px 'Instrument Sans', sans-serif", color: "#111111" }}>Report a problem</button>
      <button style={{ height: "44px", padding: "0 12px", border: "0", borderRadius: "12px", background: "#FFFFFF", textAlign: "left", font: "600 14px 'Instrument Sans', sans-serif", color: "#B3261E" }}>Block Maya</button>
    </div>
  </>
        ) : null}
</div>
  );
}
