import { Fragment } from 'react';
import { useMergeState } from '../../lib/useMergeState';

export default function Console() {
  const [state, setState] = useMergeState({ tab: 'team', acted: {} as Record<string, string> });
  const v = (() => {
    const reqs = [
      { id: 'a', title: 'Party of 6 · Main VIP', sub: 'Sat 11pm · birthday · via Booth app', offer: '$1,800', list: '$2,000', counterPrice: '$1,850', status: 'Picked you from 4 promoters' },
      { id: 'b', title: 'Party of 10 · DJ side', sub: 'Sat 11:30pm · repeat guest', offer: '$3,600', list: '$4,000', counterPrice: '$3,800', status: 'New · 1 min ago' },
      { id: 'c', title: 'Party of 4 · Booth', sub: 'Sat 10:45pm · first visit', offer: '$750', list: '$900', counterPrice: '$825', status: 'Waiting on your reply' }
    ];
    const acted = state.acted;
    const team = [
      { who: 'Dev S.', text: 'I’m on the DJ-side 10-top, they booked with me in Oct.', mine: false },
      { who: 'Maya R.', text: 'My 4-top booth guests just confirmed, holding B3.', mine: false },
      { who: 'You', text: 'My VIP 6-top offered 1,800 — OK to counter 1,850 with a bottle upgrade?', mine: true },
      { who: 'Alex (owner)', text: 'Keep Main VIP above 1,750 tonight. Nice work team.', mine: false }
    ];
    const guests = [
      { who: 'Priya · party of 6', text: 'Is the bottle upgrade Grey Goose or Belvedere?', mine: false },
      { who: 'You', text: 'Your pick. I’ll meet you at the side door at 11.', mine: true }
    ];
    const msgs = (state.tab === 'team' ? team : guests).map((m) => ({
      who: m.who, text: m.text,
      align: m.mine ? 'flex-end' : 'flex-start',
      bg: m.mine ? '#111111' : '#F3F2EE',
      fg: m.mine ? '#FFFFFF' : '#111111'
    }));
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
      }),
      msgs: msgs,
      teamBg: state.tab === 'team' ? '#FFFFFF' : 'transparent',
      guestBg: state.tab === 'guests' ? '#FFFFFF' : 'transparent',
      showTeam: () => setState({ tab: 'team' }),
      showGuests: () => setState({ tab: 'guests' })
    };
  })();

  return (
    <div style={{ minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexWrap: "wrap" }}>
  <aside style={{ flex: "1 1 220px", maxWidth: "240px", boxSizing: "border-box", padding: "28px 20px", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "28px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#111111" }}></span></span><span style={{ font: "800 22px Archivo, sans-serif", letterSpacing: "-0.045em" }}>booth</span><span style={{ font: "600 10px 'Instrument Sans', sans-serif", letterSpacing: "0.08em", padding: "3px 7px", borderRadius: "999px", background: "#C8FF3D", color: "#111111" }}>PRO</span></div>
    <nav style={{ display: "flex", flexDirection: "column", gap: "4px", font: "500 14px 'Instrument Sans', sans-serif" }}>
      <a href="#" style={{ padding: "11px 12px", borderRadius: "12px", background: "#2A2A28" }}>Tonight</a>
      <a href="#" style={{ padding: "11px 12px", borderRadius: "12px", color: "#CFCDC6" }}>Requests</a>
      <a href="#" style={{ padding: "11px 12px", borderRadius: "12px", color: "#CFCDC6" }}>Messages</a>
      <a href="#" style={{ padding: "11px 12px", borderRadius: "12px", color: "#CFCDC6" }}>My guests</a>
      <a href="#" style={{ padding: "11px 12px", borderRadius: "12px", color: "#CFCDC6" }}>Payouts</a>
    </nav>
    <div style={{ marginTop: "auto", padding: "14px", borderRadius: "16px", background: "#2A2A28", display: "flex", flexDirection: "column", gap: "4px" }}>
      <span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Signed in as</span>
      <span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>Jordan K. · Promoter</span>
      <span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>44 Toronto team</span>
    </div>
  </aside>

  <main style={{ flex: "999 1 560px", minWidth: "0", boxSizing: "border-box", padding: "28px 32px 40px", display: "flex", flexDirection: "column", gap: "24px" }}>
    <header style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ font: "500 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>44 Toronto · Saturday, Nov 28</span>
        <h1 style={{ margin: "0", font: "700 40px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>Tonight's tables</h1>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <div style={{ padding: "12px 16px", borderRadius: "16px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>You closed</span><span style={{ font: "700 20px Archivo, sans-serif" }}>2 · $2,750</span></div>
        <div style={{ padding: "12px 16px", borderRadius: "16px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Team sold</span><span style={{ font: "700 20px Archivo, sans-serif" }}>9 of 14</span></div>
        <div style={{ padding: "12px 16px", borderRadius: "16px", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Open requests</span><span style={{ font: "700 20px Archivo, sans-serif" }}>3 live</span></div>
      </div>
    </header>

    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "flex-start" }}>
      <section style={{ flex: "1.2 1 340px", minWidth: "0", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>Requests sent to you</h2><span style={{ display: "flex", alignItems: "center", gap: "6px", font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#3B7A1A" }}></span>Guests choose their promoter</span></div>
        {v.requests.map((r, rIdx) => (
              <Fragment key={rIdx}>
          <div style={{ padding: "16px", borderRadius: "20px", background: "#FFFFFF", border: r.border, display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>{r.title}</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{r.sub}</span></div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}><span style={{ font: "800 22px Archivo, sans-serif", letterSpacing: "-0.03em" }}>{r.offer}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>list {r.list}</span></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: r.statusColor }}>{r.status}</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={r.counter} style={{ height: "40px", padding: "0 14px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", color: "#111111", font: "600 13px 'Instrument Sans', sans-serif", cursor: "pointer" }}>Counter {r.counterPrice}</button>
                <button onClick={r.accept} style={{ height: "40px", padding: "0 14px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 13px 'Instrument Sans', sans-serif", cursor: "pointer" }}>Accept</button>
              </div>
            </div>
          </div>
        </Fragment>
              ))}
      </section>

      <section style={{ flex: "1 1 280px", minWidth: "0", padding: "18px", borderRadius: "20px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "4px" }}>
        <h2 style={{ margin: "0 0 8px", font: "700 18px Archivo, sans-serif" }}>Table list</h2>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Booth 1</span><span style={{ fontWeight: "600" }}>Sold · Jordan</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Booth 2</span><span style={{ fontWeight: "600" }}>Sold · Maya</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Booth 3</span><span style={{ color: "#5E5D58" }}>Held · Maya · 20 min</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Booth 4</span><span style={{ padding: "2px 10px", borderRadius: "999px", background: "#C8FF3D", fontWeight: "600" }}>Open</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Main VIP 1</span><span style={{ fontWeight: "600" }}>Sold · Dev</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Main VIP 2</span><span style={{ color: "#5E5D58" }}>Offer pending</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #EEECE6", font: "400 14px 'Instrument Sans', sans-serif" }}><span>Main VIP 3</span><span style={{ padding: "2px 10px", borderRadius: "999px", background: "#C8FF3D", fontWeight: "600" }}>Open</span></div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", font: "400 14px 'Instrument Sans', sans-serif" }}><span>DJ side</span><span style={{ color: "#5E5D58" }}>Offer pending</span></div>
      </section>

      <section style={{ flex: "1 1 300px", minWidth: "0", padding: "18px", borderRadius: "20px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "14px" }}>
        <div style={{ display: "flex", gap: "6px", padding: "4px", borderRadius: "999px", background: "#F3F2EE" }}>
          <button onClick={v.showTeam} style={{ flex: "1", height: "38px", borderRadius: "999px", border: "0", background: v.teamBg, font: "600 13px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>Team chat</button>
          <button onClick={v.showGuests} style={{ flex: "1", height: "38px", borderRadius: "999px", border: "0", background: v.guestBg, font: "600 13px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>Guests · 2</button>
        </div>
        {v.msgs.map((m, mIdx) => (
              <Fragment key={mIdx}>
          <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignSelf: m.align, maxWidth: "86%", padding: "10px 14px", borderRadius: "16px", background: m.bg, color: m.fg }}>
            <span style={{ font: "600 12px 'Instrument Sans', sans-serif", opacity: "0.75" }}>{m.who}</span>
            <span style={{ font: "400 14px/1.4 'Instrument Sans', sans-serif" }}>{m.text}</span>
          </div>
        </Fragment>
              ))}
        <label style={{ display: "flex", alignItems: "center", gap: "8px", height: "46px", padding: "0 6px 0 14px", borderRadius: "999px", background: "#F3F2EE" }}>
          <span style={{ position: "absolute", left: "-9999px" }}>Message</span>
          <input placeholder="Message the team" style={{ flex: "1", border: "0", background: "transparent", outline: "none", font: "400 14px 'Instrument Sans', sans-serif", color: "#111111" }} />
          <button aria-label="Send" style={{ width: "36px", height: "36px", borderRadius: "50%", border: "0", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
        </label>
      </section>
    </div>
  </main>
</div>
  );
}
