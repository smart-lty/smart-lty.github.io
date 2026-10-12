// A hello for anyone who opens the browser console.
(() => {
  'use strict';

  const chip = (bg, fg) => `background:${bg};color:${fg};padding:2px 6px;border-radius:4px;font:12px ui-monospace,monospace`;
  const gap = 'background:transparent';
  const tokens = [['Hi', 'target'], ['!', 'accepted'], ['You', 'accepted'], ['found', 'accepted'], ['the', 'target'], ['console', 'accepted'], ['.', 'accepted']];
  const styles = { target: chip('#2c665b', '#ffffff'), accepted: chip('#e5efeb', '#2c665b') };

  console.log(tokens.map(([t]) => `%c${t}`).join('%c '), ...tokens.flatMap(([, s], i) => (i ? [gap, styles[s]] : [styles[s]])));
  console.log(
    '%c(Drafted by a small model, checked by a big one.)\n\n' +
    'This page is hand-written HTML, CSS and a little JS:\n  https://github.com/smart-lty/smart-lty.github.io\n\n' +
    "If you work on LLM inference too, I'd love to chat: tianyu_liu@mail.ustc.edu.cn",
    'font:12px/1.6 ui-monospace,monospace;color:#72726a'
  );
})();
