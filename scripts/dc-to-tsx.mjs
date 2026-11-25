// Converts a Booth design artboard (design/*.dc.html) into a React TSX screen.
// usage: node scripts/dc-to-tsx.mjs design/Club.dc.html Club scripts/routes.json > src/screens/customer/Club.tsx
// The output is a starting point: add types where tsc asks for them, then refine by hand.
import fs from 'node:fs';
import { parseDocument } from 'htmlparser2';

const [, , src, name, routesPath] = process.argv;
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
const html = fs.readFileSync(src, 'utf8');

const xdc = html.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1].replace(/<helmet>[\s\S]*?<\/helmet>/, '');
const script = html.match(/<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/)[1];

const routeFor = (file) => {
  const key = file.replace(/\.dc\.html$/, '');
  if (!(key in routes)) throw new Error('no route for ' + file);
  return routes[key];
};

// ---------- logic ----------
function braceBlock(text, startIdx) {
  // startIdx points at '{'
  let depth = 0;
  for (let i = startIdx; i < text.length; i++) {
    const c = text[i];
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) return text.slice(startIdx + 1, i); }
    else if (c === "'" || c === '"' || c === '`') {
      const q = c; i++;
      while (i < text.length && text[i] !== q) { if (text[i] === '\\') i++; i++; }
    }
  }
  throw new Error('unbalanced');
}
let initState = null;
const ctor = script.indexOf('this.state =');
if (ctor >= 0) {
  const b = script.indexOf('{', ctor);
  initState = '{' + braceBlock(script, b) + '}';
}
const rvIdx = script.indexOf('renderVals()');
let rvBody = braceBlock(script, script.indexOf('{', rvIdx));
rvBody = rvBody
  .replace(/this\.setState\(/g, 'setState(')
  .replace(/this\.state\b/g, 'state')
  .replace(/this\.props\.(\w+)/g, 'undefined')
  .replace(/'([A-Za-z]+)\.dc\.html'/g, (_, f) => JSON.stringify(routeFor(f)));
rvBody = rvBody
  .replace(/\? 'true' : 'false'/g, '? true : false')
  .replace(/(const \w+ = [\w.]+\.find\([^;]*?\));/g, (m, a) => (/\|\|/.test(a) ? m : a + '!;'));
if (/\bthis\b/.test(rvBody)) console.error('WARN: leftover this in ' + name);

// ---------- markup ----------
const doc = parseDocument(xdc, { lowerCaseAttributeNames: false, lowerCaseTags: false, decodeEntities: false, recognizeSelfClosing: true });

const scopes = [];
const holeExpr = (inner) => {
  const e = inner.trim();
  if (/^(true|false|null|\d+)$/.test(e)) return e;
  const head = e.split('.')[0];
  if (scopes.includes(head)) return e;
  return 'v.' + e;
};
const HOLE = /\{\{([^}]+)\}\}/g;
const onlyHole = (s) => { const m = s.match(/^\{\{([^}]+)\}\}$/); return m ? holeExpr(m[1]) : null; };
const tmpl = (s) => '`' + s.replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(HOLE, (_, e) => '${' + holeExpr(e) + '}') + '`';
const valueExpr = (s) => {
  const o = onlyHole(s); if (o) return o;
  if (HOLE.test(s)) { HOLE.lastIndex = 0; return tmpl(s); }
  return null;
};
const camel = (p) => p.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

function styleObj(str, isRoot, depth1) {
  const parts = [];
  // split on ; not inside parens
  let buf = '', d = 0;
  for (const c of str) { if (c === '(') d++; if (c === ')') d--; if (c === ';' && d === 0) { parts.push(buf); buf = ''; } else buf += c; }
  if (buf.trim()) parts.push(buf);
  const props = [];
  let hasFlex1 = false;
  for (const p of parts) {
    const i = p.indexOf(':'); if (i < 0) continue;
    const k = p.slice(0, i).trim(); let v = decode(p.slice(i + 1).trim());
    if (k === 'flex' && v === '1') hasFlex1 = true;
    props.push([k, v]);
  }
  const out = [];
  for (let [k, v] of props) {
    if (isRoot) {
      if (k === 'width' && v === '390px') v = '100%';
      if (k === 'height' && v === '844px') { k = 'minHeight'; v = '100dvh'; }
      if (k === 'min-height') v = '100dvh';
    }
    if (depth1 && hasFlex1 && k === 'overflow' && v === 'hidden') { continue; }
    const key = k.startsWith('--') ? JSON.stringify(k) : camel(k);
    const ve = valueExpr(v);
    out.push(`${key}: ${ve ?? JSON.stringify(v)}`);
  }
  if (isRoot && !props.some(([k]) => k === 'height' || k === 'min-height')) out.push(`minHeight: "100dvh"`);
  return '{{ ' + out.join(', ') + ' }}';
}

