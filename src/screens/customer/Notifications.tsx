import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Notifications() {
  const [state, setState] = useMergeState({ tab: 'all' });
  const v = (() => {
    const all = [
      { k: 'night', icon: '1h', title: 'Doors in 1 hour', body: '44 Toronto · side entrance · your ride is booked for 11:15', time: '9:30pm', href: "/night-of", unread: true, hot: true },
      { k: 'chat', icon: 'MR', title: 'Maya replied', body: '"Yes, V2 fits up to 10. Same price."', time: '9:12pm', href: "/chat", unread: true },
      { k: 'deals', icon: '!', title: 'Main VIP opened at Toybox', body: 'Matches your alert · $1,600 · up to 10', time: '8:58pm', href: "/tonight", unread: true, hot: true },
      { k: 'night', icon: '✓', title: 'Your table is locked', body: 'Deposit covered by your group. Passes sent to 6 guests.', time: 'Thu', href: "/pass" },
      { k: 'night', icon: '$', title: 'Raj paid his share', body: '$84.50 · 3 of 6 paid', time: 'Thu', href: "/split" },
      { k: 'deals', icon: '%', title: 'Late deal: 25% off booths at EFS', body: 'Tonight only, until 11pm', time: 'Fri', href: "/tonight" },
      { k: 'chat', icon: 'DS', title: 'Dev S. sent an offer', body: 'Rebel mezzanine · $1,100', time: 'Wed', href: "/requests" }
    ];
    const tab = state.tab;
    const list = tab === 'all' ? all : all.filter((n) => n.k === tab);
    return {
      tabs: [['all', 'All'], ['night', 'My nights'], ['chat', 'Messages'], ['deals', 'Deals']].map(([id, label]) => ({ label: label, border: id === tab ? '1.5px solid #111111' : '1px solid #E4E2DC', bg: id === tab ? '#111111' : '#FFFFFF', fg: id === tab ? '#FFFFFF' : '#111111', pick: () => setState({ tab: id }) })),
      items: list.map((n) => ({ icon: n.icon, title: n.title, body: n.body, time: n.time, href: n.href, iconBg: n.hot ? '#C8FF3D' : '#111111', iconFg: n.hot ? '#111111' : '#FFFFFF', dot: n.unread ? '#111111' : 'transparent' }))
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 12px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Link to="/" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <h1 style={{ flex: "1", margin: "0", font: "800 28px Archivo, sans-serif", letterSpacing: "-0.03em" }}>Notifications</h1>
      <Link to="/settings" aria-label="Notification settings" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#F3F2EE", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></svg></Link>
    </div>
    <div style={{ display: "flex", gap: "6px" }}>
      {v.tabs.map((t, tIdx) => (
            <Fragment key={tIdx}>
        <button onClick={t.pick} style={{ height: "36px", padding: "0 14px", borderRadius: "999px", border: t.border, background: t.bg, color: t.fg, font: "600 13px 'Instrument Sans', sans-serif", cursor: "pointer" }}>{t.label}</button>
      </Fragment>
            ))}
    </div>
  </div>

  <div style={{ flex: "1", padding: "0 16px", display: "flex", flexDirection: "column" }}>
    {v.items.map((n, nIdx) => (
          <Fragment key={nIdx}>
      <Link to={n.href} style={{ display: "flex", gap: "12px", padding: "12px 4px", borderBottom: "1px solid #EEECE6" }}>
        <span style={{ width: "40px", height: "40px", borderRadius: "12px", background: n.iconBg, color: n.iconFg, display: "flex", alignItems: "center", justifyContent: "center", font: "700 12px Archivo, sans-serif", flexShrink: "0" }}>{n.icon}</span>
        <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{n.title}</span><span style={{ font: "400 13px/1.35 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{n.body}</span></span>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58", whiteSpace: "nowrap" }}>{n.time}</span><span style={{ width: "8px", height: "8px", borderRadius: "50%", background: n.dot }}></span></span>
      </Link>
    </Fragment>
          ))}
  </div>
</div>
  );
}
