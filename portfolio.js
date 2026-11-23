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

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
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

document.getElementById('logout').addEventListener('click', () => {
  try { sessionStorage.removeItem(KEY); } catch (_) {}
  location.reload();
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

function thumbFor(item) {
  if (!item.thumbnail) return '';
  if (item.thumbnail === 'auto') {
    const id = driveId(item.link);
    return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w800` : '';
  }
  return item.thumbnail;
}

function renderItems() {
  if (grid.childElementCount) return;
  const items = window.PORTFOLIO_ITEMS || PORTFOLIO_ITEMS;

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
      const src = item.link ? thumbFor(item) : '';
      const label = escapeHtml(item.type || 'View');
      const tags = (item.skills || []).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
      const extras = (item.extras || []).map((x, i) => x.url
        ? (x.onPage
            ? `<button type="button" class="mini-btn primary extra-open" data-i="${i}">${escapeHtml(x.label)}</button>`
            : `<a class="mini-btn" href="${escapeHtml(x.url)}" target="_blank" rel="noopener">${escapeHtml(x.label)}</a>`)
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
          <div class="actions">
            ${item.link ? `<button type="button" class="mini-btn primary open">${escapeHtml(item.openLabel || 'Open')}</button>`
                        : `<span class="mini-btn disabled">Link coming soon</span>`}
            ${extras}
          </div>
          <details class="about">
            <summary>About this work sample</summary>
            ${item.what ? `<p>${escapeHtml(item.what)}</p>` : ''}
            ${item.role ? `<p><strong>My role:</strong> ${escapeHtml(item.role)}</p>` : ''}
            ${tags ? `<div class="tags">${tags}</div>` : ''}
          </details>
        </div>`;

      const img = card.querySelector('img');
      if (img) img.addEventListener('error', () => { img.replaceWith(Object.assign(document.createElement('span'), { textContent: item.type || 'View' })); });
      if (item.link) {
        card.querySelectorAll('.thumb, .title-btn, .open').forEach(el =>
          el.addEventListener('click', () => openViewer(item)));
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
