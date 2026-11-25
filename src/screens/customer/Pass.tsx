import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Pass() {
  const [state, setState] = useMergeState({ extra: 0 });
  const v = (() => {
    const n = 17;
    const cells = [];
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const finder = (cx: number, cy: number) => x >= cx && x < cx + 5 && y >= cy && y < cy + 5 && (x === cx || x === cx + 4 || y === cy || y === cy + 4 || (x === cx + 2 && y === cy + 2));
        const inFinderZone = (x < 6 && y < 6) || (x > 10 && y < 6) || (x < 6 && y > 10);
        let on;
        if (inFinderZone) on = finder(0, 0) || finder(12, 0) || finder(0, 12);
        else on = ((x * 7 + y * 13 + x * y) % 5) < 2;
        cells.push(on ? '#111111' : '#FFFFFF');
      }
    }
    const base = [
      ['PM', 'You (Priya)', 'Pass sent'],
      ['JL', 'Jess L.', 'Pass sent'],
      ['RK', 'Raj K.', 'Pass sent'],
      ['MT', 'Marcus T.', 'Pass sent'],
      ['TS', 'Tom S.', 'Pass sent']
    ];
    const extras = [['AB', 'Amira B.', 'Just added']];
    const list = base.concat(extras.slice(0, state.extra));
    return {
      cells: cells,
      guests: list.map((g, i) => ({ initials: g[0], name: g[1], status: g[2], line: i < list.length - 1 ? '1px solid #EEECE6' : '0' })),
      countLabel: list.length + ' of 10 spots used',
      addLabel: state.extra >= 1 ? '+ Add another guest' : '+ Add a guest',
      addGuest: () => setState({ extra: Math.min(1, state.extra + 1) })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 12px", display: "flex", alignItems: "center", gap: "12px" }}>
    <Link to="/split" aria-label="Back" style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
    <h1 style={{ margin: "0", font: "800 26px Archivo, sans-serif", letterSpacing: "-0.03em" }}>Your table pass</h1>
  </div>

  <div style={{ flex: "1", padding: "4px 16px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
    <div style={{ borderRadius: "26px", background: "#111111", color: "#FFFFFF", overflow: "hidden" }}>
      <div style={{ padding: "16px 18px", display: "flex", gap: "16px", alignItems: "center" }}>
        <div style={{ width: "118px", height: "118px", padding: "8px", boxSizing: "border-box", borderRadius: "14px", background: "#FFFFFF", display: "grid", gridTemplateColumns: "repeat(17, minmax(0, 1fr))", flexShrink: "0" }} role="img" aria-label="Table check-in QR code">
          {v.cells.map((c, cIdx) => (
                <Fragment key={cIdx}><span style={{ background: c, aspectRatio: "1" }}></span></Fragment>
                ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span style={{ font: "800 26px/0.95 Archivo, sans-serif", letterSpacing: "-0.04em" }}>44 TORONTO</span>
          <span style={{ font: "400 13px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>Sat Nov 28 · V2 Main VIP</span>
          <span className="bpop" style={{ alignSelf: "flex-start", height: "26px", padding: "0 10px", borderRadius: "999px", background: "#C8FF3D", color: "#111111", display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif" }}>Locked in</span>
        </div>
      </div>
      <div style={{ borderTop: "1px dashed #4A4A46", padding: "12px 18px", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px", font: "400 12px 'Instrument Sans', sans-serif", color: "#CFCDC6" }}>
        <span><span style={{ display: "block", font: "600 14px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>11:30pm</span>arrive by</span>
        <span><span style={{ display: "block", font: "600 14px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>Side door</span>entrance</span>
        <span><span style={{ display: "block", font: "600 14px 'Instrument Sans', sans-serif", color: "#FFFFFF" }}>Maya R.</span>your host</span>
      </div>
    </div>

    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
      <h2 style={{ margin: "0", font: "700 18px Archivo, sans-serif" }}>Guest list</h2>
      <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{v.countLabel}</span>
    </div>
    <div style={{ borderRadius: "22px", background: "#FFFFFF", padding: "4px 14px", display: "flex", flexDirection: "column" }}>
      {v.guests.map((g, gIdx) => (
            <Fragment key={gIdx}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "9px 0", borderBottom: g.line }}>
          <span style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 11px Archivo, sans-serif" }}>{g.initials}</span>
          <span style={{ flex: "1", font: "600 14px 'Instrument Sans', sans-serif" }}>{g.name}</span>
          <span style={{ font: "500 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>{g.status}</span>
        </div>
      </Fragment>
            ))}
    </div>
    <button onClick={v.addGuest} style={{ height: "46px", borderRadius: "16px", border: "1.5px dashed #B5B2A8", background: "transparent", font: "600 14px 'Instrument Sans', sans-serif", color: "#111111", cursor: "pointer" }}>{v.addLabel}</button>
  </div>

  <div style={{ padding: "12px 20px 28px", display: "flex", gap: "10px" }}>
    <Link to="/night-of" style={{ flex: "1", height: "54px", borderRadius: "999px", border: "1.5px solid #111111", display: "flex", alignItems: "center", justifyContent: "center", font: "600 14px 'Instrument Sans', sans-serif" }}>Rides &amp; tab</Link>
    <button style={{ flex: "1", height: "54px", borderRadius: "999px", border: "0", background: "#111111", color: "#FFFFFF", font: "600 14px 'Instrument Sans', sans-serif" }}>Add to Wallet</button>
  </div>
</div>
  );
}