const ATTR_MAP = { class: 'className', for: 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', autocomplete: 'autoComplete', autofocus: 'autoFocus', colspan: 'colSpan', rowspan: 'rowSpan', 'xlink:href': 'xlinkHref' };
const keepHyphen = (k) => k.startsWith('aria-') || k.startsWith('data-');
const VOID = new Set(['br', 'input', 'img', 'hr', 'meta', 'link', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon', 'ellipse']);

let usesLink = false;
function attrs(node, isRoot, depth1) {
  const a = { ...node.attribs };
  const out = [];
  const hasHandler = 'onChange' in a || 'onInput' in a;
  for (let [k, raw] of Object.entries(a)) {
    if (k.startsWith('hint-')) continue;
    let key = ATTR_MAP[k] ?? (keepHyphen(k) ? k : camel(k));
    if (node.name === 'a' && k === 'href') continue; // handled by caller
    if (k === 'style') { out.push(`style=${styleObj(raw, isRoot, depth1)}`); continue; }
    if (!hasHandler && node.name !== 'option') {
      if (key === 'value' && (node.name === 'input' || node.name === 'textarea')) key = 'defaultValue';
      if (key === 'checked') key = 'defaultChecked';
    }
    if (raw === '' && !keepHyphen(k)) { out.push(key); continue; }
    const ve = valueExpr(raw);
    if (ve) out.push(`${key}={${ve}}`);
    else out.push(`${key}=${JSON.stringify(decode(raw))}`);
  }
  return out;
}

function text(t) {
  let s = t.replace(/[{}]/g, (c) => (c === '{' ? '\u0000' : '\u0001'));
  s = s.replace(/\u0000\u0000([^\u0001]+)\u0001\u0001/g, (_, e) => '{' + holeExpr(e) + '}');
  s = s.replace(/\u0000/g, "{'{'}").replace(/\u0001/g, "{'}'}");
  return s;
}

function render(node, depth, ind) {
  if (node.type === 'text') return text(node.data);
  if (node.type === 'comment') return `{/*${node.data}*/}`;
  if (node.type !== 'tag') return '';
  const kids = () => node.children.map((c) => render(c, depth + 1, ind + '  ')).join('');
  if (node.name === 'sc-for') {
    const list = onlyHole(node.attribs.list); const as = node.attribs.as;
    scopes.push(as);
    const body = kids();
    scopes.pop();
    return `{${list}.map((${as}, ${as}Idx) => (\n${ind}<Fragment key={${as}Idx}>${body}</Fragment>\n${ind}))}`;
  }
  if (node.name === 'sc-if') {
    const val = onlyHole(node.attribs.value);
    return `{${val} ? (\n${ind}<>${kids()}</>\n${ind}) : null}`;
  }
  let tag = node.name;
  const isRoot = depth === 0;
  const depth1 = depth === 1;
  const at = attrs(node, isRoot, depth1);
  if (tag === 'a' && 'href' in node.attribs) {
    const href = node.attribs.href;
    const m = href.match(/^([A-Za-z]+)\.dc\.html$/);
    if (m) { tag = 'Link'; usesLink = true; at.unshift(`to=${JSON.stringify(routeFor(m[1]))}`); }
    else if (onlyHole(href)) { tag = 'Link'; usesLink = true; at.unshift(`to={${onlyHole(href)}}`); }
    else at.unshift(`href=${JSON.stringify(decode(href))}`);
  }
  const open = `<${tag}${at.length ? ' ' + at.join(' ') : ''}`;
  if (VOID.has(node.name) && node.children.length === 0) return open + ' />';
  return `${open}>${kids()}</${tag}>`;
}

const roots = doc.children.filter((c) => c.type === 'tag');
if (roots.length !== 1) throw new Error('expected one root, got ' + roots.length);
let jsx = render(roots[0], 0, '      ');

const imports = [`import { Fragment } from 'react';`];
if (usesLink) imports.push(`import { Link } from 'react-router';`);
const usesState = initState !== null;
if (usesState) imports.push(`import { useMergeState } from '../../lib/useMergeState';`);
const usesSet = /\bsetState\(/.test(rvBody);
const usesV = /\bv\./.test(jsx);
if (!jsx.includes('Fragment')) imports.shift();

const out = `${imports.join('\n')}

export default function ${name}() {
${usesState ? `  const [state${usesSet ? ', setState' : ''}] = useMergeState(${initState});\n` : ''}${usesV ? `  const v = (() => {${rvBody}})();\n` : ''}
  return (
    ${jsx}
  );
}
`;
process.stdout.write(out);
