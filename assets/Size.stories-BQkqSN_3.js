import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{d as n,i as r,l as i,n as a,o,p as s,r as c,s as l,t as u}from"./ui-pjjmzWw8.js";function d({name:e}){return(0,p.jsx)(`div`,{className:`h-(--space-lg) rounded-xs bg-interactive-primary-solid-bg-default`,style:{width:`var(--${e})`}})}function f({name:e,kind:t}){return(0,p.jsx)(`div`,{className:`rounded-xs border border-interactive-primary-solid-border-default bg-interactive-primary-transparent-bg-default`,style:t===`control`?{height:`var(--${e})`,width:`6rem`}:{height:`var(--${e})`,width:`var(--${e})`}})}var p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{i(),o(),p=t(),m=e=>{let t=n(e.name,`light`);return t.endsWith(`rem`)?`${t} · ${s(t)}`:t},h=e=>[...e].sort((e,t)=>parseFloat(s(n(e.name,`light`)))-parseFloat(s(n(t.name,`light`)))),g={title:`Tokens/Size`,parameters:{layout:`fullscreen`}},_={render:()=>(0,p.jsxs)(a,{title:`Space`,intro:`space/* is padding and gap. It lives outside the Tailwind theme on purpose: use p-(--space-md), gap-(--space-xl).`,children:[(0,p.jsx)(c,{title:`Inside components`,children:(0,p.jsx)(r,{head:[`Token`,`Usage`,`Value`,``],rows:h(l(`space-`).filter(e=>!/^space-(section|overlap|button|input|avatar)/.test(e.name))).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`p-(--`,e.name,`)`]}),m(e),(0,p.jsx)(d,{name:e.name})])})}),(0,p.jsx)(c,{title:`Between sections`,children:(0,p.jsx)(r,{head:[`Token`,`Usage`,`Value`,``],rows:h(l(`space-section-`)).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`gap-(--`,e.name,`)`]}),m(e),(0,p.jsx)(d,{name:e.name})])})}),(0,p.jsx)(c,{title:`Overlap`,note:`Joins the borders of group items. Always equals minus border-width/md. Used as a margin on every item but the first.`,children:(0,p.jsx)(r,{head:[`Token`,`Usage`,`Value`],rows:l(`space-overlap-`).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`ms-(--`,e.name,`)`]}),m(e)])})}),(0,p.jsx)(c,{title:`Component space`,children:(0,p.jsx)(r,{head:[`Token`,`Alias`,`Value`],rows:[...l(`space-button-`),...l(`space-input-`),...l(`space-avatar`)].map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsx)(u,{children:e.light}),m(e)])})})]})},v={name:`Control & icon size`,render:()=>(0,p.jsxs)(a,{title:`Control & icon size`,intro:`spacing/* is element size. These live in the Tailwind theme: h-control-md, size-icon-md.`,children:[(0,p.jsx)(c,{title:`Control height`,children:(0,p.jsx)(r,{head:[`Token`,`Class`,`Value`,``],rows:h(l(`spacing-control-`)).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`h-`,e.name.replace(`spacing-`,``)]}),m(e),(0,p.jsx)(f,{name:e.name,kind:`control`})])})}),(0,p.jsx)(c,{title:`Icon size`,children:(0,p.jsx)(r,{head:[`Token`,`Class`,`Value`,``],rows:h(l(`spacing-icon-`)).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`size-`,e.name.replace(`spacing-`,``)]}),m(e),(0,p.jsx)(f,{name:e.name,kind:`icon`})])})})]})},y={name:`Radius & border`,render:()=>(0,p.jsxs)(a,{title:`Radius & border width`,children:[(0,p.jsx)(c,{title:`Radius`,children:(0,p.jsx)(r,{head:[`Token`,`Class`,`Value`,``],rows:h(l(`radius-`)).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`rounded-`,e.name.replace(`radius-`,``)]}),m(e),(0,p.jsx)(`div`,{className:`size-12 border border-interactive-primary-solid-border-default bg-interactive-primary-transparent-bg-default`,style:{borderRadius:`var(--${e.name})`}})])})}),(0,p.jsx)(c,{title:`Border width`,note:`Kept in px so borders and overlaps never drift apart at another root font size.`,children:(0,p.jsx)(r,{head:[`Token`,`Usage`,`Value`,``],rows:h(l(`border-width-`)).map(e=>[(0,p.jsxs)(u,{children:[`--`,e.name]}),(0,p.jsxs)(u,{children:[`border-(length:--`,e.name,`)`]}),m(e),(0,p.jsx)(`div`,{className:`h-8 w-24 rounded-xs border-solid border-content-neutral-text-default`,style:{borderWidth:`var(--${e.name})`}})])})})]})},b=[`Space`,`ControlAndIcon`,`RadiusAndBorder`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Page title="Space" intro="space/* is padding and gap. It lives outside the Tailwind theme on purpose: use p-(--space-md), gap-(--space-xl).">
      <Section title="Inside components">
        <Table head={['Token', 'Usage', 'Value', '']} rows={sortBySize(byPrefix('space-').filter(t => !/^space-(section|overlap|button|input|avatar)/.test(t.name))).map(t => [<Code>--{t.name}</Code>, <Code>p-(--{t.name})</Code>, value(t), <Bar name={t.name} />])} />
      </Section>
      <Section title="Between sections">
        <Table head={['Token', 'Usage', 'Value', '']} rows={sortBySize(byPrefix('space-section-')).map(t => [<Code>--{t.name}</Code>, <Code>gap-(--{t.name})</Code>, value(t), <Bar name={t.name} />])} />
      </Section>
      <Section title="Overlap" note="Joins the borders of group items. Always equals minus border-width/md. Used as a margin on every item but the first.">
        <Table head={['Token', 'Usage', 'Value']} rows={byPrefix('space-overlap-').map(t => [<Code>--{t.name}</Code>, <Code>ms-(--{t.name})</Code>, value(t)])} />
      </Section>
      <Section title="Component space">
        <Table head={['Token', 'Alias', 'Value']} rows={[...byPrefix('space-button-'), ...byPrefix('space-input-'), ...byPrefix('space-avatar')].map(t => [<Code>--{t.name}</Code>, <Code>{t.light}</Code>, value(t)])} />
      </Section>
    </Page>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Control & icon size',
  render: () => <Page title="Control & icon size" intro="spacing/* is element size. These live in the Tailwind theme: h-control-md, size-icon-md.">
      <Section title="Control height">
        <Table head={['Token', 'Class', 'Value', '']} rows={sortBySize(byPrefix('spacing-control-')).map(t => [<Code>--{t.name}</Code>, <Code>h-{t.name.replace('spacing-', '')}</Code>, value(t), <Box name={t.name} kind="control" />])} />
      </Section>
      <Section title="Icon size">
        <Table head={['Token', 'Class', 'Value', '']} rows={sortBySize(byPrefix('spacing-icon-')).map(t => [<Code>--{t.name}</Code>, <Code>size-{t.name.replace('spacing-', '')}</Code>, value(t), <Box name={t.name} kind="icon" />])} />
      </Section>
    </Page>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Radius & border',
  render: () => <Page title="Radius & border width">
      <Section title="Radius">
        <Table head={['Token', 'Class', 'Value', '']} rows={sortBySize(byPrefix('radius-')).map(t => [<Code>--{t.name}</Code>, <Code>rounded-{t.name.replace('radius-', '')}</Code>, value(t), <div className="size-12 border border-interactive-primary-solid-border-default bg-interactive-primary-transparent-bg-default" style={{
        borderRadius: \`var(--\${t.name})\`
      }} />])} />
      </Section>
      <Section title="Border width" note="Kept in px so borders and overlaps never drift apart at another root font size.">
        <Table head={['Token', 'Usage', 'Value', '']} rows={sortBySize(byPrefix('border-width-')).map(t => [<Code>--{t.name}</Code>, <Code>border-(length:--{t.name})</Code>, value(t), <div className="h-8 w-24 rounded-xs border-solid border-content-neutral-text-default" style={{
        borderWidth: \`var(--\${t.name})\`
      }} />])} />
      </Section>
    </Page>
}`,...y.parameters?.docs?.source}}}})))()}x();export{v as ControlAndIcon,y as RadiusAndBorder,_ as Space,b as __namedExportsOrder,g as default};