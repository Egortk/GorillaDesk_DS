import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,c as r,d as i,l as a,n as o,o as s,r as c,s as l,u}from"./ui-pjjmzWw8.js";function d(e,t){let n=new Map;for(let r of l(e)){let e=r.name.replace(/^color-/,``).split(`-`),i=e.slice(0,t).join(`-`),a=e.slice(t).join(`-`)||`value`;n.has(i)||n.set(i,{key:i,items:[]}),n.get(i).items.push({label:a,token:r})}for(let e of n.values())e.items.sort((e,t)=>u(e.label)-u(t.label));return[...n.values()]}function f({label:e,token:t}){let n=[`--${t.name}`,`class: bg-/text-/border-${t.name.replace(/^color-/,``)}`,`light: ${i(t.name,`light`)}`,`dark: ${i(t.name,`dark`)}`,t.description??``].filter(Boolean).join(`
`),a=/-(text|icon)-/.exec(t.name)?.[1],o=a?r(t.name.replace(`-${a}-`,`-bg-`)):void 0;return(0,m.jsxs)(`div`,{className:`flex w-12 flex-col items-center gap-(--space-2xs)`,title:n,children:[a?(0,m.jsx)(`div`,{className:`flex h-8 w-12 items-center justify-center rounded-sm border border-environment-border-muted text-label-lg`,style:{background:o?`var(--${o.name})`:void 0,color:`var(--${t.name})`},children:a===`text`?`Aa`:`●`}):(0,m.jsx)(`div`,{className:`h-8 w-12 rounded-sm border border-environment-border-muted`,style:{background:`var(--${t.name})`}}),(0,m.jsx)(`span`,{className:`max-w-12 truncate text-body-xs text-content-neutral-text-muted`,children:e})]})}function p({groups:e,strip:t}){return(0,m.jsx)(`div`,{className:`flex flex-col gap-(--space-md)`,children:e.map(e=>(0,m.jsxs)(`div`,{className:`flex items-start gap-(--space-lg)`,children:[(0,m.jsx)(`div`,{className:`w-32 shrink-0 pt-(--space-xs) text-body-sm text-content-neutral-text-default`,children:e.key.replace(t,``)||e.key}),(0,m.jsx)(`div`,{className:`flex flex-wrap gap-(--space-xs)`,children:e.items.map(e=>(0,m.jsx)(f,{...e},e.token.name))})]},e.key))})}var m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{a(),s(),m=t(),h=[`primary`,`secondary`,`subsidiary`,`accent`,`success`,`warning`,`danger`,`neutral`,`inverse`],g=(e,t)=>h.map(n=>({intent:n,groups:e.filter(e=>e.key.split(`-`)[t]===n)})).filter(e=>e.groups.length),_={title:`Tokens/Colors`,parameters:{layout:`fullscreen`}},v=`Hover a swatch for the CSS variable, Tailwind class and the resolved Light / Dark values.`,y={render:()=>(0,m.jsx)(o,{title:`Interactive colours`,intro:(0,m.jsxs)(m.Fragment,{children:[`color/interactive/`,`{intent}/{emphasis}/{property}/{state}`,`. `,v]}),children:g(d(`color-interactive-`,4),1).map(({intent:e,groups:t})=>(0,m.jsx)(c,{title:e,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:t,strip:`interactive-${e}-`})})},e))})},b={render:()=>(0,m.jsx)(o,{title:`Content colours`,intro:(0,m.jsxs)(m.Fragment,{children:[`color/content/`,`{intent|inverse}/{property}/{level}`,`. `,v]}),children:g(d(`color-content-`,3),1).map(({intent:e,groups:t})=>(0,m.jsx)(c,{title:e,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:t,strip:`content-${e}-`})})},e))})},x={name:`Environment & focus`,render:()=>(0,m.jsxs)(o,{title:`Environment & focus`,intro:v,children:[(0,m.jsx)(c,{title:`Environment`,note:`Surfaces, borders, scrims and shadow layer colours.`,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:d(`color-environment-`,2),strip:`environment-`})})}),(0,m.jsx)(c,{title:`Focus`,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:d(`color-focus-`,1),strip:``})})})]})},S={render:()=>(0,m.jsxs)(o,{title:`Component colours`,intro:(0,m.jsxs)(m.Fragment,{children:[`Component tokens alias semantic tokens for one component. `,v]}),children:[(0,m.jsx)(c,{title:`Button`,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:d(`color-button-`,4),strip:`button-`})})}),(0,m.jsx)(c,{title:`Input`,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:d(`color-input-`,2),strip:``})})}),(0,m.jsx)(c,{title:`Field`,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:d(`color-field-`,2),strip:``})})}),(0,m.jsx)(c,{title:`Link`,children:(0,m.jsx)(n,{children:(0,m.jsx)(p,{groups:d(`color-link-`,1),strip:``})})})]})},C=[`Interactive`,`Content`,`EnvironmentAndFocus`,`Components`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Page title="Interactive colours" intro={<>color/interactive/{'{intent}/{emphasis}/{property}/{state}'}. {hint}</>}>
      {byIntent(group('color-interactive-', 4), 1).map(({
      intent,
      groups
    }) => <Section key={intent} title={intent}>
          <ThemePanes>
            <Groups groups={groups} strip={\`interactive-\${intent}-\`} />
          </ThemePanes>
        </Section>)}
    </Page>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Page title="Content colours" intro={<>color/content/{'{intent|inverse}/{property}/{level}'}. {hint}</>}>
      {byIntent(group('color-content-', 3), 1).map(({
      intent,
      groups
    }) => <Section key={intent} title={intent}>
          <ThemePanes>
            <Groups groups={groups} strip={\`content-\${intent}-\`} />
          </ThemePanes>
        </Section>)}
    </Page>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Environment & focus',
  render: () => <Page title="Environment & focus" intro={hint}>
      <Section title="Environment" note="Surfaces, borders, scrims and shadow layer colours.">
        <ThemePanes>
          <Groups groups={group('color-environment-', 2)} strip="environment-" />
        </ThemePanes>
      </Section>
      <Section title="Focus">
        <ThemePanes>
          <Groups groups={group('color-focus-', 1)} strip="" />
        </ThemePanes>
      </Section>
    </Page>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Page title="Component colours" intro={<>Component tokens alias semantic tokens for one component. {hint}</>}>
      <Section title="Button">
        <ThemePanes>
          <Groups groups={group('color-button-', 4)} strip="button-" />
        </ThemePanes>
      </Section>
      <Section title="Input">
        <ThemePanes>
          <Groups groups={group('color-input-', 2)} strip="" />
        </ThemePanes>
      </Section>
      <Section title="Field">
        <ThemePanes>
          <Groups groups={group('color-field-', 2)} strip="" />
        </ThemePanes>
      </Section>
      <Section title="Link">
        <ThemePanes>
          <Groups groups={group('color-link-', 1)} strip="" />
        </ThemePanes>
      </Section>
    </Page>
}`,...S.parameters?.docs?.source}}}})))()}w();export{S as Components,b as Content,x as EnvironmentAndFocus,y as Interactive,C as __namedExportsOrder,_ as default};