import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Club() {
  const [state, setState] = useMergeState({ table: 'V2', promoter: 'MR', day: 'sat28' });
  const v = (() => {
    const tables = [
      { id: 'B1', x: '14px', y: '64px', kind: 'Booth', booked: true },
      { id: 'B2', x: '14px', y: '114px', kind: 'Booth', booked: true },
      { id: 'B3', x: '14px', y: '164px', kind: 'Booth', booked: false },
      { id: 'B4', x: '14px', y: '214px', kind: 'Booth', booked: false },
      { id: 'V1', x: '92px', y: '206px', kind: 'Main VIP', booked: true },
      { id: 'V2', x: '160px', y: '206px', kind: 'Main VIP', booked: false },
      { id: 'V3', x: '228px', y: '206px', kind: 'Main VIP', booked: false },
      { id: 'D1', x: '266px', y: '8px', kind: 'DJ side', booked: false }
    ];
    const short: Record<string, string> = { 'Booth': '$900', 'Main VIP': '$2K', 'DJ side': '$4K' };
    const info: Record<string, { min: string; where: string; guests: number; bottles: number }> = {
      'Booth': { min: '$900', where: 'Raised booth along the left wall, view of the whole room.', guests: 6, bottles: 2 },
      'Main VIP': { min: '$2,000', where: 'Front edge of the dance floor, facing the DJ.', guests: 10, bottles: 3 },
      'DJ side': { min: '$4,000', where: 'On the stage, right beside the DJ booth.', guests: 12, bottles: 5 }
    };
    const promoters = [
      { id: 'MR', name: 'Maya R.', meta: '★ 4.9 · 98 bookings · replies in ~5 min', on: true, photo: true, days: ['sat28', 'fri4', 'sat5'] },
      { id: 'JK', name: 'Jordan K.', meta: '★ 4.8 · 140 bookings · replies in ~10 min', on: true, photo: false, days: ['fri27', 'sat28', 'sat5'] },
      { id: 'DS', name: 'Dev S.', meta: '★ 4.8 · 61 bookings · replies in ~15 min', on: true, photo: true, days: ['sat28', 'sat5'] },
      { id: 'TN', name: 'Tay N.', meta: '★ 4.6 · 33 bookings · replies in ~20 min', on: true, photo: false, days: ['fri27', 'fri4', 'sat5'] }
    ];
    const sel = tables.find((t) => t.id === state.table)!;
    const selInfo = info[sel.kind];
    const days = [
      { id: 'fri27', dow: 'Fri', date: 'Nov 27', label: 'Fri Nov 27', booked: 6, interested: 23, talking: 3 },
      { id: 'sat28', dow: 'Sat', date: 'Nov 28', label: 'Sat Nov 28', booked: 11, interested: 42, talking: 7 },
      { id: 'fri4', dow: 'Fri', date: 'Dec 4', label: 'Fri Dec 4', booked: 5, interested: 64, talking: 9, event: { name: 'Winter Formal', host: 'Commerce Society', kind: 'Student event · 19+', doors: '10pm', dress: 'Formal', music: 'Top 40', reps: [
        { id: 'AL', name: 'Ava L.', meta: 'VP Events · replies in ~5 min', on: true, photo: true },
        { id: 'ST', name: 'Sam T.', meta: 'Table rep · replies in ~10 min', on: true, photo: false }
      ] } },
      { id: 'sat5', dow: 'Sat', date: 'Dec 5', label: 'Sat Dec 5', booked: 7, interested: 88, talking: 12, event: { name: 'AFTERGLOW', host: 'Lumen Events', kind: 'Private event', doors: '10:30pm', dress: 'All white', music: 'House' , reps: [
        { id: 'NP', name: 'Nico P.', meta: 'Lumen Events lead · replies in ~5 min', on: true, photo: true },
        { id: 'RD', name: 'Rae D.', meta: 'Lumen table host · replies in ~10 min', on: true, photo: false },
        { id: 'KO', name: 'Kai O.', meta: 'Lumen table host · replies in ~15 min', on: true, photo: true }
      ] } }
    ];
    const day = days.find((d) => d.id === state.day)!;
    const ev = day.event || null;
    const working = ev ? ev.reps : promoters.filter((p) => p.days.indexOf(day.id) >= 0);
    const pr = working.find((p) => p.id === state.promoter) || working[0];
    return {
      tables: tables.map((t) => {
        const on = t.id === state.table;
        return {
          id: t.id, x: t.x, y: t.y, price: t.booked ? 'Booked' : short[t.kind],
          aria: t.id + ' ' + t.kind + (t.booked ? ' booked' : ' open'),
          border: on ? '2px solid #C8FF3D' : t.booked ? '1px solid #2A2A28' : '1.5px solid #FFFFFF',
          bg: on ? '#C8FF3D' : t.booked ? '#2A2A28' : '#111111',
          fg: on ? '#111111' : t.booked ? '#8A887F' : '#FFFFFF',
          strike: t.booked ? 'line-through' : 'none',
          pick: () => { if (!t.booked) setState({ table: t.id }); }
        };
      }),
      selName: sel.id + ' · ' + sel.kind,
      selMin: selInfo.min,
      selWhere: selInfo.where,
      selGuests: 'Fits up to ' + selInfo.guests + ' guests',
      selBottles: selInfo.bottles + ' bottles included',
      promoters: working.map((p) => {
        const on = p.id === pr.id;
        return {
          initials: p.id, name: p.name, meta: p.meta,
          avatarBg: p.photo ? '#5B5A55' : '#111111',
          avatarFg: '#FFFFFF',
          dot: p.on ? '#3B7A1A' : '#9C9A92',
          border: on ? '2px solid #111111' : '1px solid #E4E2DC',
          radio: on ? '7px solid #111111' : '1.5px solid #B5B2A8',
          pick: () => setState({ promoter: p.id })
        };
      }),
      days: days.map((d) => {
        const on = d.id === day.id;
        return { dow: d.dow, date: d.date, border: on ? '2px solid #111111' : '1px solid #E4E2DC', bg: on ? '#111111' : '#FFFFFF', fg: on ? '#FFFFFF' : '#111111', pick: () => setState({ day: d.id }) };
      }),
      dayLabel: day.label, liveLabel: ev ? day.label + ' · ' + ev.name : day.label, booked: day.booked, interested: day.interested, talking: day.talking,
      rosterNote: ev ? working.length + ' on the host team' : working.length + ' working ' + day.label,
      promoHeading: ev ? 'Message the host team' : 'Choose your promoter',
      dayHelp: ev ? 'Something special is on this night. See below.' : 'Promoters are scheduled by the club, so who you can message depends on the night.',
      hasEvent: !!ev,
      evName: ev ? ev.name : '', evHost: ev ? ev.host : '', evKind: ev ? ev.kind : '',
      evDoors: ev ? ev.doors : '', evDress: ev ? ev.dress : '', evMusic: ev ? ev.music : '',
      promoterInitials: pr.id,
      barTitle: sel.id + ' · up to ' + selInfo.guests + ' · ' + selInfo.min,
      barSub: day.label + ' · with ' + pr.name
    };
  })();

  return (
    <div style={{ width: "100%", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
  <div style={{ position: "relative", height: "300px", background: "#1C1C1A", color: "#FFFFFF" }}>
    <div style={{ position: "absolute", inset: "0", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridTemplateRows: "repeat(2, minmax(0, 1fr))", gap: "3px" }}>
      <div style={{ gridColumn: "span 2", gridRow: "span 2", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center", font: "500 12px 'Instrument Sans', sans-serif", color: "#9C9A92" }}>Club photo · main room</div>
      <div style={{ background: "#33332F", display: "flex", alignItems: "center", justifyContent: "center", font: "500 11px 'Instrument Sans', sans-serif", color: "#9C9A92" }}>Booths</div>
      <div style={{ background: "#3B3B37", display: "flex", alignItems: "center", justifyContent: "center", font: "500 11px 'Instrument Sans', sans-serif", color: "#9C9A92" }}>+ 14 photos</div>
    </div>
    <div style={{ position: "absolute", top: "52px", left: "20px", right: "20px", display: "flex", justifyContent: "space-between" }}>
      <Link to="/" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <button aria-label="Save" style={{ width: "44px", height: "44px", borderRadius: "50%", border: "0", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg></button>
    </div>
  </div>

  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "28px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h1 style={{ margin: "0", font: "800 40px/0.95 Archivo, sans-serif", letterSpacing: "-0.05em" }}>44 TORONTO</h1>
      <span style={{ font: "400 14px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>King West · R&amp;B, hip-hop, house · Fri &amp; Sat 10:30pm–2:30am</span>
      <span style={{ font: "500 14px 'Instrument Sans', sans-serif" }}>★ 4.7 <span style={{ color: "#5E5D58", fontWeight: "400" }}>· 860 reviews</span></span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "6px", marginTop: "8px" }}>
        <div style={{ padding: "10px", borderRadius: "16px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Booth</span><span style={{ display: "flex", alignItems: "center", gap: "4px", font: "800 18px Archivo, sans-serif" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.3 3.5 5" /></svg>6</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>max · $900</span></div>
        <div style={{ padding: "10px", borderRadius: "16px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Main VIP</span><span style={{ display: "flex", alignItems: "center", gap: "4px", font: "800 18px Archivo, sans-serif" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.3 3.5 5" /></svg>10</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>max · $2,000</span></div>
        <div style={{ padding: "10px", borderRadius: "16px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>DJ side</span><span style={{ display: "flex", alignItems: "center", gap: "4px", font: "800 18px Archivo, sans-serif" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.2" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2 .6 3.2 2.3 3.5 5" /></svg>12</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>max · $4,000</span></div>
      </div>
    </div>

    <section style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Pick your night</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "6px" }}>
        {v.days.map((d, dIdx) => (
              <Fragment key={dIdx}>
          <button onClick={d.pick} style={{ height: "64px", borderRadius: "16px", border: d.border, background: d.bg, color: d.fg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", cursor: "pointer", padding: "0" }}>
            <span style={{ font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>{d.dow}</span>
            <span style={{ font: "800 20px Archivo, sans-serif" }}>{d.date}</span>
          </button>
        </Fragment>
              ))}
      </div>
      <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{v.dayHelp}</span>
      {v.hasEvent ? (
            <>
        <div style={{ marginTop: "4px", padding: "18px", borderRadius: "24px", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ height: "26px", padding: "0 10px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", font: "700 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em" }}>EVENT NIGHT</span>
            <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>{v.evKind}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ font: "800 28px/1 Archivo, sans-serif", letterSpacing: "-0.035em" }}>{v.evName}</span>
            <span style={{ font: "400 14px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Hosted by <span style={{ color: "#FFFFFF", fontWeight: "600" }}>{v.evHost}</span></span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", font: "400 12px/1.3 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>
            <span><span style={{ display: "block", font: "700 14px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>{v.evDoors}</span>doors</span>
            <span><span style={{ display: "block", font: "700 14px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>{v.evDress}</span>dress code</span>
            <span><span style={{ display: "block", font: "700 14px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>{v.evMusic}</span>music</span>
          </div>
          <span style={{ paddingTop: "10px", borderTop: "1px solid #2A2A28", font: "400 13px/1.4 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Tables tonight are sold by the {v.evHost} team, not the club's promoters.</span>
        </div>
      </>
            ) : null}
    </section>

    <div style={{ padding: "16px", borderRadius: "22px", background: "#111111", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: "12px" }}>
      <span style={{ display: "flex", alignItems: "center", gap: "8px", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#CFCDC6" }}><span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#C8FF3D" }}></span>Live for {v.liveLabel}</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 28px Archivo, sans-serif", letterSpacing: "-0.04em" }}>{v.booked}</span><span style={{ font: "400 12px/1.3 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>tables already booked</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 28px Archivo, sans-serif", letterSpacing: "-0.04em" }}>{v.interested}</span><span style={{ font: "400 12px/1.3 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>people interested</span></div>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "800 28px Archivo, sans-serif", letterSpacing: "-0.04em" }}>{v.talking}</span><span style={{ font: "400 12px/1.3 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>talking to promoters now</span></div>
      </div>
    </div>

    <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Pick your table</h2><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Tap a table</span></div>
      <div style={{ position: "relative", height: "300px", borderRadius: "24px", background: "#111111", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "12px", left: "100px", right: "100px", height: "36px", borderRadius: "12px", background: "#2A2A28", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.12em" }}>DJ STAGE</div>
        <div style={{ position: "absolute", top: "64px", left: "92px", right: "92px", height: "130px", borderRadius: "18px", border: "1.5px dashed #3A3A36", display: "flex", alignItems: "center", justifyContent: "center", font: "600 11px 'Instrument Sans', sans-serif", letterSpacing: "0.12em", color: "#8A887F" }}>DANCE FLOOR</div>
        <div style={{ position: "absolute", top: "64px", right: "12px", bottom: "64px", width: "26px", borderRadius: "10px", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ transform: "rotate(90deg)", font: "600 10px 'Instrument Sans', sans-serif", letterSpacing: "0.12em", color: "#8A887F" }}>BAR</span></div>
        <div style={{ position: "absolute", bottom: "12px", left: "0", right: "0", textAlign: "center", font: "600 10px 'Instrument Sans', sans-serif", letterSpacing: "0.12em", color: "#8A887F" }}>ENTRANCE ↓</div>
        {v.tables.map((t, tIdx) => (
              <Fragment key={tIdx}>
          <button onClick={t.pick} aria-label={t.aria} style={{ position: "absolute", left: t.x, top: t.y, width: "60px", height: "44px", borderRadius: "14px", border: t.border, background: t.bg, color: t.fg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px", cursor: "pointer", padding: "0" }}>
            <span style={{ font: "700 13px Archivo, sans-serif", textDecoration: t.strike }}>{t.id}</span>
            <span style={{ font: "500 10px 'Instrument Sans', sans-serif" }}>{t.price}</span>
          </button>
        </Fragment>
              ))}
      </div>
      <div style={{ display: "flex", gap: "8px", font: "500 12px 'Instrument Sans', sans-serif" }}>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", height: "28px", padding: "0 10px", borderRadius: "999px", background: "#F3F2EE" }}><span style={{ width: "10px", height: "10px", borderRadius: "4px", background: "#C8FF3D", border: "1px solid #111111" }}></span>Your pick</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", height: "28px", padding: "0 10px", borderRadius: "999px", background: "#F3F2EE" }}><span style={{ width: "10px", height: "10px", borderRadius: "4px", background: "#FFFFFF", border: "1.5px solid #111111" }}></span>Open</span>
        <span style={{ display: "flex", alignItems: "center", gap: "6px", height: "28px", padding: "0 10px", borderRadius: "999px", background: "#F3F2EE" }}><span style={{ width: "10px", height: "10px", borderRadius: "4px", background: "#2A2A28" }}></span>Booked</span>
      </div>
      <div style={{ padding: "16px", borderRadius: "20px", border: "1.5px solid #111111", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ font: "700 17px Archivo, sans-serif" }}>{v.selName}</span><span style={{ font: "800 20px Archivo, sans-serif" }}>{v.selMin}</span></div>
        <span style={{ font: "400 14px/1.4 'Instrument Sans', sans-serif", color: "#333331" }}>{v.selWhere}</span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}><span style={{ height: "28px", padding: "0 10px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", font: "600 12px 'Instrument Sans', sans-serif" }}>{v.selGuests}</span><span style={{ height: "28px", padding: "0 10px", borderRadius: "999px", background: "#F3F2EE", display: "flex", alignItems: "center", font: "600 12px 'Instrument Sans', sans-serif" }}>{v.selBottles}</span></div>
      </div>
    </section>

    <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Bottle menu</h2>
      <div style={{ display: "flex", gap: "14px", alignItems: "stretch" }}>
        <div style={{ width: "96px", height: "128px", borderRadius: "14px", background: "#F3F2EE", border: "1px solid #E4E2DC", display: "flex", flexDirection: "column", gap: "6px", padding: "12px", boxSizing: "border-box" }}>
          <span style={{ height: "6px", width: "50%", borderRadius: "3px", background: "#B5B2A8" }}></span><span style={{ height: "4px", width: "80%", borderRadius: "2px", background: "#D9D6CC" }}></span><span style={{ height: "4px", width: "70%", borderRadius: "2px", background: "#D9D6CC" }}></span><span style={{ height: "4px", width: "85%", borderRadius: "2px", background: "#D9D6CC" }}></span><span style={{ height: "4px", width: "60%", borderRadius: "2px", background: "#D9D6CC" }}></span><span style={{ height: "4px", width: "75%", borderRadius: "2px", background: "#D9D6CC" }}></span>
        </div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "6px", justifyContent: "center" }}>
          <span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>Uploaded by 44 Toronto</span>
          <span style={{ font: "400 13px/1.4 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Updated Nov 20. Bottles count toward your table's minimum spend.</span>
          <a href="#" style={{ alignSelf: "flex-start", marginTop: "4px", height: "40px", padding: "0 16px", borderRadius: "999px", border: "1px solid #D9D6CC", display: "flex", alignItems: "center", font: "600 13px 'Instrument Sans', sans-serif" }}>View full menu</a>
        </div>
      </div>
    </section>

    <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>{v.promoHeading}</h2><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{v.rosterNote}</span></div>
      {v.promoters.map((p, pIdx) => (
            <Fragment key={pIdx}>
        <button onClick={p.pick} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "18px", border: p.border, background: "#FFFFFF", textAlign: "left", cursor: "pointer", fontFamily: "'Instrument Sans', sans-serif", color: "#111111" }}>
          <span style={{ position: "relative", width: "48px", height: "48px", borderRadius: "50%", background: p.avatarBg, color: p.avatarFg, display: "flex", alignItems: "center", justifyContent: "center", font: "700 15px Archivo, sans-serif", flexShrink: "0" }}>{p.initials}<span style={{ position: "absolute", right: "0", bottom: "0", width: "12px", height: "12px", borderRadius: "50%", border: "2px solid #FFFFFF", background: p.dot }}></span></span>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ display: "flex", alignItems: "center", gap: "5px", font: "600 15px 'Instrument Sans', sans-serif" }}>{p.name}<svg width="14" height="14" viewBox="0 0 24 24" role="img" aria-label="Verified"><circle cx="12" cy="12" r="10" fill="#111111" /><path d="m7.5 12.5 3 3 6-6.5" fill="none" stroke="#C8FF3D" strokeWidth="2.5" /></svg></span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{p.meta}</span></span>
          <span style={{ width: "24px", height: "24px", borderRadius: "50%", border: p.radio, boxSizing: "border-box", flexShrink: "0" }}></span>
        </button>
      </Fragment>
            ))}
    </section>

    <section style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Location</h2>
      <div style={{ position: "relative", height: "150px", borderRadius: "20px", background: "#E9E7E0", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "58px", left: "0", right: "0", height: "14px", background: "#FFFFFF" }}></div>
        <div style={{ position: "absolute", top: "0", bottom: "0", left: "120px", width: "12px", background: "#FFFFFF" }}></div>
        <div style={{ position: "absolute", top: "0", bottom: "0", left: "260px", width: "12px", background: "#FFFFFF" }}></div>
        <span style={{ position: "absolute", top: "76px", left: "14px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>King St W</span>
        <div style={{ position: "absolute", top: "32px", left: "180px", width: "36px", height: "36px", borderRadius: "50% 50% 50% 0", transform: "rotate(-45deg)", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#C8FF3D" }}></span></div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>[Venue address], King St W</span><span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Table guests use the side entrance</span></div>
        <a href="#" style={{ height: "40px", padding: "0 16px", borderRadius: "999px", background: "#F3F2EE", display: "flex", alignItems: "center", font: "600 13px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>Directions</a>
      </div>
    </section>

    <section style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 style={{ margin: "0", font: "700 20px Archivo, sans-serif", letterSpacing: "-0.02em" }}>Reviews</h2><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Verified bookings only</span></div>
      <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><span style={{ font: "800 44px/1 Archivo, sans-serif", letterSpacing: "-0.05em" }}>4.7</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>860 reviews</span></div>
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "5px", font: "500 11px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "12px" }}>5</span><div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#EEECE6" }}><div style={{ width: "78%", height: "6px", borderRadius: "3px", background: "#111111" }}></div></div></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "12px" }}>4</span><div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#EEECE6" }}><div style={{ width: "15%", height: "6px", borderRadius: "3px", background: "#111111" }}></div></div></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "12px" }}>3</span><div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#EEECE6" }}><div style={{ width: "5%", height: "6px", borderRadius: "3px", background: "#111111" }}></div></div></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "12px" }}>1–2</span><div style={{ flex: "1", height: "6px", borderRadius: "3px", background: "#EEECE6" }}><div style={{ width: "2%", height: "6px", borderRadius: "3px", background: "#111111" }}></div></div></div>
        </div>
      </div>
      <div style={{ padding: "14px", borderRadius: "18px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>Main VIP · booked with Maya R.</span><span style={{ font: "500 13px 'Instrument Sans', sans-serif" }}>★★★★★</span></div>
        <p style={{ margin: "0", font: "400 14px/1.45 'Instrument Sans', sans-serif", color: "#333331" }}>Table was exactly where the map showed. Maya met us at the side door, no line.</p>
        <div style={{ display: "flex", gap: "6px" }}><span style={{ width: "64px", height: "64px", borderRadius: "10px", background: "#D9D6CC" }}></span><span style={{ width: "64px", height: "64px", borderRadius: "10px", background: "#CFCDC6" }}></span></div>
      </div>
      <div style={{ padding: "14px", borderRadius: "18px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ font: "600 13px 'Instrument Sans', sans-serif" }}>Booth · booked with Jordan K.</span><span style={{ font: "500 13px 'Instrument Sans', sans-serif" }}>★★★★☆</span></div>
        <p style={{ margin: "0", font: "400 14px/1.45 'Instrument Sans', sans-serif", color: "#333331" }}>Great sound. Booths get tight past 1am but the bottle menu matched the app.</p>
      </div>
    </section>
  </div>

  <div className="sticky-bottom" style={{ padding: "12px 16px 28px", background: "#FFFFFF" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 8px 8px 10px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}>
      <span style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#5B5A55", display: "flex", alignItems: "center", justifyContent: "center", font: "700 13px Archivo, sans-serif", flexShrink: "0" }}>{v.promoterInitials}</span>
      <span style={{ flex: "1", minWidth: "0", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>{v.barTitle}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6", whiteSpace: "nowrap" }}>{v.barSub}</span></span>
      <Link to="/offer" style={{ height: "48px", padding: "0 18px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", gap: "6px", font: "600 15px 'Instrument Sans', sans-serif", whiteSpace: "nowrap" }}>Offer<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></Link>
    </div>
  </div>
</div>
  );
}
