import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Profile() {
  const [state, setState] = useMergeState({ tab: 'history' });
  const v = (() => {
    const isHistory = state.tab === 'history';
    const history = [
      { mon: 'NOV', day: '14', club: '44 Toronto', meta: 'Booth B3 · Maya R. · ★★★★★ given', paid: '$800', action: 'Book again' },
      { mon: 'OCT', day: '31', club: 'Rebel', meta: 'Mezzanine · Dev S. · saved $200', paid: '$1,000', action: 'Book again' },
      { mon: 'OCT', day: '17', club: 'Toybox', meta: 'Booth · Jordan K. · not rated', paid: '$650', action: 'Rate night' },
      { mon: 'SEP', day: '27', club: '44 Toronto', meta: 'Main VIP V3 · Maya R. · ★★★★★ given', paid: '$1,900', action: 'Book again' }
    ];
    const on = { bg: '#FFFFFF', sh: '0 2px 8px rgba(0,0,0,0.08)' };
    const off = { bg: 'transparent', sh: 'none' };
    return {
      isHistory: isHistory,
      isFavs: !isHistory,
      history: history.map((h, i) => Object.assign({}, h, { href: h.action === 'Rate night' ? "/rate" : "/club", line: i < history.length - 1 ? '1px solid #EEECE6' : '0' })),
      histBg: isHistory ? on.bg : off.bg, histShadow: isHistory ? on.sh : off.sh,
      favBg: isHistory ? off.bg : on.bg, favShadow: isHistory ? off.sh : on.sh,
      showHistory: () => setState({ tab: 'history' }),
      showFavs: () => setState({ tab: 'favs' })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 20px", background: "#111111", color: "#FFFFFF", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <span style={{ position: "relative", width: "64px", height: "64px", borderRadius: "50%", background: "#5B5A55", display: "flex", alignItems: "center", justifyContent: "center", font: "700 22px Archivo, sans-serif" }}><span>MK</span><span style={{ position: "absolute", right: "-2px", bottom: "-2px", width: "22px", height: "22px", borderRadius: "50%", background: "#C8FF3D", border: "3px solid #111111", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="3.5" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg></span></span>
      <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ font: "700 22px Archivo, sans-serif", letterSpacing: "-0.03em" }}>Max K.</span>
        <span style={{ font: "400 13px &quot", color: "rgb(207, 205, 198)" }}>Toronto · ID verified · since 2025</span>
      </div>
      <Link to="/settings" aria-label="Settings" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg></Link>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
      <div style={{ padding: "10px 12px", borderRadius: "16px", background: "#2A2A28", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 22px Archivo, sans-serif" }}>12</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>nights booked</span></div>
      <div style={{ padding: "10px 12px", borderRadius: "16px", background: "#2A2A28", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 22px Archivo, sans-serif" }}>$1,240</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>saved vs list</span></div>
      <div style={{ padding: "10px 12px", borderRadius: "16px", background: "#C8FF3D", color: "#111111", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 22px Archivo, sans-serif" }}>Regular</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#333331" }}>3 more to VIP</span></div>
    </div>
  </div>

  <div style={{ flex: "1", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
    <Link to="/requests" style={{ padding: "14px", borderRadius: "22px", background: "#FFFFFF", border: "2px solid #111111", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ width: "48px", height: "48px", borderRadius: "14px", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}><span style={{ font: "600 10px 'Instrument Sans', sans-serif", letterSpacing: "0.06em" }}>NOV</span><span style={{ font: "800 18px/1 Archivo, sans-serif" }}>28</span></span>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>44 Toronto · V2 Main VIP</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Upcoming · with Maya R. · $1,850</span></span>
      <span style={{ height: "26px", padding: "0 10px", borderRadius: "999px", background: "#C8FF3D", display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif" }}>Confirmed</span>
    </Link>

    <div style={{ display: "flex", gap: "4px", padding: "4px", borderRadius: "999px", background: "#E4E2DC" }}>
      <button onClick={v.showHistory} style={{ flex: "1", height: "40px", borderRadius: "999px", border: "0", background: v.histBg, boxShadow: v.histShadow, font: "600 13px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>History</button>
      <button onClick={v.showFavs} style={{ flex: "1", height: "40px", borderRadius: "999px", border: "0", background: v.favBg, boxShadow: v.favShadow, font: "600 13px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>Favourites</button>
    </div>

    {v.isHistory ? (
          <>
      <div style={{ borderRadius: "22px", background: "#FFFFFF", padding: "4px 14px", display: "flex", flexDirection: "column" }}>
        {v.history.map((h, hIdx) => (
              <Fragment key={hIdx}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: h.line }}>
            <span style={{ width: "44px", display: "flex", flexDirection: "column", alignItems: "center" }}><span style={{ font: "600 10px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", color: "#5E5D58" }}>{h.mon}</span><span style={{ font: "800 18px/1.1 Archivo, sans-serif" }}>{h.day}</span></span>
            <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{h.club}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{h.meta}</span></span>
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}><span style={{ font: "700 14px 'Instrument Sans', sans-serif" }}>{h.paid}</span><Link to={h.href} style={{ font: "600 12px 'Instrument Sans', sans-serif", textDecoration: "underline" }}>{h.action}</Link></span>
          </div>
        </Fragment>
              ))}
      </div>
    </>
          ) : null}

    {v.isFavs ? (
          <>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58", padding: "0 4px" }}>Your promoters</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <span style={{ flex: "1", padding: "12px", borderRadius: "18px", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5B5A55", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 14px Archivo, sans-serif" }}>MR</span><span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>Maya R.</span><span style={{ font: "400 11px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>44 Toronto · 5×</span></span>
          <span style={{ flex: "1", padding: "12px", borderRadius: "18px", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 14px Archivo, sans-serif" }}>DS</span><span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>Dev S.</span><span style={{ font: "400 11px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Rebel · 2×</span></span>
          <span style={{ flex: "1", padding: "12px", borderRadius: "18px", background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}><span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 14px Archivo, sans-serif" }}>JK</span><span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>Jordan K.</span><span style={{ font: "400 11px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Toybox · 1×</span></span>
        </div>
        <span style={{ font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58", padding: "4px 4px 0" }}>Saved clubs</span>
        <div style={{ borderRadius: "22px", background: "#FFFFFF", padding: "4px 14px", display: "flex", flexDirection: "column" }}>
          <Link to="/club" style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #EEECE6", font: "600 14px 'Instrument Sans', sans-serif" }}><span>44 Toronto</span><span style={{ fontWeight: "400", color: "#5E5D58" }}>King West ›</span></Link>
          <Link to="/club" style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #EEECE6", font: "600 14px 'Instrument Sans', sans-serif" }}><span>Rebel</span><span style={{ fontWeight: "400", color: "#5E5D58" }}>Polson Pier ›</span></Link>
          <Link to="/club" style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", font: "600 14px 'Instrument Sans', sans-serif" }}><span>Toybox</span><span style={{ fontWeight: "400", color: "#5E5D58" }}>King West ›</span></Link>
        </div>
      </div>
    </>
          ) : null}
  </div>

  <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "84px", paddingBottom: "18px", boxSizing: "border-box", borderTop: "1px solid #E4E2DC", background: "#FFFFFF" }}>
    <Link to="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></svg>Discover</Link>
    <Link to="/requests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16v10H8l-4 4z" /></svg>Offers</Link>
    <Link to="/requests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 10h16M9 3v4M15 3v4" /></svg>Bookings</Link>
    <Link to="/profile" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "600 11px 'Instrument Sans', sans-serif", color: "#111111", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>Profile</Link>
  </nav>
</div>
  );
}
