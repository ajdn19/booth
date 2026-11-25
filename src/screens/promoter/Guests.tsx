import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Guests() {
  const [state, setState] = useMergeState({ filter: 'all' });
  const v = (() => {
    const all = [
      { initials: 'PM', name: 'Priya M.', meta: '12 nights · last Nov 14', spend: '$9,840', tag: 'Regular', kinds: ['reg', 'big'], action: 'Invite to Sat' },
      { initials: 'DW', name: 'Daniel W.', meta: '4 nights · birthday Dec 2', spend: '$6,200', tag: 'Birthday soon', kinds: ['bday', 'big'], action: 'Send birthday offer' },
      { initials: 'LC', name: 'Lena C.', meta: '7 nights · last Oct 31', spend: '$4,150', tag: 'Regular', kinds: ['reg'], action: 'Invite to Sat' },
      { initials: 'OA', name: 'Omar A.', meta: '2 nights · last Sep 19', spend: '$3,900', tag: 'Big spender', kinds: ['big'], action: 'Message' },
      { initials: 'SG', name: 'Sofia G.', meta: '1 night · birthday Dec 9', spend: '$900', tag: 'Birthday soon', kinds: ['bday'], action: 'Send birthday offer' }
    ];
    const filters = [['all', 'All'], ['reg', 'Regulars'], ['bday', 'Birthdays'], ['big', 'Big spenders']];
    const f = state.filter;
    const list = f === 'all' ? all : all.filter((g) => g.kinds.indexOf(f) >= 0);
    return {
      filters: filters.map(([id, label]) => ({ label: label, border: id === f ? '1.5px solid #111111' : '1px solid #E4E2DC', bg: id === f ? '#111111' : '#FFFFFF', fg: id === f ? '#FFFFFF' : '#111111', pick: () => setState({ filter: id }) })),
      guests: list.map((g) => ({ initials: g.initials, name: g.name, meta: g.meta, spend: g.spend, tag: g.tag, action: g.action, tagBg: g.tag === 'Birthday soon' ? '#C8FF3D' : '#FFFFFF' }))
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 12px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h1 style={{ margin: "0", font: "800 28px Archivo, sans-serif", letterSpacing: "-0.03em" }}>My guests</h1>
      <span style={{ font: "500 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>186 people</span>
    </div>
    <label style={{ display: "flex", alignItems: "center", gap: "10px", height: "46px", padding: "0 14px", borderRadius: "16px", background: "#F3F2EE" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E5D58" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      <span style={{ position: "absolute", left: "-9999px" }}>Search guests</span>
      <input placeholder="Search name or phone" style={{ flex: "1", border: "0", background: "transparent", outline: "none", font: "400 15px 'Instrument Sans', sans-serif", color: "#111111" }} />
    </label>
    <div style={{ display: "flex", gap: "8px", overflow: "hidden" }}>
      {v.filters.map((f, fIdx) => (
            <Fragment key={fIdx}>
        <button onClick={f.pick} style={{ height: "36px", padding: "0 14px", borderRadius: "999px", border: f.border, background: f.bg, color: f.fg, font: "600 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap", cursor: "pointer" }}>{f.label}</button>
      </Fragment>
            ))}
    </div>
  </div>

  <div style={{ flex: "1", padding: "4px 16px 0", display: "flex", flexDirection: "column", gap: "6px" }}>
    {v.guests.map((g, gIdx) => (
          <Fragment key={gIdx}>
      <div style={{ padding: "10px 14px", borderRadius: "20px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 13px Archivo, sans-serif" }}>{g.initials}</span>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>{g.name}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{g.meta}</span></span>
          <span style={{ font: "800 17px Archivo, sans-serif" }}>{g.spend}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}>
          <span style={{ height: "24px", padding: "0 9px", borderRadius: "999px", background: g.tagBg, display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif" }}>{g.tag}</span>
          <Link to="/promoter/app/chats" style={{ height: "34px", padding: "0 14px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", font: "600 12px 'Instrument Sans', sans-serif" }}>{g.action}</Link>
        </div>
      </div>
    </Fragment>
          ))}
  </div>

  <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "84px", paddingBottom: "18px", boxSizing: "border-box", borderTop: "1px solid #E4E2DC", background: "#FFFFFF" }}>
    <Link to="/promoter/app" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M13 3 4 14h7l-1 7 9-11h-7z" /></svg>Requests</Link>
    <Link to="/promoter/app/guests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "600 11px 'Instrument Sans', sans-serif", color: "#111111", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4 1.5 4.5 4" /></svg>Guests</Link>
    <Link to="/promoter/app/chats" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16v10H8l-4 4z" /></svg>Chats</Link>
    <Link to="/promoter/app/earnings" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v18M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7" /></svg>Earnings</Link>
  </nav>
</div>
  );
}
