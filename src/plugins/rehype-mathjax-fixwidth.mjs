import { visit } from 'unist-util-visit';

/**
 * Rehype plugin that runs AFTER rehype-mathjax to normalise tagged (full-width)
 * equation SVGs.  MathJax emits these with width="100%" and no viewBox, so they
 * fill the container instead of scaling with the font like unlabeled equations.
 *
 * 1. Replaces width="100%" with the equation's natural ex-based width (from the
 *    inline min-width style), giving uniform font-proportional sizing.
 * 2. Extracts the equation tag text (e.g. "(1)") and stores it as a data-tag
 *    attribute on the container so CSS can render it outside the SVG.
 */
export default function rehypeMathjaxFixWidth() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'mjx-container') return;
      if (node.properties?.width !== 'full') return;

      const svg = node.children?.find(
        (child) => child.type === 'element' && child.tagName === 'svg',
      );
      if (!svg || svg.properties?.width !== '100%') return;

      const style = String(svg.properties.style || '');
      const match = style.match(/min-width:\s*([\d.]+ex)/);
      if (match) {
        svg.properties.width = match[1];
      }

      const tagText = extractTagText(svg);
      if (tagText) {
        node.properties.dataTag = tagText;
      }
    });
  };
}

/** Walk the SVG tree to find <use data-c="XX"> elements inside the tag group
 *  (identified by an id starting with "mjx-eqn"), then decode the hex
 *  character codes into a plain-text string like "(1)". */
function extractTagText(svg) {
  let text = '';
  visit(svg, 'element', (node) => {
    if (node.tagName !== 'g') return;
    const id = String(node.properties?.id || '');
    if (!id.startsWith('mjx-eqn')) return;

    visit(node, 'element', (use) => {
      if (use.tagName !== 'use') return;
      const code = use.properties?.dataC;
      if (code) text += String.fromCharCode(parseInt(String(code), 16));
    });
  });
  return text || null;
}
