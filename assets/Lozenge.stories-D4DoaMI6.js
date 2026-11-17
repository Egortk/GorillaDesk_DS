import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{r as n,s as r}from"./helpers-CqeQ1S3I.js";import{n as i,t as a}from"./palette-DSPfdJRn.js";import{n as o,t as s}from"./Lozenge-DywiY9Py.js";var c,l,u,d,f;function p(){return(p=e((()=>{r(),i(),o(),c=t(),l={title:`Components/Lozenge`,component:s,args:{intent:`success`,emphasis:`subtle`,size:`xs`,children:`Paid`},argTypes:{intent:{control:`select`,options:a}}},u={},d={name:`All variants`,render:()=>(0,c.jsx)(n,{rows:a,cols:[`solid / xs`,`solid / sm`,`subtle / xs`,`subtle / sm`],render:(e,t)=>{let[n,r]=t.split(` / `);return(0,c.jsx)(s,{intent:e,emphasis:n,size:r,children:`Lozenge`})}})},f=[`Playground`,`AllVariants`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'All variants',
  render: () => <Matrix rows={INTENTS} cols={['solid / xs', 'solid / sm', 'subtle / xs', 'subtle / sm'] as const} render={(intent, col) => {
    const [emphasis, size] = col.split(' / ') as ['solid' | 'subtle', 'xs' | 'sm'];
    return <Lozenge intent={intent} emphasis={emphasis} size={size}>
            Lozenge
          </Lozenge>;
  }} />
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as AllVariants,u as Playground,f as __namedExportsOrder,l as default};