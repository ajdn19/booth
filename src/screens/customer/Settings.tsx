import { Fragment } from 'react';
import { Link } from 'react-router';
import { useMergeState } from '../../lib/useMergeState';

export default function Settings() {
  const [state, setState] = useMergeState({ lang: 'en', a: { big: false, motion: false, contrast: false } as Record<string, boolean>, n: { replies: true, locked: true, opening: true, deals: false } as Record<string, boolean> });
  const v = (() => {
    const fr = state.lang === 'fr';
    const t = fr ? {
      back: 'Retour', title: 'Réglages', language: 'Langue', langNote: 'Toute l’app, les reçus et les messages des promoteurs passent en français.',
      access: 'Accessibilité', sr: 'Chaque bouton est étiqueté pour VoiceOver et TalkBack.', notify: 'Notifications', pay: 'Paiement et identité',
      default: 'Carte par défaut pour les dépôts et l’addition', addCard: '+ Ajouter une carte', id: 'Pièce d’identité vérifiée · 19+', verified: 'Vérifiée'
    } : {
      back: 'Back', title: 'Settings', language: 'Language', langNote: 'Switches the whole app, receipts and promoter messages.',
      access: 'Accessibility', sr: 'Every button is labelled for VoiceOver and TalkBack.', notify: 'Notifications', pay: 'Payment & ID',
      default: 'Default card for deposits and your tab', addCard: '+ Add a card', id: 'Government ID verified · 19+', verified: 'Verified'
    };
    const A = state.a;
    const N = state.n;
    const big = A.big;
    const sw = (on: boolean) => ({ track: on ? '#111111' : '#D9D6CC', knob: on ? '21px' : '3px', checked: on ? true : false });
    const a11y = [
      ['big', fr ? 'Texte plus grand' : 'Larger text', fr ? 'Agrandit le texte partout' : 'Bumps text size across the app'],
      ['motion', fr ? 'Réduire les animations' : 'Reduce motion', fr ? 'Moins d’effets de mouvement' : 'Fewer moving effects'],
      ['contrast', fr ? 'Contraste élevé' : 'High contrast', fr ? 'Bordures et textes plus marqués' : 'Stronger borders and text']
    ];
    const alerts = [
      ['replies', fr ? 'Réponses des promoteurs' : 'Promoter replies'],
      ['locked', fr ? 'Table confirmée et rappels' : 'Table locked & reminders'],
      ['opening', fr ? 'Tables qui se libèrent' : 'Tables opening up'],
      ['deals', fr ? 'Offres de dernière minute' : 'Last-minute deals']
    ];
    return {
      t: t,
      h1: big ? '32px' : '28px', h2: big ? '21px' : '18px', body: big ? '17px' : '14px', small: big ? '14px' : '12px',
      enBg: fr ? 'transparent' : '#FFFFFF', frBg: fr ? '#FFFFFF' : 'transparent', enPressed: !fr, frPressed: fr ? true : false,
      setEn: () => setState({ lang: 'en' }), setFr: () => setState({ lang: 'fr' }),
      a11y: a11y.map(([id, title, desc], i) => Object.assign({ title: title, desc: desc, line: i < a11y.length - 1 ? '1px solid #EEECE6' : '0', toggle: () => setState({ a: Object.assign({}, A, { [id]: !A[id] }) }) }, sw(A[id]))),
      alerts: alerts.map(([id, title], i) => Object.assign({ title: title, line: i < alerts.length - 1 ? '1px solid #EEECE6' : '0', toggle: () => setState({ n: Object.assign({}, N, { [id]: !N[id] }) }) }, sw(N[id])))
    };
  })();

  return (
    <div style={{ width: "100%", boxSizing: "border-box", background: "#F3F2EE", color: "#111111", fontFamily: "'Instrument Sans', sans-serif", display: "flex", flexDirection: "column", paddingBottom: "30px", minHeight: "100dvh" }}>
  <div style={{ padding: "52px 20px 14px", display: "flex", alignItems: "center", gap: "12px" }}>
    <Link to="/profile" aria-label={v.t.back} style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></Link>
    <h1 style={{ margin: "0", font: `800 ${v.h1} Archivo, sans-serif`, letterSpacing: "-0.03em" }}>{v.t.title}</h1>
  </div>

  <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "14px" }}>
    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "12px" }}>
      <h2 style={{ margin: "0", font: `700 ${v.h2} Archivo, sans-serif` }}>{v.t.language}</h2>
      <div style={{ display: "flex", gap: "6px", padding: "4px", borderRadius: "999px", background: "#F3F2EE" }}>
        <button onClick={v.setEn} aria-pressed={v.enPressed} style={{ flex: "1", height: "42px", borderRadius: "999px", border: "0", background: v.enBg, font: `600 ${v.body} 'Instrument Sans', sans-serif`, color: "#111111", cursor: "pointer" }}>English</button>
        <button onClick={v.setFr} aria-pressed={v.frPressed} style={{ flex: "1", height: "42px", borderRadius: "999px", border: "0", background: v.frBg, font: `600 ${v.body} 'Instrument Sans', sans-serif`, color: "#111111", cursor: "pointer" }}>Français</button>
      </div>
      <span style={{ font: `400 ${v.small} 'Instrument Sans', sans-serif`, color: "#5E5D58" }}>{v.t.langNote}</span>
    </section>

    <section style={{ padding: "6px 16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
      <h2 style={{ margin: "0", padding: "10px 0 4px", font: `700 ${v.h2} Archivo, sans-serif` }}>{v.t.access}</h2>
      {v.a11y.map((s, sIdx) => (
            <Fragment key={sIdx}>
        <button onClick={s.toggle} role="switch" aria-checked={s.checked} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", border: "0", borderBottom: s.line, background: "transparent", textAlign: "left", cursor: "pointer", color: "#111111" }}>
          <span style={{ flex: "1", display: "flex", flexDirection: "column", gap: "2px" }}><span style={{ font: `600 ${v.body} 'Instrument Sans', sans-serif` }}>{s.title}</span><span style={{ font: `400 ${v.small} 'Instrument Sans', sans-serif`, color: "#5E5D58" }}>{s.desc}</span></span>
          <span style={{ width: "46px", height: "28px", borderRadius: "999px", background: s.track, position: "relative", flexShrink: "0" }}><span style={{ position: "absolute", top: "3px", left: s.knob, width: "22px", height: "22px", borderRadius: "50%", background: "#FFFFFF" }}></span></span>
        </button>
      </Fragment>
            ))}
      <span style={{ padding: "10px 0 12px", font: `400 ${v.small} 'Instrument Sans', sans-serif`, color: "#5E5D58" }}>{v.t.sr}</span>
    </section>

    <section style={{ padding: "6px 16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column" }}>
      <h2 style={{ margin: "0", padding: "10px 0 4px", font: `700 ${v.h2} Archivo, sans-serif` }}>{v.t.notify}</h2>
      {v.alerts.map((s, sIdx) => (
            <Fragment key={sIdx}>
        <button onClick={s.toggle} role="switch" aria-checked={s.checked} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", border: "0", borderBottom: s.line, background: "transparent", textAlign: "left", cursor: "pointer", color: "#111111" }}>
          <span style={{ flex: "1", font: `600 ${v.body} 'Instrument Sans', sans-serif` }}>{s.title}</span>
          <span style={{ width: "46px", height: "28px", borderRadius: "999px", background: s.track, position: "relative", flexShrink: "0" }}><span style={{ position: "absolute", top: "3px", left: s.knob, width: "22px", height: "22px", borderRadius: "50%", background: "#FFFFFF" }}></span></span>
        </button>
      </Fragment>
            ))}
    </section>

    <section style={{ padding: "16px", borderRadius: "22px", background: "#FFFFFF", display: "flex", flexDirection: "column", gap: "10px" }}>
      <h2 style={{ margin: "0", font: `700 ${v.h2} Archivo, sans-serif` }}>{v.t.pay}</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "16px", border: "2px solid #111111" }}>
        <span style={{ width: "44px", height: "30px", borderRadius: "6px", background: "#111111", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", font: "700 10px Archivo, sans-serif" }}>VISA</span>
        <span style={{ flex: "1", display: "flex", flexDirection: "column" }}><span style={{ font: `600 ${v.body} 'Instrument Sans', sans-serif` }}>•••• 4417</span><span style={{ font: `400 ${v.small} 'Instrument Sans', sans-serif`, color: "#5E5D58" }}>{v.t.default}</span></span>
        <span style={{ font: `600 ${v.small} 'Instrument Sans', sans-serif` }}>✓</span>
      </div>
      <button style={{ height: "44px", borderRadius: "14px", border: "1.5px dashed #B5B2A8", background: "transparent", font: `600 ${v.body} 'Instrument Sans', sans-serif`, color: "#111111" }}>{v.t.addCard}</button>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", borderRadius: "16px", background: "#F3F2EE" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="12" r="2.5" /><path d="M14 10h4M14 14h3" /></svg>
        <span style={{ flex: "1", font: `500 ${v.small} 'Instrument Sans', sans-serif` }}>{v.t.id}</span>
        <span style={{ height: "24px", padding: "0 9px", borderRadius: "999px", background: "#C8FF3D", display: "flex", alignItems: "center", font: "600 11px 'Instrument Sans', sans-serif" }}>{v.t.verified}</span>
      </div>
    </section>
  </div>
</div>
  );
}
