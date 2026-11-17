import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,r,s as i}from"./helpers-CqeQ1S3I.js";import{i as a,n as o,r as s,t as c}from"./Radio-BzIQhLp0.js";var l,u,d,f,p,m,h,g;function _(){return(_=e((()=>{i(),a(),o(),l=t(),u={title:`Components/Radio`,component:c,args:{value:`option`,children:`Label`,description:`Description`,errorMessage:`Error message`,isDisabled:!1},parameters:{controls:{include:[`children`,`description`,`errorMessage`,`isDisabled`]}},render:e=>(0,l.jsx)(s,{"aria-label":`Playground`,children:(0,l.jsx)(c,{...e})})},d={},f=[`default`,`hover`,`active`,`focused`,`disabled`,`read-only`,`invalid`,`invalid-hover`,`invalid-focused`],p=[`unchecked`,`checked`],m={render:()=>(0,l.jsx)(r,{rows:f,cols:p,render:(e,t)=>{let r=e.startsWith(`invalid`),i=e===`hover`||e===`invalid-hover`?`hover`:e===`active`?`active`:e.endsWith(`focused`)?`focused`:`default`;return(0,l.jsx)(s,{"aria-label":`${e} ${t}`,value:t===`checked`?`a`:null,isDisabled:e===`disabled`,isReadOnly:e===`read-only`,isInvalid:r,children:(0,l.jsx)(n,{state:i,children:(0,l.jsx)(c,{value:`a`,description:`Description`,errorMessage:r?`Error message`:void 0,children:`Label`})})})}})},h={render:()=>(0,l.jsxs)(s,{"aria-label":`Content`,defaultValue:`b`,isInvalid:!0,children:[(0,l.jsx)(c,{value:`a`,"aria-label":`No label`}),(0,l.jsx)(c,{value:`b`,children:`Label only`}),(0,l.jsx)(c,{value:`c`,description:`Billed once a year`,children:`Label and description`}),(0,l.jsx)(c,{value:`d`,description:`Description`,errorMessage:`Pick another plan`,children:`With error`})]})},g=[`Playground`,`States`,`Content`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={STATES} cols={VALUES} render={(state, value) => {
    const invalid = state.startsWith('invalid');
    const forced = state === 'hover' || state === 'invalid-hover' ? 'hover' : state === 'active' ? 'active' : state.endsWith('focused') ? 'focused' : 'default';
    return <RadioGroup aria-label={\`\${state} \${value}\`} value={value === 'checked' ? 'a' : null} isDisabled={state === 'disabled'} isReadOnly={state === 'read-only'} isInvalid={invalid}>
            <Force state={forced}>
              <Radio value="a" description="Description" errorMessage={invalid ? 'Error message' : undefined}>
                Label
              </Radio>
            </Force>
          </RadioGroup>;
  }} />
}`,...m.parameters?.docs?.source},description:{story:`Every Figma variant: state × value. hover / active / focused are forced with data attributes.`,...m.parameters?.docs?.description}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <RadioGroup aria-label="Content" defaultValue="b" isInvalid>
      <Radio value="a" aria-label="No label" />
      <Radio value="b">Label only</Radio>
      <Radio value="c" description="Billed once a year">
        Label and description
      </Radio>
      <Radio value="d" description="Description" errorMessage="Pick another plan">
        With error
      </Radio>
    </RadioGroup>
}`,...h.parameters?.docs?.source},description:{story:`Figma hasLabel / hasDescription / hasError. Without a label the radio needs aria-label.`,...h.parameters?.docs?.description}}}})))()}_();export{h as Content,d as Playground,m as States,g as __namedExportsOrder,u as default};