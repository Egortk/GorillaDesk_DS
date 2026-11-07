// Run in the Tokens file via use_figma three times with PART = 0, 1, 2 (output limit is 48 KB).
// Concatenate the lines after the first two of each result into raw/semantic-color.txt.
const PART=0,N=3;
const cols=await figma.variables.getLocalVariableCollectionsAsync();const all=await figma.variables.getLocalVariablesAsync();
const byId=Object.fromEntries(all.map(v=>[v.id,v]));const sc=cols.find(c=>c.name==='semantic/color');
const hex=c=>'#'+['r','g','b'].map(k=>Math.round(c[k]*255).toString(16).padStart(2,'0')).join('')+((c.a??1)<1?Math.round(c.a*255).toString(16).padStart(2,'0'):'');
const enc=x=>{if(x&&x.type==='VARIABLE_ALIAS')return '@'+byId[x.id].name.replace(/^color\//,'~');if(x&&x.color!==undefined)return enc(x.color)+'^'+enc(x.opacity);if(x&&typeof x==='object'&&'r' in x)return hex(x);if(typeof x==='number')return String(+x.toFixed(4));return JSON.stringify(x)};
const vs=all.filter(v=>v.variableCollectionId===sc.id&&!v.name.startsWith('alpha/')).sort((a,b)=>a.name<b.name?-1:1);
const per=Math.ceil(vs.length/N);const part=vs.slice(PART*per,(PART+1)*per);
const descs={};
const lines=part.map(v=>{if(v.description){descs[v.description]=(descs[v.description]||0)+1}return v.name.replace(/^color\//,'')+';'+sc.modes.map(m=>enc(v.valuesByMode[m.modeId])).join('|')});
return 'modes='+sc.modes.map(m=>m.name).join(',')+' total='+vs.length+' part='+part.length+'\nDESC '+JSON.stringify(descs)+'\n'+lines.join('\n');
