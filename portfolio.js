/* =========================================================
   PASSWORD
   This is the SHA-256 "fingerprint" of the password, not the
   password itself. To change it, open set-password.html in your
   browser, type a new password, and paste the result here.
   Current password: Portfolio2026
   ========================================================= */
const PASSWORD_HASH = "c0073cb620c0322d00e0b42b09a0275dc624c928964a85c89bf62245fdd947e5";

/* ---------- nothing below here needs editing ---------- */

document.getElementById('yr').textContent = new Date().getFullYear();

const gate = document.getElementById('gate');
const content = document.getElementById('content');
const grid = document.getElementById('grid');
const err = document.getElementById('err');
const KEY = 'rd-portfolio-unlocked';

/* Works on any connection. Uses the browser's built-in tool on HTTPS,
   and this small backup version on plain http. */
function sha256Fallback(ascii) {
  function rr(v, n) { return (v >>> n) | (v << (32 - n)); }
  const bytes = new TextEncoder().encode(ascii);
  const K = [], H = [];
  let isPrime = {}, c = 2;
  while (K.length < 64) {
    if (!isPrime[c]) {
      for (let i = c * c; i < 313; i += c) isPrime[i] = 1;
      if (H.length < 8) H.push((Math.pow(c, 1 / 2) * 4294967296) | 0);
      K.push((Math.pow(c, 1 / 3) * 4294967296) | 0);
    }
    c++;
  }
  const l = bytes.length, words = [];
  const padded = new Uint8Array(((l + 9 + 63) >> 6) << 6);
  padded.set(bytes); padded[l] = 0x80;
  const bitLen = l * 8, last = padded.length;
  padded[last - 4] = (bitLen >>> 24) & 255; padded[last - 3] = (bitLen >>> 16) & 255;
  padded[last - 2] = (bitLen >>> 8) & 255;  padded[last - 1] = bitLen & 255;
  for (let i = 0; i < padded.length; i += 4)
    words.push((padded[i] << 24) | (padded[i + 1] << 16) | (padded[i + 2] << 8) | padded[i + 3]);
  let h = H.slice();
  for (let j = 0; j < words.length; j += 16) {
    const w = words.slice(j, j + 16), old = h.slice();
    for (let i = 0; i < 64; i++) {
      if (i >= 16) {
        const w15 = w[i - 15], w2 = w[i - 2];
        w[i] = (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0;
      }
      const a = h[0], e = h[4];
      const t1 = (h[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & h[5]) ^ (~e & h[6])) + K[i] + w[i]) | 0;
      const t2 = ((rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & h[1]) ^ (a & h[2]) ^ (h[1] & h[2]))) | 0;
      h = [(t1 + t2) | 0].concat(h.slice(0, 7));
      h[4] = (h[4] + t1) | 0;
    }
    for (let i = 0; i < 8; i++) h[i] = (h[i] + old[i]) | 0;
  }
  return h.map(v => (v >>> 0).toString(16).padStart(8, '0')).join('');
}

async function sha256(text) {
  if (window.crypto && crypto.subtle) {
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (_) {}
  }
  return sha256Fallback(text);
}

function unlock() {
  gate.classList.add('hidden');
  content.classList.remove('hidden');
  renderItems();
}

gate.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pw = document.getElementById('pw').value;
  if ((await sha256(pw)) === PASSWORD_HASH) {
    try { sessionStorage.setItem(KEY, PASSWORD_HASH); } catch (_) {}
    err.textContent = '';
    unlock();
  } else {
    err.textContent = 'Sorry, that password is not correct.';
    document.getElementById('pw').select();
  }
});


// stay unlocked for this browser tab session
try { if (sessionStorage.getItem(KEY) === PASSWORD_HASH) unlock(); } catch (_) {}

