export function inlineMarkdown(text:string): string {
  const escaped = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  return escaped.replace(/!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g,'<img alt="$1" src="$2" />')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')
    .replace(/__([^_]+)__/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>').replace(/_([^_]+)_/g,'<em>$1</em>')
    .replace(/~~([^~]+)~~/g,'<del>$1</del>')
}

export function renderMarkdown(source:string): string {
  const lines = source.replace(/\r/g,'').split('\n'), out:string[]=[]; let i=0
  while(i<lines.length){ const line=lines[i]
    if(line.trim()===''){i++;continue}
    if(/^```/.test(line)){ const lang=line.slice(3).trim(), code:string[]=[]; i++; while(i<lines.length&&!/^```/.test(lines[i])) code.push(lines[i++]); i++; out.push(`<pre><code class="language-${lang||'text'}">${code.join('\n').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>`); continue }
    const heading=line.match(/^(#{1,6})\s+(.+)$/); if(heading){out.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`);i++;continue}
    if(/^\s*(---+|\*\*\*+)\s*$/.test(line)){out.push('<hr />');i++;continue}
    if(/^>\s?/.test(line)){ const q:string[]=[]; while(i<lines.length&&/^>/.test(lines[i])) q.push(lines[i++].replace(/^>\s?/,'')); out.push(`<blockquote>${q.map(inlineMarkdown).join('<br />')}</blockquote>`);continue }
    if(/^\s*[-*+]\s+/.test(line)||/^\s*\d+\.\s+/.test(line)){ const ordered=/^\s*\d+\./.test(line), items:string[]=[]; const sameListType=(candidate:string)=>ordered?/^\s*\d+\.\s+/.test(candidate):/^\s*[-*+]\s+/.test(candidate); while(i<lines.length&&sameListType(lines[i])){let item=lines[i++].replace(/^\s*(?:[-*+]|\d+\.)\s+/,''); const checked=item.match(/^\[([ xX])\]\s+(.*)/); item=checked?`<label class="check"><input type="checkbox" ${checked[1].toLowerCase()==='x'?'checked':''} disabled /> ${inlineMarkdown(checked[2])}</label>`:inlineMarkdown(item);items.push(`<li>${item}</li>`)} out.push(`<${ordered?'ol':'ul'}>${items.join('')}</${ordered?'ol':'ul'}>`);continue }
    const paragraph:string[]=[line]; i++; while(i<lines.length&&lines[i].trim()!==''&&!/^(#{1,6})\s|^```|^\s*[-*+]\s+|^\s*\d+\.\s+|^>|^\s*(---+|\*\*\*+)\s*$/.test(lines[i])) paragraph.push(lines[i++]); out.push(`<p>${paragraph.map(inlineMarkdown).join('<br />')}</p>`)
  } return out.join('')
}
