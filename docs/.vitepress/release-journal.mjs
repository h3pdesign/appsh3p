// Group existing Markdown releases at build time, preserving their source and links.
export default function releaseJournal(md) {
  md.core.ruler.push('release-journal', (state) => {
    const titleIndex = state.tokens.findIndex((token) => token.type === 'heading_open' && token.tag === 'h1');
    const title = state.tokens[titleIndex + 1]?.content || '';
    if (!/\bChangelog$/i.test(title)) return;
    const combined = title === 'Changelog';
    const output = [];
    let open = false;
    let inHeader = false;
    const html = (content) => {
      const token = new state.Token('html_block', '', 0);
      token.content = content;
      output.push(token);
    };
    html('<div class="release-journal">');
    state.tokens.forEach((token, index) => {
      const level = Number(token.tag.slice(1));
      if (token.type === 'heading_open' && level <= (combined ? 3 : 2)) {
        if (open) { html('</div></article>'); open = false; }
        const text = state.tokens[index + 1]?.content || '';
        const release = combined ? level === 3 : level === 2 && /^v?\d/.test(text);
        if (release) {
          html('<article class="release-entry"><header class="release-entry-heading"><span class="release-label">Release notes</span>');
          open = true;
          inHeader = true;
        }
      }
      output.push(token);
      if (inHeader && token.type === 'heading_close') {
        html('</header><div class="release-entry-body">');
        inHeader = false;
      }
    });
    if (open) html('</div></article>');
    html('</div>');
    state.tokens = output;
  });
}
