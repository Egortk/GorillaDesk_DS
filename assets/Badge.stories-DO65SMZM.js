import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{r as n,s as r}from"./helpers-CqeQ1S3I.js";import{n as i,t as a}from"./palette-DSPfdJRn.js";import{n as o,t as s}from"./Badge-DlZFKx65.js";var c,l,u,d,f;function p(){return(p=e((()=>{r(),i(),o(),c=t(),l={title:`Components/Badge`,component:s,args:{variant:`count`,intent:`primary`,emphasis:`solid`,children:`16`},argTypes:{intent:{control:`select`,options:a}}},u={},d={name:`All variants`,render:()=>(0,c.jsx)(n,{rows:a,cols:[`count / solid`,`count / subtle`,`dot / solid`,`dot / subtle`],render:(e,t)=>{let[n,r]=t.split(` / `);return(0,c.jsx)(s,{variant:n,intent:e,emphasis:r,"aria-label":n===`dot`?`${e} status`:void 0,children:`16`})}})},f=[`Playground`,`AllVariants`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'All variants',
  render: () => <Matrix rows={INTENTS} cols={['count / solid', 'count / subtle', 'dot / solid', 'dot / subtle'] as const} render={(intent, col) => {
    const [variant, emphasis] = col.split(' / ') as ['count' | 'dot', 'solid' | 'subtle'];
    return <Badge variant={variant} intent={intent} emphasis={emphasis} aria-label={variant === 'dot' ? \`\${intent} status\` : undefined}>
            16
          </Badge>;
  }} />
}`,...d.parameters?.docs?.source}}}})))()}p();export{d as AllVariants,u as Playground,f as __namedExportsOrder,l as default};