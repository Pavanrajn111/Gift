// CHARIS Luxury Visual Assets & SVG Definitions (matching user's master design)

export function getBoxSVG(prefix: string): string {
  const p = prefix;
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gift box">
<defs>
<linearGradient id="${p}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c2825"/><stop offset="1" stop-color="#171412"/></linearGradient>
<linearGradient id="${p}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#151210"/><stop offset="1" stop-color="#0a0908"/></linearGradient>
<linearGradient id="${p}r" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b08a55"/><stop offset=".3" stop-color="#f4e1b4"/><stop offset=".62" stop-color="#d6b274"/><stop offset="1" stop-color="#97713c"/></linearGradient>
<radialGradient id="${p}g"><stop offset="0" stop-color="#fff4c6"/><stop offset=".55" stop-color="#f0b64a" stop-opacity=".55"/><stop offset="1" stop-color="#e8a93c" stop-opacity="0"/></radialGradient>
</defs>
<ellipse cx="150" cy="272" rx="108" ry="12" fill="#000" opacity=".3"/>
<g class="bd"><rect x="60" y="140" width="140" height="120" fill="url(#${p}f)"/><polygon points="200,140 250,120 250,240 200,260" fill="url(#${p}s)"/>
<polygon class="inner" points="60,140 200,140 250,120 110,120" fill="#f0b64a" opacity="0"/>
<g class="rb"><rect x="117" y="140" width="26" height="120" fill="url(#${p}r)"/><rect x="60" y="192" width="140" height="20" fill="url(#${p}r)"/><polygon points="200,192 250,172 250,192 200,212" fill="url(#${p}r)" opacity=".85"/></g></g>
<ellipse class="glow" cx="155" cy="122" rx="110" ry="60" fill="url(#${p}g)" opacity="0"/>
<g class="lid"><rect x="50" y="105" width="160" height="38" fill="url(#${p}f)"/><polygon points="210,105 260,87 260,125 210,143" fill="url(#${p}s)"/><polygon points="50,105 210,105 260,87 100,87" fill="#383430"/>
<rect x="117" y="105" width="26" height="38" fill="url(#${p}r)"/><polygon points="117,105 143,105 193,87 167,87" fill="url(#${p}r)"/>
<g class="bow"><path class="t1" d="M155 98 L128 128 L141 132 L158 104Z" fill="url(#${p}r)"/><path class="t2" d="M155 98 L184 126 L171 131 L152 104Z" fill="url(#${p}r)"/>
<ellipse class="lp1" cx="133" cy="90" rx="23" ry="12" transform="rotate(-22 133 90)" fill="url(#${p}r)"/><ellipse class="lp2" cx="177" cy="90" rx="23" ry="12" transform="rotate(22 177 90)" fill="url(#${p}r)"/>
<ellipse cx="133" cy="90" rx="12" ry="5" transform="rotate(-22 133 90)" fill="#97713c" opacity=".45"/><ellipse cx="177" cy="90" rx="12" ry="5" transform="rotate(22 177 90)" fill="#97713c" opacity=".45"/>
<circle class="kn" cx="155" cy="94" r="9" fill="url(#${p}r)"/></g></g></svg>`;
}

export function getFlowerSVG(a: string, b: string): string {
  let s = `<svg viewBox="0 0 120 160"><path d="M60 70C58 100 66 130 56 158" stroke="#6f7f62" stroke-width="3" fill="none"/><path d="M60 118C40 110 32 98 30 90C48 92 58 102 60 118Z" fill="#8a9a78"/>`;
  for (let i = 0; i < 6; i++) {
    s += `<ellipse cx="60" cy="40" rx="13" ry="28" fill="${a}" transform="rotate(${i * 60} 60 62)" opacity=".92"/>`;
  }
  return s + `<circle cx="60" cy="62" r="9" fill="${b}"/></svg>`;
}

export const RIBBON_SVG = `<svg viewBox="0 0 200 120"><defs><linearGradient id="rbg" x1="0" x2="1"><stop offset="0" stop-color="#a53e35"/><stop offset=".5" stop-color="#cf6a5f"/><stop offset="1" stop-color="#8f322b"/></linearGradient></defs><path d="M5 20C50 -5 70 70 110 45S170 5 195 40L195 62C170 30 140 70 108 70S45 20 5 44Z" fill="url(#rbg)"/></svg>`;

export function getProductArtSVG(kind: string): string {
  const f = '#11100F', c = '#D9C6A7', r = '#A53E35', i = '#FAF5EC';
  const m: Record<string, string> = {
    candle: `<rect x="55" y="80" width="90" height="85" rx="10" fill="#7a4a2a"/><rect x="55" y="80" width="90" height="16" rx="6" fill="#4d2d19"/><rect x="62" y="105" width="76" height="40" fill="${i}" opacity=".92"/><text x="100" y="131" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="14" fill="${f}">AMBER</text><path d="M100 36C88 54 92 66 100 70C108 66 112 54 100 36Z" fill="#f0b64a"/><rect x="99" y="68" width="2" height="14" fill="${f}"/>`,
    journal: `<rect x="48" y="30" width="104" height="142" rx="4" fill="#5c6b58"/><rect x="48" y="30" width="12" height="142" fill="#47543f"/><rect x="132" y="30" width="8" height="46" fill="${r}"/><rect x="72" y="62" width="58" height="34" fill="none" stroke="${c}"/><text x="101" y="84" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="13" fill="${c}">JOURNAL</text>`,
    scarf: `<path d="M40 60C80 40 120 80 160 56L168 108C128 132 90 94 46 116Z" fill="${r}"/><path d="M46 116L40 168L62 160L66 112M160 110L170 164L148 156L146 112" fill="#8f322b"/><path d="M52 80C90 64 124 98 164 78" stroke="${c}" stroke-width="2" fill="none"/>`,
    mug: `<rect x="40" y="70" width="64" height="76" rx="8" fill="${i}" stroke="#c9b99a"/><path d="M104 88C128 88 128 124 104 124" stroke="#c9b99a" stroke-width="8" fill="none"/><rect x="40" y="70" width="64" height="14" fill="${c}"/><rect x="96" y="100" width="58" height="62" rx="8" fill="#8f5b3c"/><path d="M154 112C172 112 172 146 154 146" stroke="#8f5b3c" stroke-width="7" fill="none"/>`,
    plant: `<path d="M70 120H130L122 170H78Z" fill="#b5694a"/><rect x="66" y="112" width="68" height="12" rx="3" fill="#9a563a"/><ellipse cx="100" cy="80" rx="12" ry="36" fill="#5f7a4f"/><ellipse cx="78" cy="92" rx="10" ry="30" fill="#6f8c5e" transform="rotate(-35 78 92)"/><ellipse cx="122" cy="92" rx="10" ry="30" fill="#4f6a42" transform="rotate(35 122 92)"/>`,
    pendant: `<rect x="46" y="86" width="108" height="74" rx="4" fill="${f}"/><rect x="46" y="86" width="108" height="24" fill="#2b2724"/><path d="M62 98C88 52 112 52 138 98" stroke="${c}" stroke-width="2" fill="none"/><circle cx="100" cy="122" r="12" fill="none" stroke="${c}" stroke-width="3"/><circle cx="100" cy="122" r="3" fill="${c}"/>`
  };
  return `<svg viewBox="0 0 200 200" role="img" aria-label="${kind}">${m[kind] || m.candle}</svg>`;
}
