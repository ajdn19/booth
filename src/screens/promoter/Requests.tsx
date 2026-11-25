import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Requests() {
  const [state, setState] = useMergeState({ acted: {} as Record<string, string> });
  const v = (() => {
    const reqs = [
      { id: 'a', title: 'Party of 6 · Main VIP', sub: '11pm · birthday · picked you', offer: '$1,800', list: '$2,000', counterPrice: '$1,850', status: 'Expires in 8 min' },
      { id: 'b', title: 'Party of 10 · DJ side', sub: '11:30pm · repeat guest', offer: '$3,600', list: '$4,000', counterPrice: '$3,800', status: 'New · 1 min ago' },
      { id: 'c', title: 'Party of 4 · Booth', sub: '10:45pm · first visit', offer: '$750', list: '$900', counterPrice: '$825', status: 'Waiting on your reply' }
    ];
    const acted = state.acted;
    return {
      requests: reqs.map((r) => {
        const a = acted[r.id];
        return {
          title: r.title, sub: r.sub, offer: r.offer, list: r.list, counterPrice: r.counterPrice,
          status: a === 'accept' ? 'You landed this table' : a === 'counter' ? 'You countered ' + r.counterPrice + ' · waiting on guest' : r.status,
          statusColor: a ? '#111111' : '#5E5D58',
          border: a === 'accept' ? '2px solid #C8FF3D' : a === 'counter' ? '2px solid #111111' : '2px solid transparent',
          counter: () => setState({ acted: Object.assign({}, acted, { [r.id]: 'counter' }) }),
          accept: () => setState({ acted: Object.assign({}, acted, { [r.id]: 'accept' }) })
        };
      })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 18px", background: "#111111", color: "#FFFFFF", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", gap: "16px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>44 Toronto · Sat Nov 28</span><span style={{ font: "700 24px Archivo, sans-serif", letterSpacing: "-0.03em" }}>Hey Jordan</span></div>
      <span style={{ display: "flex", alignItems: "center", gap: "6px", height: "30px", padding: "0 12px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", font: "600 12px 'Instrument Sans', sans-serif" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#111111" }}></span>On shift</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
      <div style={{ padding: "10px 12px", borderRadius: "16px", background: "#2A2A28", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "700 18px Archivo, sans-serif" }}>2</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>tables closed</span></div>
      <div style={{ padding: "10px 12px", borderRadius: "16px", background: "#2A2A28", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "700 18px Archivo, sans-serif" }}>$275</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>your commission</span></div>
      <div style={{ padding: "10px 12px", borderRadius: "16px", background: "#2A2A28", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "700 18px Archivo, sans-serif" }}>#4</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>on the team</span></div>
    </div>
  </div>

  <div style={{ flex: "1", padding: "18px 16px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "0 4px" }}><h1 style={{ margin: "0", font: "700 22px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Requests sent to you</h1><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>VIP floor $1,750</span></div>
    {v.requests.map((r, rIdx) => (
          <Fragment key={rIdx}>
      <div style={{ padding: "14px", borderRadius: "22px", background: "#FFFFFF", border: r.border, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>{r.title}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{r.sub}</span></div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}><span style={{ font: "800 22px Archivo, sans-serif", letterSpacing: "-0.03em" }}>{r.offer}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>list {r.list}</span></div>
        </div>
        <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: r.statusColor }}>{r.status}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={r.counter} style={{ flex: "1", height: "44px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", color: "#111111", font: "600 14px 'Instrument Sans', sans-serif", cursor: "pointer" }}>Counter {r.counterPrice}</button>
          <button onClick={r.accept} style={{ flex: "1", height: "44px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 14px 'Instrument Sans', sans-serif", cursor: "pointer" }}>Accept</button>
        </div>
      </div>
    </Fragment>
          ))}
  </div>

  <nav style={{ display: "flex", justifyContent: "space-around", alignItems: "center", height: "84px", paddingBottom: "18px", boxSizing: "border-box", borderTop: "1px solid #E4E2DC", background: "#FFFFFF" }}>
    <Link to="/promoter/app" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "600 11px 'Instrument Sans', sans-serif", color: "#111111", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M13 3 4 14h7l-1 7 9-11h-7z" /></svg>Requests</Link>
    <Link to="/promoter/app/guests" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4 1.5 4.5 4" /></svg>Guests</Link>
    <Link to="/promoter/app/chats" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 6h16v10H8l-4 4z" /></svg>Chats</Link>
    <Link to="/promoter/app/earnings" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58", minWidth: "44px" }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 3v18M17 7H9.5a2.5 2.5 0 0 0 0 5h5a2.5 2.5 0 0 1 0 5H7" /></svg>Earnings</Link>
  </nav>
</div>
  );
}
