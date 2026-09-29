(() => {
  'use strict';

  document.querySelectorAll('.bibtex-toggle').forEach((toggle) => {
    const panel = document.createElement('div');
    panel.className = 'bibtex-panel';
    panel.id = `bibtex-${toggle.dataset.bibtex}`;
    panel.hidden = true;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', `BibTeX for ${toggle.dataset.paper}`);

    const toolbar = document.createElement('div');
    toolbar.className = 'bibtex-toolbar';
    const source = document.createElement('a');
    source.href = toggle.dataset.source;
    source.target = '_blank';
    source.rel = 'noopener noreferrer';
    source.textContent = `Source: ${toggle.dataset.provider}`;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'bibtex-copy';
    copy.textContent = 'Copy';
    copy.disabled = true;
    copy.setAttribute('aria-label', `Copy BibTeX for ${toggle.dataset.paper}`);
    toolbar.append(source, copy);

    const status = document.createElement('div');
    status.className = 'bibtex-status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    const pre = document.createElement('pre');
    pre.tabIndex = 0;
    const code = document.createElement('code');
    pre.append(code);
    panel.append(toolbar);
    if (toggle.dataset.note) {
      const note = document.createElement('div');
      note.className = 'bibtex-note';
      note.textContent = toggle.dataset.note;
      panel.append(note);
    }
    panel.append(status, pre);
    toggle.closest('.paper-links').after(panel);
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', panel.id);

    let citation = null;
    let loading = null;
    let resetCopy;

    async function loadCitation() {
      if (citation !== null) return;
      if (loading) return loading;
      status.textContent = 'Loading citation…';
      panel.setAttribute('aria-busy', 'true');
      loading = (async () => {
        try {
          const response = await fetch(toggle.href);
          if (!response.ok) throw new Error('Citation unavailable');
          const bytes = await response.arrayBuffer();
          const digest = await crypto.subtle.digest('SHA-256', bytes);
          const hash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
          if (hash !== toggle.dataset.sha256) throw new Error('Citation checksum mismatch');
          const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
          if (!/^\s*@(article|inproceedings|misc)\s*\{/i.test(text)) throw new Error('Invalid citation');
          citation = text;
          code.textContent = citation;
          copy.disabled = false;
          status.textContent = '';
        } catch (_) {
          status.textContent = 'Citation could not be loaded. Open the source above, or close and reopen to retry.';
        } finally {
          panel.removeAttribute('aria-busy');
          loading = null;
        }
      })();
      return loading;
    }

    toggle.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      panel.hidden = !panel.hidden;
      toggle.setAttribute('aria-expanded', String(!panel.hidden));
      if (!panel.hidden) loadCitation();
    });
    toggle.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        event.preventDefault();
        toggle.click();
      }
    });
    panel.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    copy.addEventListener('click', async () => {
      if (citation === null) return;
      clearTimeout(resetCopy);
      let copied = false;
      try {
        await navigator.clipboard.writeText(citation);
        copied = true;
      } catch (_) {
        const field = document.createElement('textarea');
        field.value = citation;
        field.readOnly = true;
        field.style.cssText = 'position:fixed;top:0;left:-9999px;';
        document.body.append(field);
        field.select();
        try { copied = document.execCommand('copy'); } catch (_) { /* Offer manual selection below. */ }
        field.remove();
        copy.focus();
      }
      if (copied) {
        copy.textContent = 'Copied';
        status.textContent = 'BibTeX copied.';
        resetCopy = setTimeout(() => {
          copy.textContent = 'Copy';
          status.textContent = '';
        }, 2000);
      } else {
        pre.focus();
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Copy was blocked. The citation is selected; press Ctrl+C or ⌘C to copy.';
      }
    });
  });
})();
