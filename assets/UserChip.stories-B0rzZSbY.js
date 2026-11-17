import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,r,s as i}from"./helpers-CqeQ1S3I.js";import{i as a,r as o,t as s}from"./avatars-aH4Pzkp9.js";import{n as c,t as l}from"./UserChip-CccSJGvN.js";import{n as u,t as d}from"./Lozenge-DywiY9Py.js";var f,p,m,h,g,_,v,y,b,x,S,C;function w(){return(w=e((()=>{o(),i(),u(),c(),f=t(),{fn:p}=__STORYBOOK_MODULE_TEST__,m={control:`select`,options:[`none`,`warning`,`success`],mapping:{none:void 0,warning:(0,f.jsx)(d,{intent:`warning`,emphasis:`solid`,children:`Lozenge`}),success:(0,f.jsx)(d,{intent:`success`,children:`Active`})}},h={title:`Components/UserChip`,component:l,args:{kind:`pill`,size:`sm`,children:`User Name`,onRemove:p()},argTypes:{avatarSrc:a(s.rebecca),lozenge:m}},g={args:{avatarSrc:`image`,lozenge:`warning`}},_=[`pill`,`plain`],v=[`sm`,`xs`],y=[`name only`,`removable`,`lozenge`,`lozenge + removable`,`no photo`],b={render:()=>(0,f.jsx)(r,{rows:_.flatMap(e=>v.map(t=>`${e} / ${t}`)),cols:y,render:(e,t)=>{let[n,r]=e.split(` / `);return(0,f.jsx)(l,{kind:n,size:r,avatarSrc:t===`no photo`?void 0:s.rebecca,lozenge:t.includes(`lozenge`)?(0,f.jsx)(d,{intent:`warning`,emphasis:`solid`,children:`Lozenge`}):void 0,onRemove:t.includes(`removable`)||t===`no photo`?()=>{}:void 0,children:`Rebecca Moore`})}})},x={render:()=>(0,f.jsx)(r,{rows:v,cols:[`default`,`hover`,`active`,`focused`],render:(e,t)=>(0,f.jsx)(n,{state:t,target:`button`,children:(0,f.jsx)(l,{size:e,avatarSrc:s.zane,onRemove:()=>{},children:`Zane Cooper`})})})},S={render:()=>(0,f.jsx)(`div`,{className:`flex w-56 flex-col items-start gap-(--space-md) border border-dashed border-environment-border-default p-(--space-md)`,children:v.map(e=>_.map(t=>(0,f.jsx)(l,{kind:t,size:e,avatarSrc:s.rebecca,lozenge:(0,f.jsx)(d,{children:`Lead`}),onRemove:()=>{},children:`Rebecca Alexandra Montgomery-Whitfield`},t+e)))})},C=[`Playground`,`Variants`,`DismissStates`,`Truncation`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    avatarSrc: 'image',
    lozenge: 'warning'
  }
}`,...g.parameters?.docs?.source},description:{story:`Figma default: pill, sm, removable, with lozenge.`,...g.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={KINDS.flatMap(k => SIZES.map(s => \`\${k} / \${s}\` as const))} cols={CASES} render={(row, c) => {
    const [kind, size] = row.split(' / ') as [UserChipKind, UserChipSize];
    return <UserChip kind={kind} size={size} avatarSrc={c === 'no photo' ? undefined : SAMPLE.rebecca} lozenge={c.includes('lozenge') ? <Lozenge intent="warning" emphasis="solid">Lozenge</Lozenge> : undefined} onRemove={c.includes('removable') || c === 'no photo' ? () => {} : undefined}>
            Rebecca Moore
          </UserChip>;
  }} />
}`,...b.parameters?.docs?.source},description:{story:`Every Figma variant (kind × size) with each slot combination. xs ignores the lozenge.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={SIZES} cols={['default', 'hover', 'active', 'focused'] as const} render={(size, state) => <Force state={state} target="button">
          <UserChip size={size} avatarSrc={SAMPLE.zane} onRemove={() => {}}>
            Zane Cooper
          </UserChip>
        </Force>} />
}`,...x.parameters?.docs?.source},description:{story:`The chip has no states of its own; only the dismiss button reacts.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex w-56 flex-col items-start gap-(--space-md) border border-dashed border-environment-border-default p-(--space-md)">
      {SIZES.map(size => KINDS.map(kind => <UserChip key={kind + size} kind={kind} size={size} avatarSrc={SAMPLE.rebecca} lozenge={<Lozenge>Lead</Lozenge>} onRemove={() => {}}>
            Rebecca Alexandra Montgomery-Whitfield
          </UserChip>))}
    </div>
}`,...S.parameters?.docs?.source},description:{story:`A long name truncates with an ellipsis in a narrow container; the full name is in the tooltip.`,...S.parameters?.docs?.description}}}})))()}w();export{x as DismissStates,g as Playground,S as Truncation,b as Variants,C as __namedExportsOrder,h as default};