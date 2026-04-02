const fs = require('fs');
const f = '/home/openclaw/.openclaw/workspace/projects/mgk-prototypes/qredible/qredible-tickets/compliance-portal-v2.html';
let c = fs.readFileSync(f, 'utf8');

// Find the second occurrence of the resolution type mapping annotation
const marker = '<strong>\ud83d\udccb itemType \u2192 Resolution Type Mapping (defaults)</strong>';
const first = c.indexOf(marker);
const second = c.indexOf(marker, first + 1);

if (first === -1 || second === -1) {
  console.log('Could not find duplicate. first=' + first + ' second=' + second);
  process.exit(1);
}

// Find the opening div of the second annotation
const divStart = c.lastIndexOf('<div class="annotation mt-16"', second);
// Find the closing </div> after the second annotation
const closingDiv = c.indexOf('</div>', second);
// But we need to find the RIGHT closing div — the annotation has nested elements
// The annotation div ends with </div>\n followed by either another div or screen-nav
// Let's find "Spec formalized in" in the second block and then the </div> after that
const specLine = c.indexOf('Spec formalized in', second);
const annotEnd = c.indexOf('</div>', specLine);
const fullEnd = annotEnd + '</div>'.length;

if (divStart === -1 || fullEnd === -1) {
  console.log('Could not find bounds. divStart=' + divStart + ' fullEnd=' + fullEnd);
  process.exit(1);
}

// Remove the duplicate block (including any whitespace before it)
const beforeBlock = c.substring(0, divStart).replace(/\s+$/, '\n');
const afterBlock = c.substring(fullEnd);

c = beforeBlock + afterBlock;
fs.writeFileSync(f, c);
console.log('Removed duplicate annotation block (chars ' + divStart + '-' + fullEnd + ')');
