import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Rate() {
  const [state, setState] = useMergeState({ stars: 5, tags: { fast: true, table: true } as Record<string, boolean> });
  const v = (() => {
    const tags = [['fast', 'Fast replies'], ['table', 'Table as promised'], ['entry', 'No-line entry'], ['price', 'Fair price'], ['vibe', 'Great vibe'], ['service', 'Attentive service']];
    const t = state.tags;
    return {
      clubStars: [1, 2, 3, 4, 5].map((n) => ({
        label: n + ' star' + (n > 1 ? 's' : ''),
        bg: n <= state.stars ? '#111111' : '#F3F2EE',
        fill: n <= state.stars ? '#C8FF3D' : '#B5B2A8',
        pick: () => setState({ stars: n })
      })),
      tags: tags.map(([id, label]) => {
        const on = !!t[id];
        return { label: label, pressed: on ? true : false, border: on ? '1.5px solid #111111' : '1px solid #D9D6CC', bg: on ? '#111111' : '#FFFFFF', fg: on ? '#FFFFFF' : '#111111', toggle: () => setState({ tags: Object.assign({}, t, { [id]: !on }) }) };
      })
    };
  })();

  return (
    <div style={{ width: "100%", minHeight: "100dvh", boxSizing: "border-box", background: "#FFFFFF", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", overflow: "hidden" }}>
  <div style={{ padding: "52px 20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ font: "500 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Sun Nov 29 · 1:12pm</span>
    <Link to="/profile" style={{ font: "600 13px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Skip</Link>
  </div>

  <div style={{ flex: "1", padding: "18px 20px 0", display: "flex", flexDirection: "column", gap: "20px" }}>
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <h1 style={{ margin: "0", font: "800 32px/1 Archivo, sans-serif", letterSpacing: "-0.04em" }}>How was<br />44 Toronto?</h1>
      <span style={{ font: "400 14px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>V2 Main VIP · Sat Nov 28 · 6 guests checked in</span>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <span style={{ font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58" }}>The club</span>
      <div style={{ display: "flex", gap: "8px" }}>
        {v.clubStars.map((s, sIdx) => (
              <Fragment key={sIdx}>
          <button onClick={s.pick} aria-label={s.label} style={{ width: "56px", height: "56px", borderRadius: "16px", border: "0", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><svg width="26" height="26" viewBox="0 0 24 24" fill={s.fill} aria-hidden="true"><path d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z" /></svg></button>
        </Fragment>
              ))}
      </div>
    </div>

    <div style={{ padding: "16px", borderRadius: "22px", background: "#F3F2EE", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#5B5A55", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 14px Archivo, sans-serif" }}>MR</span>
        <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "1px" }}><span style={{ font: "600 15px 'Instrument Sans', sans-serif" }}>Your host, Maya R.</span><span style={{ font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>What stood out?</span></span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {v.tags.map((t, tIdx) => (
              <Fragment key={tIdx}>
          <button onClick={t.toggle} aria-pressed={t.pressed} style={{ height: "38px", padding: "0 14px", borderRadius: "999px", border: t.border, background: t.bg, color: t.fg, font: "600 13px 'Instrument Sans', sans-serif", cursor: "pointer" }}>{t.label}</button>
        </Fragment>
              ))}
      </div>
    </div>

    <label style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <span style={{ font: "600 12px 'Instrument Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase", color: "#5E5D58" }}>Anything else?</span>
      <textarea placeholder="Tell other guests what the night was like" style={{ height: "84px", padding: "12px 14px", boxSizing: "border-box", borderRadius: "16px", border: "1px solid #E4E2DC", background: "#FFFFFF", resize: "none", font: "400 14px/1.4 'Instrument Sans', sans-serif", color: "#111111" }}></textarea>
    </label>
    <button style={{ height: "48px", borderRadius: "16px", border: "1.5px dashed #B5B2A8", background: "transparent", font: "600 14px 'Instrument Sans', sans-serif", color: "#111111" }}>+ Add photos from the night</button>
  </div>

  <div style={{ padding: "12px 20px 28px", display: "flex", flexDirection: "column", gap: "8px" }}>
    <Link to="/profile" style={{ height: "56px", borderRadius: "999px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "600 16px 'Instrument Sans', sans-serif" }}>Post review</Link>
    <span style={{ textAlign: "center", font: "400 12px 'Instrument Sans', sans-serif", color: "#5E5D58" }}>Shown as a verified booking on the club page.</span>
  </div>
</div>
  );
}
