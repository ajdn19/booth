import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function NightOf() {
  const [state, setState] = useMergeState({ provider: 'uber', booked: false });
  const v = (() => {
    const ps = [['uber', 'Uber', '~$24 · 4 min away'], ['lyft', 'Lyft', '~$22 · 7 min away']];
    const cur = ps.find((p) => p[0] === state.provider)!;
    return {
      headline: 'Doors in 1h 12m',
      notBooked: !state.booked,
      booked: state.booked,
      rideName: cur[1],
      providers: ps.map(([id, name, eta]) => ({ name: name, eta: eta, border: id === state.provider ? '2px solid #111111' : '1px solid #E4E2DC', pick: () => setState({ provider: id }) })),
      book: () => setState({ booked: true })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 18px", background: "#111111", color: "#FFFFFF", borderRadius: "0 0 28px 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Link to="/pass" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#2A2A28", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
      <Link to="/pass" style={{ height: "36px", padding: "0 14px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", font: "600 13px 'Instrument Sans', sans-serif" }}>Show pass</Link>
    </div>
    <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>44 Toronto · V2 · Sat Nov 28</span>
    <span style={{ font: "800 34px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>{v.headline}</span>
  </div>

  <div style={{ flex: "1", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 style={{ margin: "0", font: "700 17px Archivo, sans-serif" }}>Ride there</h2><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Home → side entrance · 14 min</span></div>
      {v.notBooked ? (
            <>
        <div style={{ display: "flex", gap: "8px" }}>
          {v.providers.map((p, pIdx) => (
                <Fragment key={pIdx}>
            <button onClick={p.pick} style={{ flex: "1", height: "54px", borderRadius: "16px", border: p.border, background: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px", cursor: "pointer", color: "#111111" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{p.name}</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{p.eta}</span></button>
          </Fragment>
                ))}
        </div>
        <button onClick={v.book} style={{ height: "48px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 14px 'Instrument Sans', sans-serif", cursor: "pointer" }}>Book pickup for 11:15pm</button>
      </>
            ) : null}
      {v.booked ? (
            <>
        <div className="bpop" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "16px", background: "#C8FF3D" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="M5 17h14l-1.5-6.5A2 2 0 0 0 15.6 9H8.4a2 2 0 0 0-1.9 1.5zM7 17v2M17 17v2" /></svg>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 14px 'Instrument Sans', sans-serif" }}>{v.rideName} booked · pickup 11:15pm</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#333331" }}>Driver details arrive 10 min before</span></span>
        </div>
      </>
            ) : null}
    </section>

    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 style={{ margin: "0", font: "700 17px Archivo, sans-serif" }}>Your tab</h2><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Visa ••• 4417 on file</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}><span style={{ font: "800 32px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>$2,340</span><span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>min $1,850 ✓ covered</span></div>
      <div style={{ height: "8px", borderRadius: "4px", background: "#EEECE6", overflow: "hidden" }}><div style={{ width: "100%", height: "8px", borderRadius: "4px", background: "#111111" }}></div></div>
      <span style={{ font: "400 13px/1.4 'Instrument Sans', sans-serif", color: "#333331" }}>4 bottles ordered at the table. Charged automatically at close (2:30am), split evenly with your group, minus the $507 deposit.</span>
    </section>

    <section style={{ padding: "16px", borderRadius: "22px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "12px" }}>
      <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: "700 17px Archivo, sans-serif" }}>Get me home</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>One tap at close. Shares your trip with your group.</span></span>
      <button style={{ height: "44px", padding: "0 16px", borderRadius: "999px", border: "0", background: "#C8FF3D", color: "#111111", font: "600 13px 'Instrument Sans', sans-serif" }}>Ride home</button>
    </section>
  </div>
  <div style={{ height: "28px" }}></div>
</div>
  );
}