/* ---------- Turn any Google link into an embeddable one ---------- */
function toEmbed(url) {
  const id = (url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || [])[1];
  if (/\/folders\//.test(url)) {
    const fid = (url.match(/\/folders\/([a-zA-Z0-9_-]+)/) || [])[1];
    return `https://drive.google.com/embeddedfolderview?id=${fid}#grid`;
  }
  if (!id) return url;
  if (url.includes('docs.google.com/document'))     return `https://docs.google.com/document/d/${id}/preview`;
  if (url.includes('docs.google.com/presentation')) return `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false`;
  if (url.includes('docs.google.com/spreadsheets')) return `https://docs.google.com/spreadsheets/d/${id}/preview`;
  if (url.includes('docs.google.com/forms'))        return url.replace(/\/(edit|viewform).*$/, '/viewform?embedded=true');
  return `https://drive.google.com/file/d/${id}/preview`;
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function driveId(url) {
  return (url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || [])[1];
}

function driveThumb(id) { return `https://drive.google.com/thumbnail?id=${id}&sz=w800`; }

// Picture order: your own image (or "drive:FILE_ID"), then Drive's preview of the main link, then the type label
function thumbsFor(item) {
  const list = [];
  const t = item.thumbnail;
  if (!t) return list;
  if (t.startsWith('drive:')) list.push(driveThumb(t.slice(6)));
  else if (t !== 'auto') list.push(t);
  const id = driveId(item.link || '');
  if (id) list.push(driveThumb(id));
  return list;
}

function renderItems() {
  if (grid.childElementCount) return;
  const items = window.PORTFOLIO_ITEMS || PORTFOLIO_ITEMS;

  const topLinks = document.getElementById('top-links');
  if (topLinks && typeof TOP_BUTTONS !== 'undefined') {
    TOP_BUTTONS.filter(t => t.url).forEach(t => {
      const cls = 'mini-btn primary' + (t.style ? ' ' + t.style : '');
      if (t.onPage) {
        const btn = document.createElement('button');
        btn.type = 'button'; btn.className = cls; btn.textContent = t.label;
        btn.addEventListener('click', () => openViewer({ title: t.label, link: t.url }));
        topLinks.appendChild(btn);
      } else {
        const a = document.createElement('a');
        a.className = cls; a.href = t.url; a.target = '_blank'; a.rel = 'noopener';
        a.innerHTML = escapeHtml(t.label) + ' &#8599;';
        topLinks.appendChild(a);
      }
    });
  }

  const intro = document.getElementById('intro');
  if (intro && typeof PORTFOLIO_INTRO !== 'undefined') intro.textContent = PORTFOLIO_INTRO;

  // group items by section, keeping their order
  const sections = [];
  items.forEach(item => {
    const name = item.section || '';
    let group = sections.find(g => g.name === name);
    if (!group) { group = { name, items: [] }; sections.push(group); }
    group.items.push(item);
  });

  sections.forEach(group => {
    if (group.name) {
      const h = document.createElement('h3');
      h.className = 'portfolio-section-title';
      h.textContent = group.name;
      grid.appendChild(h);
    }
    const wrap = document.createElement('div');
    wrap.className = 'portfolio-grid';
    grid.appendChild(wrap);

    group.items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card' + (item.link ? '' : ' pending');
      const srcs = item.link ? thumbsFor(item) : [];
      const src = srcs[0] || '';
      const label = escapeHtml(item.type || 'View');
      const tags = (item.skills || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
      const extras = (item.extras || []).map((x, i) => x.url
        ? (x.onPage
            ? `<button type="button" class="mini-btn primary extra-open" data-i="${i}">${escapeHtml(x.label)}</button>`
            : `<a class="mini-btn" href="${escapeHtml(x.url)}" target="_blank" rel="noopener">${escapeHtml(x.label)} &#8599;</a>`)
        : `<span class="mini-btn disabled">${escapeHtml(x.label)}: coming soon</span>`).join('');

      card.innerHTML = `
        <button type="button" class="thumb" ${item.link ? '' : 'disabled'} aria-label="Open ${escapeHtml(item.title)}">
          ${src ? `<img src="${escapeHtml(src)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : `<span>${label}</span>`}
        </button>
        <div class="body">
          <div class="type">${escapeHtml(item.type)}</div>
          <h4>${item.link
            ? `<button type="button" class="title-btn">${escapeHtml(item.title)}</button>`
            : escapeHtml(item.title)}</h4>
          ${item.note ? `<p class="card-note">${escapeHtml(item.note)}</p>` : ''}
          <div class="actions">
            ${!item.link ? `<span class="mini-btn disabled">Link coming soon</span>`
              : item.mainAction
                ? `<a class="mini-btn primary" href="${escapeHtml(item.mainAction.url)}" target="_blank" rel="noopener">${escapeHtml(item.mainAction.label)}</a>`
                : `<button type="button" class="mini-btn primary open">${escapeHtml(item.openLabel || 'Open')}</button>`}
            ${extras}
          </div>
          <details class="about">
            <summary>Read more</summary>
            ${item.what ? `<p>${escapeHtml(item.what)}</p>` : ''}
            ${item.role ? `<p><strong>My role:</strong> ${escapeHtml(item.role)}</p>` : ''}
            ${tags ? `<div class="tags">${tags}</div>` : ''}
          </details>
        </div>`;

      const img = card.querySelector('img');
      if (img) {
        let n = 0;
        img.addEventListener('error', () => {
          n++;
          if (n < srcs.length) img.src = srcs[n];
          else img.replaceWith(Object.assign(document.createElement('span'), { textContent: item.type || 'View' }));
        });
      }
      if (item.link) {
        // with a mainAction, the picture and title open the first on-page extra (e.g. a video) if there is one
        const pageExtra = item.mainAction && (item.extras || []).find(x => x.onPage && x.url);
        const go = !item.mainAction ? () => openViewer(item)
          : pageExtra ? () => openViewer({ title: `${item.title}: ${pageExtra.label}`, link: pageExtra.url })
          : () => window.open(item.mainAction.url, '_blank', 'noopener');
        card.querySelectorAll('.thumb, .title-btn, .open').forEach(el => el.addEventListener('click', go));
      }
      card.querySelectorAll('.extra-open').forEach(el => {
        const x = item.extras[el.dataset.i];
        el.addEventListener('click', () => openViewer({ title: `${item.title}: ${x.label}`, link: x.url }));
      });
      wrap.appendChild(card);
    });
  });
}

/* ---------- Viewer ---------- */
const viewer = document.getElementById('viewer');
const frame = document.getElementById('viewer-frame');

function openViewer(item) {
  document.getElementById('viewer-title').textContent = item.title;
  document.getElementById('viewer-open').href = item.link;
  frame.src = toEmbed(item.link);
  viewer.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('viewer-close').focus();
}
function closeViewer() {
  viewer.classList.remove('open');
  frame.src = 'about:blank';
  document.body.style.overflow = '';
}
document.getElementById('viewer-close').addEventListener('click', closeViewer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeViewer(); });
