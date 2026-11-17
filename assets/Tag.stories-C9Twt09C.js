import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,o as r,r as i,s as a,t as o}from"./helpers-CqeQ1S3I.js";import{n as s,t as c}from"./palette-DSPfdJRn.js";import{n as l,t as u}from"./Tag-DDJaGEZ7.js";function d({size:e}){return(0,f.jsx)(i,{rows:c.flatMap(e=>[`${e} / solid`,`${e} / subtle`]),cols:g,render:(t,r)=>{let[i,a]=t.split(` / `);return(0,f.jsx)(n,{state:r===`disabled`?`default`:r,children:(0,f.jsx)(u,{intent:i,emphasis:a,size:e,icon:(0,f.jsx)(o,{}),onPress:()=>{},onRemove:()=>{},isDisabled:r===`disabled`,children:`Tag`})})}})}var f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{a(),s(),l(),f=t(),{fn:p}=__STORYBOOK_MODULE_TEST__,m={title:`Components/Tag`,component:u,args:{intent:`neutral`,emphasis:`subtle`,size:`sm`,children:`Tag`,onPress:p(),onRemove:p(),isDisabled:!1},argTypes:{intent:{control:`select`,options:c},icon:r}},h={args:{icon:`account`}},g=[`default`,`hover`,`active`,`focused`,`disabled`],_={name:`Interactive / sm`,render:()=>(0,f.jsx)(d,{size:`sm`})},v={name:`Interactive / xs`,render:()=>(0,f.jsx)(d,{size:`xs`})},y={name:`Static (not interactive)`,render:()=>(0,f.jsx)(i,{rows:c,cols:[`solid / sm`,`subtle / sm`,`solid / xs`,`subtle / xs`],render:(e,t)=>{let[n,r]=t.split(` / `);return(0,f.jsx)(u,{intent:e,emphasis:n,size:r,icon:(0,f.jsx)(o,{}),onRemove:()=>{},children:`Tag`})}})},b=[`Playground`,`InteractiveSm`,`InteractiveXs`,`Static`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'account'
  }
}`,...h.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Interactive / sm',
  render: () => <InteractiveMatrix size="sm" />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Interactive / xs',
  render: () => <InteractiveMatrix size="xs" />
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Static (not interactive)',
  render: () => <Matrix rows={INTENTS} cols={['solid / sm', 'subtle / sm', 'solid / xs', 'subtle / xs'] as const} render={(intent, col) => {
    const [emphasis, size] = col.split(' / ') as ['solid' | 'subtle', 'sm' | 'xs'];
    return <Tag intent={intent} emphasis={emphasis} size={size} icon={<AccountIcon />} onRemove={() => {}}>
            Tag
          </Tag>;
  }} />
}`,...y.parameters?.docs?.source}}}})))()}x();export{_ as InteractiveSm,v as InteractiveXs,h as Playground,y as Static,b as __namedExportsOrder,m as default};