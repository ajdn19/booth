import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Split() {
  const [state, setState] = useMergeState({ reminded: {} as Record<string, boolean> });
  const v = (() => {
    const people = [
      { id: 'pm', initials: 'PM', name: 'You', sub: 'Organizer · paid $84.50', paid: true },
      { id: 'jl', initials: 'JL', name: 'Jess L.', sub: 'Paid with Apple Pay', paid: true },
      { id: 'rk', initials: 'RK', name: 'Raj K.', sub: 'Paid with card', paid: true },
      { id: 'mt', initials: 'MT', name: 'Marcus T.', sub: 'Opened invite 1h ago', paid: false },
      { id: 'ts', initials: 'TS', name: 'Tom S.', sub: 'Invite sent', paid: false },
      { id: 'ab', initials: 'AB', name: 'Amira B.', sub: 'Invite sent', paid: false }
    ];
    const r = state.reminded;
    const paid = people.filter((p) => p.paid).length;
    return {
      people: people.map((p, i) => ({
        initials: p.initials, name: p.name, sub: p.sub, paid: p.paid, unpaid: !p.paid,
        avatar: p.paid ? '#111111' : '#9C9A92',
        line: i < people.length - 1 ? '1px solid #EEECE6' : '0',
        remindLabel: r[p.id] ? 'Reminded' : 'Remind',
        remind: () => setState({ reminded: Object.assign({}, r, { [p.id]: true }) })
      })),
      paidLabel: '$' + (paid * 84.5).toFixed(2).replace('.00', ''),
      countLabel: paid + ' of 6 paid',
      pct: Math.round((paid / 6) * 100) + '%',
      ctaLabel: 'Cover the rest · $' + ((6 - paid) * 84.5).toFixed(2)
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 18px", background: "#111111", color: "#FFFFFF", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <Link to="/checkout" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <span style={{ display: "flex", flexDirection: "column" }}><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>44 Toronto · V2 · Sat Nov 28</span><span style={{ font: "800 24px Archivo, sans-serif", letterSpacing: "-0.03em" }}>Split the deposit</span></span>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 40px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>{v.paidLabel}</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>of $507 deposit covered</span></span>
      <span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>{v.countLabel}</span>
    </div>
    <div style={{ height: "8px", borderRadius: "4px", background: "#2A2A28", overflow: "hidden" }}><div style={{ height: "8px", borderRadius: "4px", background: "#C8FF3D", width: v.pct }}></div></div>
    <span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Your table locks once the deposit is fully covered. Held until Thu 6pm.</span>
  </div>

  <div style={{ flex: "1", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
      <h1 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>Your group · $84.50 each</h1>
      <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Even split</span>
    </div>
    <div style={{ borderRadius: "22px", background: "#FFFFFF", padding: "4px 14px", display: "flex", flexDirection: "column" }}>
      {v.people.map((p, pIdx) => (
            <Fragment key={pIdx}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: p.line }}>
          <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: p.avatar, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 12px Archivo, sans-serif" }}>{p.initials}</span>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{p.name}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{p.sub}</span></span>
          {p.paid ? (
                <><span style={{ height: "26px", padding: "0 10px", borderRadius: "999px", background: "#C8FF3D", display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif" }}>Paid</span></>
                ) : null}
          {p.unpaid ? (
                <><button onClick={p.remind} style={{ height: "32px", padding: "0 12px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", font: "600 12px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>{p.remindLabel}</button></>
                ) : null}
        </div>
      </Fragment>
            ))}
    </div>
    <button style={{ height: "48px", borderRadius: "16px", border: "1.5px dashed #B5B2A8", background: "transparent", font: "600 14px 'Instrument Sans', sans-serif", color: "#111111" }}>+ Invite by link or contacts</button>
  </div>

  <div style={{ padding: "12px 20px 28px", display: "flex", flexDirection: "column", gap: "8px" }}>
    <Link to="/pass" style={{ height: "56px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "600 16px 'Instrument Sans', sans-serif" }}>{v.ctaLabel}</Link>
    <span style={{ textAlign: "center", font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Unpaid shares are released back to you at 6pm Thursday.</span>
  </div>
</div>
  );
}
