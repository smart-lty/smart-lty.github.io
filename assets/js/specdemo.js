// Speculative decoding vs. autoregressive decoding, as a small looping demo.
// Both rows generate the same sentence; each "pass" is one large-model forward.
(() => {
  'use strict';

  const root = document.querySelector('.spec-demo');
  if (!root) return;

  const TOKENS = ['Hi', '!', 'I', "'m", 'Tianyu', ',', 'and', 'I', 'make', 'LLMs', 'generate', 'text', 'faster', '.'];
  // Per verification pass: how many drafted tokens are accepted, and the
  // draft model's first wrong guess (replaced by the large model's token).
  const STEPS = [
    { accept: 3, wrong: 'am' },
    { accept: 1, wrong: 'from' },
    { accept: 3, wrong: 'models' },
    { accept: 4, wrong: null },
  ];
  const TICK = 450;

  const rows = {};
  root.querySelectorAll('.spec-row').forEach((row) => {
    const box = row.querySelector('.spec-tokens');
    const chips = TOKENS.map((t) => {
      const chip = document.createElement('span');
      chip.className = 'tok';
      chip.textContent = t;
      box.append(chip);
      return chip;
    });
    rows[row.dataset.mode] = { chips, count: row.querySelector('.spec-count') };
  });

  const setCount = (row, n) => { row.count.innerHTML = `<b>${n}</b> ${n === 1 ? 'pass' : 'passes'}`; };

  const set = (chip, state, text) => {
    chip.className = state ? `tok is-${state}` : 'tok';
    if (text !== undefined) chip.textContent = text;
  };

  const finalState = () => {
    rows.ar.chips.forEach((c) => set(c, 'target'));
    setCount(rows.ar, TOKENS.length);
    let p = 0;
    STEPS.forEach((s) => {
      for (let i = 0; i < s.accept; i++) set(rows.sd.chips[p + i], 'accepted');
      if (s.wrong) set(rows.sd.chips[p + s.accept], 'target');
      p += s.accept + (s.wrong ? 1 : 0);
    });
    setCount(rows.sd, STEPS.length);
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finalState();
    return;
  }

  // Pause while the demo is off screen or the tab is hidden.
  let visible = false;
  const waiting = new Set();
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) { waiting.forEach((r) => r()); waiting.clear(); }
  }, { threshold: 0.3 }).observe(root);
  const sleep = async (ms) => {
    await new Promise((r) => setTimeout(r, ms));
    while (!visible || document.hidden) {
      await new Promise((r) => { waiting.add(r); setTimeout(r, 500); });
    }
  };

  const reset = () => {
    Object.values(rows).forEach((r) => {
      r.chips.forEach((c, i) => set(c, null, TOKENS[i]));
      setCount(r, 0);
    });
  };

  async function autoregressive() {
    for (let i = 0; i < TOKENS.length; i++) {
      await sleep(TICK);
      set(rows.ar.chips[i], 'target');
      setCount(rows.ar, i + 1);
    }
  }

  async function speculative() {
    let p = 0;
    for (const [n, s] of STEPS.entries()) {
      const drafted = s.accept + (s.wrong ? 1 : 0);
      for (let i = 0; i < drafted; i++) {
        await sleep(55);
        const wrong = s.wrong && i === s.accept;
        set(rows.sd.chips[p + i], 'draft', wrong ? s.wrong : undefined);
      }
      await sleep(TICK - 55 * drafted);
      setCount(rows.sd, n + 1);
      for (let i = 0; i < s.accept; i++) set(rows.sd.chips[p + i], 'accepted');
      if (s.wrong) {
        const chip = rows.sd.chips[p + s.accept];
        set(chip, 'rejected');
        await sleep(260);
        set(chip, 'target', TOKENS[p + s.accept]);
      }
      p += drafted;
    }
  }

  (async () => {
    for (;;) {
      reset();
      await sleep(700);
      await Promise.all([autoregressive(), speculative()]);
      await sleep(3200);
    }
  })();
})();
