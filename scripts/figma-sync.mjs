import { writeFileSync, mkdirSync } from 'fs';

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!FIGMA_TOKEN || !FILE_KEY) {
  console.error('Missing FIGMA_TOKEN or FIGMA_FILE_KEY');
  process.exit(1);
}

// 1. Fetch styles list
const stylesRes = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/styles`, {
  headers: { 'X-Figma-Token': FIGMA_TOKEN }
});
const stylesData = await stylesRes.json();
const styles = stylesData.meta?.styles ?? [];

if (!styles.length) {
  console.log('No published styles found.');
  process.exit(0);
}

// 2. Fetch node values
const nodeIds = styles.map(s => s.node_id).join(',');
const nodesRes = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${nodeIds}`, {
  headers: { 'X-Figma-Token': FIGMA_TOKEN }
});
const nodesData = await nodesRes.json();
const nodes = nodesData.nodes ?? {};

// 3. Build DTCG token tree
const tokens = {};

for (const style of styles) {
  const doc = nodes[style.node_id]?.document;
  if (!doc) continue;

  const parts = style.name.split('/').map(p => p.trim().toLowerCase().replace(/\s+/g, '-'));
  let target = tokens;
  for (const part of parts.slice(0, -1)) {
    target[part] = target[part] ?? {};
    target = target[part];
  }

  const leaf = parts.at(-1);

  if (style.style_type === 'FILL') {
    const fill = doc.fills?.[0];
    if (fill?.color) {
      const { r, g, b, a } = fill.color;
      const hex = '#' + [r, g, b].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
      target[leaf] = { $value: a < 1 ? `rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a})` : hex, $type: 'color' };
    }
  } else if (style.style_type === 'TEXT') {
    const { fontSize, fontFamily, fontWeight, lineHeightPx } = doc.style ?? {};
    target[leaf] = {
      $value: { fontFamily, fontSize, fontWeight, lineHeight: lineHeightPx },
      $type: 'typography'
    };
  } else if (style.style_type === 'EFFECT') {
    target[leaf] = { $value: doc.effects, $type: 'shadow' };
  }
}

mkdirSync('tokens', { recursive: true });
writeFileSync('tokens/figma.json', JSON.stringify(tokens, null, 2));
console.log(`tokens/figma.json written — ${styles.length} styles processed`);
