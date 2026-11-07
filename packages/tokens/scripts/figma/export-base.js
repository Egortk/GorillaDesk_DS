// Run in the Tokens file via use_figma. Save the result as raw/export1.txt.
// Covers primitives, size, font, motion, layer, components, alpha tokens, effect styles (E) and text styles (T).
const cols=await figma.variables.getLocalVariableCollectionsAsync();const all=await figma.variables.getLocalVariablesAsync();
const byId=Object.fromEntries(all.map(v=>[v.id,v]));const cn=Object.fromEntries(cols.map(c=>[c.id,c.name]));
const hex=c=>'#'+['r','g','b'].map(k=>Math.round(c[k]*255).toString(16).padStart(2,'0')).join('')+((c.a??1)<1?Math.round(c.a*255).toString(16).padStart(2,'0'):'');
const enc=x=>{if(x&&x.type==='VARIABLE_ALIAS')return '@'+byId[x.id].name;if(x&&x.color!==undefined)return enc(x.color)+'~'+enc(x.opacity);if(x&&typeof x==='object'&&'r' in x)return hex(x);if(typeof x==='number')return String(+x.toFixed(4));return JSON.stringify(x)};
const short={primitives:'P','semantic/size':'S','semantic/font':'F','semantic/motion':'M','semantic/layer':'L','components/color':'CC','components/size':'CS','semantic/color':'C'};
const lines=[];
for(const v of all){const c=cols.find(x=>x.id===v.variableCollectionId);const k=short[c.name];if(k==='C'&&!v.name.startsWith('alpha/'))continue;
 lines.push([k,v.name,v.resolvedType[0],c.modes.map(m=>enc(v.valuesByMode[m.modeId])).join('|'),v.description?v.description.replace(/[\n;]/g,' '):''].join(';'))}
const es=(await figma.getLocalEffectStylesAsync()).map(s=>'E;'+s.name+';'+s.effects.map(e=>[e.type==='INNER_SHADOW'?'i':'d',e.offset.x,e.offset.y,e.radius,e.spread,e.boundVariables&&e.boundVariables.color?'@'+byId[e.boundVariables.color.id].name:hex(e.color),e.boundVariables&&e.boundVariables.spread?'@'+byId[e.boundVariables.spread.id].name:''].join(',')).join('|'));
const ts=(await figma.getLocalTextStylesAsync()).map(s=>'T;'+s.name+';'+['fontFamily','fontSize','lineHeight','letterSpacing','fontWeight'].map(k=>s.boundVariables&&s.boundVariables[k]?'@'+byId[s.boundVariables[k].id].name:'').join('|'));
return lines.concat(es,ts).join('\n');