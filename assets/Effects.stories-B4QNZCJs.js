import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,l as i,n as a,o,r as s,s as c,t as l}from"./ui-pjjmzWw8.js";var u,d,f,p,m,h,g;function _(){return(_=e((()=>{i(),o(),u=t(),d=[...c(`shadow-`),...c(`inset-shadow-`)],f=e=>(0,u.jsx)(`span`,{className:`text-body-xs text-content-neutral-text-muted`,children:e.description??``}),p={title:`Tokens/Effects & motion`,parameters:{layout:`fullscreen`}},m={render:()=>(0,u.jsxs)(a,{title:`Shadows`,intro:`Figma effect styles. Shadow colours come from color/environment/shadow/* and follow the theme.`,children:[(0,u.jsx)(n,{children:(0,u.jsx)(`div`,{className:`flex flex-wrap gap-(--space-section-sm) bg-environment-surface-canvas p-(--space-section-sm)`,children:d.map(e=>(0,u.jsxs)(`div`,{className:`flex w-40 flex-col gap-(--space-sm)`,children:[(0,u.jsx)(`div`,{className:`h-20 rounded-md bg-environment-surface-raised`,style:{boxShadow:`var(--${e.name})`}}),(0,u.jsx)(l,{children:e.name})]},e.name))})}),(0,u.jsx)(s,{title:`Values`,children:(0,u.jsx)(r,{head:[`Class`,`Value`],rows:d.map(e=>[(0,u.jsx)(l,{children:e.name}),(0,u.jsx)(l,{children:e.light})])})})]})},h={render:()=>(0,u.jsxs)(a,{title:`Motion & layers`,intro:`Starting values; review before release (docs/known-issues.md).`,children:[(0,u.jsx)(s,{title:`Duration`,children:(0,u.jsx)(r,{head:[`Token`,`Usage`,`Value`,`Note`],rows:c(`duration-`).map(e=>[(0,u.jsxs)(l,{children:[`--`,e.name]}),(0,u.jsxs)(l,{children:[`duration-(--`,e.name,`)`]}),e.light,f(e)])})}),(0,u.jsx)(s,{title:`Easing`,children:(0,u.jsx)(r,{head:[`Token`,`Class`,`Value`],rows:c(`ease-`).map(e=>[(0,u.jsxs)(l,{children:[`--`,e.name]}),(0,u.jsx)(l,{children:e.name}),(0,u.jsx)(l,{children:e.light})])})}),(0,u.jsx)(s,{title:`Z-index`,children:(0,u.jsx)(r,{head:[`Token`,`Usage`,`Value`],rows:[...c(`z-index-`)].sort((e,t)=>+e.light-t.light).map(e=>[(0,u.jsxs)(l,{children:[`--`,e.name]}),(0,u.jsxs)(l,{children:[`z-(--`,e.name,`)`]}),e.light])})})]})},g=[`Shadows`,`Motion`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Page title="Shadows" intro="Figma effect styles. Shadow colours come from color/environment/shadow/* and follow the theme.">
      <ThemePanes>
        <div className="flex flex-wrap gap-(--space-section-sm) bg-environment-surface-canvas p-(--space-section-sm)">
          {shadows.map(t => <div key={t.name} className="flex w-40 flex-col gap-(--space-sm)">
              <div className="h-20 rounded-md bg-environment-surface-raised" style={{
            boxShadow: \`var(--\${t.name})\`
          }} />
              <Code>{t.name}</Code>
            </div>)}
        </div>
      </ThemePanes>
      <Section title="Values">
        <Table head={['Class', 'Value']} rows={shadows.map(t => [<Code>{t.name}</Code>, <Code>{t.light}</Code>])} />
      </Section>
    </Page>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Page title="Motion & layers" intro="Starting values; review before release (docs/known-issues.md).">
      <Section title="Duration">
        <Table head={['Token', 'Usage', 'Value', 'Note']} rows={byPrefix('duration-').map(t => [<Code>--{t.name}</Code>, <Code>duration-(--{t.name})</Code>, t.light, note(t)])} />
      </Section>
      <Section title="Easing">
        <Table head={['Token', 'Class', 'Value']} rows={byPrefix('ease-').map(t => [<Code>--{t.name}</Code>, <Code>{t.name}</Code>, <Code>{t.light}</Code>])} />
      </Section>
      <Section title="Z-index">
        <Table head={['Token', 'Usage', 'Value']} rows={[...byPrefix('z-index-')].sort((a, b) => +a.light - +b.light).map(t => [<Code>--{t.name}</Code>, <Code>z-(--{t.name})</Code>, t.light])} />
      </Section>
    </Page>
}`,...h.parameters?.docs?.source}}}})))()}_();export{h as Motion,m as Shadows,g as __namedExportsOrder,p as default};