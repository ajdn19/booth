import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Chats() {
  const [state, setState] = useMergeState({ tab: 'team', card: false });
  const v = (() => {
    const team = [
      { who: 'Dev S.', text: 'I’m on the DJ-side 10-top, they booked with me in Oct.' },
      { who: 'Maya R.', text: 'My 4-top booth guests just confirmed, holding B3.' },
      { who: 'You', text: 'My VIP 6-top offered 1,800 — OK to counter 1,850 with a bottle upgrade?', mine: true },
      { who: 'Alex (owner)', text: 'Approved. Keep Main VIP above 1,750 tonight.' }
    ];
    const guests = [
      { who: 'Priya · party of 6', text: 'Is the bottle upgrade Grey Goose or Belvedere?' },
      { who: 'You', text: 'Your pick. I’ll meet you at the side door at 11.', mine: true },
      { who: 'Priya · party of 6', text: 'Perfect, accepting now.' }
    ];
    const isTeam = state.tab === 'team';
    return {
      msgs: (isTeam ? team : guests).map((m) => ({
        who: m.who, text: m.text,
        align: m.mine ? 'flex-end' : 'flex-start',
        bg: m.mine ? '#111111' : '#F3F2EE',
        fg: m.mine ? '#FFFFFF' : '#111111',
        radius: m.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px'
      })),
      pinned: isTeam ? 'Owner: Main VIP floor is $1,750 tonight' : 'Priya’s party · Main VIP · offer $1,800',
      teamBg: isTeam ? '#FFFFFF' : 'transparent',
      guestBg: isTeam ? 'transparent' : '#FFFFFF',
      teamShadow: isTeam ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
      guestShadow: isTeam ? 'none' : '0 2px 8px rgba(0,0,0,0.08)',
      showTeam: () => setState({ tab: 'team' }),
      showGuests: () => setState({ tab: 'guests' }),
      showCard: state.card,
      sendCard: () => setState({ card: true })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 12px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <h1 style={{ margin: "0", font: "700 30px Archivo, sans-serif", letterSpacing: "-0.035em" }}>Chats</h1>
    <div style={{ display: "flex", gap: "6px", padding: "4px", borderRadius: "999px", background: "#F3F2EE" }}>
      <button onClick={v.showTeam} style={{ flex: "1", height: "40px", borderRadius: "999px", border: "0", background: v.teamBg, boxShadow: v.teamShadow, font: "600 13px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>Team · 44 Toronto</button>
      <button onClick={v.showGuests} style={{ flex: "1", height: "40px", borderRadius: "999px", border: "0", background: v.guestBg, boxShadow: v.guestShadow, font: "600 13px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>Guests · 2 new</button>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "16px", background: "#111111", color: "#FFFFFF" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8FF3D" strokeWidth="2" aria-hidden="true"><path d="M12 17v5M8 3h8l-1 6 3 3H6l3-3z" /></svg>
      <span style={{ font: "500 13px 'Instrument Sans', sans-serif" }}>{v.pinned}</span>
    </div>
  </div>

  <div style={{ flex: "1", padding: "6px 16px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
    {v.msgs.map((m, mIdx) => (
          <Fragment key={mIdx}>
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", alignSelf: m.align, maxWidth: "82%", padding: "10px 14px", borderRadius: m.radius, background: m.bg, color: m.fg }}>
        <span style={{ font: "600 12px 'Instrument Sans', sans-serif", opacity: "0.7" }}>{m.who}</span>
        <span style={{ font: "400 14px/1.4 'Instrument Sans', sans-serif" }}>{m.text}</span>
      </div>
    </Fragment>
          ))}
    {v.showCard ? (
          <>
      <div style={{ alignSelf: "flex-end", width: "240px", padding: "14px", borderRadius: "20px", border: "2px solid #111111", display: "flex", flexDirection: "column", gap: "6px" }}>
        <span style={{ font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58" }}>Offer sent</span>
        <span style={{ font: "800 26px Archivo, sans-serif", letterSpacing: "-0.03em" }}>$1,850</span>
        <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#333331" }}>Main VIP · 6 guests · bottle upgrade</span>
      </div>
    </>
          ) : null}
  </div>

  <div style={{ padding: "10px 16px 30px", display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid #EEECE6" }}>
    <div style={{ display: "flex", gap: "8px" }}>
      <button onClick={v.sendCard} style={{ height: "36px", padding: "0 14px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", font: "600 12px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>+ Offer card</button>
      <button style={{ height: "36px", padding: "0 14px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", font: "600 12px 'Instrument Sans', sans-serif", color: "#111111" }}>Hold a table</button>
      <button style={{ height: "36px", padding: "0 14px", borderRadius: "999px", border: "1px solid #D9D6CC", background: "#FFFFFF", font: "600 12px 'Instrument Sans', sans-serif", color: "#111111" }}>Guest list</button>
    </div>
    <div style={{ display: "flex", gap: "6px", overflow: "hidden" }}>
      <span style={{ font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", color: "#5E5D58", alignSelf: "center", whiteSpace: "nowrap" }}>QUICK REPLY</span>
      <button style={{ height: "32px", padding: "0 12px", borderRadius: "999px", border: "0", background: "#F3F2EE", font: "500 12px 'Instrument Sans', sans-serif", color: "#111111", whiteSpace: "nowrap" }}>Side door at 11 ✓</button>
      <button style={{ height: "32px", padding: "0 12px", borderRadius: "999px", border: "0", background: "#F3F2EE", font: "500 12px 'Instrument Sans', sans-serif", color: "#111111", whiteSpace: "nowrap" }}>Dress code: upscale</button>
      <button style={{ height: "32px", padding: "0 12px", borderRadius: "999px", border: "0", background: "#F3F2EE", font: "500 12px 'Instrument Sans', sans-serif", color: "#111111", whiteSpace: "nowrap" }}>Bring ID</button>
    </div>
    <label style={{ display: "flex", alignItems: "center", gap: "8px", height: "48px", padding: "0 6px 0 16px", borderRadius: "999px", background: "#F3F2EE" }}>
      <span style={{ position: "absolute", left: "-9999px" }}>Message</span>
      <input placeholder="Message" style={{ flex: "1", border: "0", background: "transparent", outline: "none", font: "400 15px 'Instrument Sans', sans-serif", color: "#111111" }} />
      <button aria-label="Send" style={{ width: "38px", height: "38px", borderRadius: "50%", border: "0", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></button>
    </label>
    <Link to="/promoter/app" style={{ alignSelf: "center", font: "500 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Back to requests</Link>
  </div>
</div>
  );
}
