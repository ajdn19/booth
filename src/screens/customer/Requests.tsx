import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Requests() {
  const [state, setState] = useMergeState({ confirmed: false });
  const v = (() => {
    const done = state.confirmed;
    const base = [
      { mark: '44', club: '44 Toronto', detail: 'Main VIP V2 · with Maya R. · offered $1,800', status: 'In discussion', note: 'Maya can do $1,850 with a bottle upgrade and entry before midnight. Needs a yes by 11:45.', price: '$1,850', canAccept: true },
      { mark: 'REBEL', club: 'Rebel', detail: 'Mezzanine table · with Dev S. · offered $1,100', status: 'In discussion', note: 'Dev thinks the mezzanine works and will confirm a riser table after 10pm.', canAccept: false },
      { mark: 'TOYBOX', club: 'Toybox', detail: 'Booth · with Jordan K. · offered $650', status: 'Sent out', note: 'No reply from Jordan yet. He usually answers in about 10 min.', canAccept: false },
      { mark: 'EFS', club: 'EFS', detail: 'Booth · offered $700', status: 'Cancelled', note: 'Club says the night is sold out. Nothing left to do here.', canAccept: false }
    ];
    const list = base.map((r, i) => {
      if (!done) return r;
      if (i === 0) return Object.assign({}, r, { status: 'Confirmed', note: 'Locked at $1,850, deposit paid. Maya meets you at the side door at 11.', canAccept: false });
      if (r.status === 'Cancelled') return r;
      return Object.assign({}, r, { status: 'Cancelled', note: 'Withdrawn automatically when you confirmed 44 Toronto.' });
    });
    const style: Record<string, [string, string]> = {
      'Sent out': ['#EEECE6', '#111111'],
      'In discussion': ['#111111', '#FFFFFF'],
      'Confirmed': ['#C8FF3D', '#111111'],
      'Cancelled': ['#F3F2EE', '#5E5D58']
    };
    const count = (s: string) => list.filter((r) => r.status === s).length;
    return {
      headline: done ? '44 Toronto is confirmed for Saturday.' : '4 clubs, one night. Pick the one that feels right.',
      counts: ['Sent out', 'In discussion', 'Confirmed', 'Cancelled'].map((s) => ({
        n: count(s), label: s,
        bg: s === 'Confirmed' && count(s) ? '#C8FF3D' : '#FFFFFF',
        fg: '#111111'
      })),
      reqs: list.map((r) => ({
        mark: r.mark, club: r.club, detail: r.detail, status: r.status, note: r.note, price: r.price,
        canAccept: !!r.canAccept,
        pillBg: style[r.status][0], pillFg: style[r.status][1],
        opacity: '1',
        accept: () => setState({ confirmed: true })
      })),
      footNote: done ? 'Other open requests were withdrawn for you.' : 'AI summaries come from your chats. Confirming one club withdraws the rest.'
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 12px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/offer" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <button style={{ height: "40px", padding: "0 14px", borderRadius: "999px", border: "0", background: "#FFFFFF", font: "600 13px 'Instrument Sans', sans-serif", color: "#111111" }}>Sat Nov 28 ▾</button>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <h1 style={{ margin: "0", font: "700 32px/1.02 Archivo, sans-serif", letterSpacing: "-0.04em" }}>My requests</h1>
      <span style={{ font: "400 14px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{v.headline}</span>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "6px" }}>
      {v.counts.map((c, cIdx) => (
            <Fragment key={cIdx}>
        <div style={{ padding: "8px 6px", borderRadius: "14px", background: c.bg, color: c.fg, display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}><span style={{ font: "800 20px Archivo, sans-serif" }}>{c.n}</span><span style={{ font: "500 11px 'Instrument Sans', sans-serif", textAlign: "center" }}>{c.label}</span></div>
      </Fragment>
            ))}
    </div>
  </div>

  <div style={{ flex: "1", padding: "0 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
    {v.reqs.map((r, rIdx) => (
          <Fragment key={rIdx}>
      <div style={{ padding: "12px 14px", borderRadius: "22px", background: "#FFFFFF", opacity: r.opacity, display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "800 11px Archivo, sans-serif", flexShrink: "0" }}>{r.mark}</span>
          <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>{r.club}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{r.detail}</span></div>
          <span className="bpop" style={{ height: "26px", padding: "0 10px", borderRadius: "999px", background: r.pillBg, color: r.pillFg, display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>{r.status}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
          <span style={{ font: "400 13px/1.38 'Instrument Sans', sans-serif", color: "#333331" }}><span style={{ display: "inline-flex", alignItems: "center", gap: "3px", marginRight: "4px", verticalAlign: "-2px", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.04em", textTransform: "uppercase", color: "#111111" }}><svg width="13" height="13" viewBox="0 0 24 24" fill="#111111" aria-hidden="true"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" /></svg>AI</span>{r.note}</span>
          {r.canAccept ? (
                <>
            <button onClick={r.accept} style={{ height: "40px", padding: "0 16px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap", cursor: "pointer" }}>Accept {r.price}</button>
          </>
                ) : null}
        </div>
      </div>
    </Fragment>
          ))}
  </div>

  <div style={{ padding: "10px 20px 28px", background: "#FFFFFF", borderRadius: "28px 28px 0 0", display: "flex", flexDirection: "column", gap: "8px" }}>
    <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58", textAlign: "center" }}>{v.footNote}</span>
    <Link to="/" style={{ height: "54px", borderRadius: "999px", border: "1.5px solid #111111", display: "flex", alignItems: "center", justifyContent: "center", font: "600 15px 'Instrument Sans', sans-serif" }}>+ Request another club</Link>
  </div>
</div>
  );
}
