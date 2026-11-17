import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./react-DlPsW1c0.js";import{t as n}from"./jsx-runtime-MKhVqBIO.js";import{n as r,r as i,s as a}from"./helpers-CqeQ1S3I.js";import{a as o,t as s}from"./Checkbox-Bnbm9QIP.js";import{n as c,t as l}from"./CheckboxGroup-DyE6mGj9.js";var u,d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{u=t(),a(),c(),o(),d=n(),f={title:`Components/Checkbox`,component:s,args:{children:`Label`,description:`Description`,errorMessage:`Error message`,isIndeterminate:!1,isDisabled:!1,isReadOnly:!1,isInvalid:!1}},p={},m=[`default`,`hover`,`active`,`focused`,`disabled`,`read-only`,`invalid`,`invalid-hover`,`invalid-focused`],h=[`unchecked`,`checked`,`indeterminate`],g={render:()=>(0,d.jsx)(i,{rows:m,cols:h,render:(e,t)=>{let n=e.startsWith(`invalid`),i=e===`hover`||e===`invalid-hover`?`hover`:e===`active`?`active`:e.endsWith(`focused`)?`focused`:`default`;return(0,d.jsx)(r,{state:i,children:(0,d.jsx)(s,{isSelected:t===`checked`,isIndeterminate:t===`indeterminate`,isDisabled:e===`disabled`,isReadOnly:e===`read-only`,isInvalid:n,errorMessage:n?`Error message`:void 0,description:`Description`,children:`Label`})})}})},_={render:()=>(0,d.jsxs)(`div`,{className:`flex flex-col items-start gap-(--space-xl)`,children:[(0,d.jsx)(s,{"aria-label":`Select row`}),(0,d.jsx)(s,{children:`Label only`}),(0,d.jsx)(s,{description:`Text messages to the customer's phone`,children:`Label and description`}),(0,d.jsx)(s,{isInvalid:!0,description:`Description`,errorMessage:`Accept the terms to continue`,children:`With error`})]})},v={render:function(){let e=[`Monday`,`Wednesday`,`Friday`],[t,n]=(0,u.useState)([`Monday`]);return(0,d.jsxs)(`div`,{className:`flex flex-col items-start gap-(--space-md)`,children:[(0,d.jsx)(s,{isSelected:t.length===e.length,isIndeterminate:t.length>0&&t.length<e.length,onChange:t=>n(t?e:[]),children:`All days`}),(0,d.jsx)(l,{"aria-label":`Service days`,value:t,onChange:n,className:`ps-(--space-xl)`,children:e.map(e=>(0,d.jsx)(s,{value:e,children:e},e))})]})}},y=[`Playground`,`States`,`Content`,`SelectAll`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={STATES} cols={VALUES} render={(state, value) => {
    const invalid = state.startsWith('invalid');
    const forced = state === 'hover' || state === 'invalid-hover' ? 'hover' : state === 'active' ? 'active' : state.endsWith('focused') ? 'focused' : 'default';
    return <Force state={forced}>
            <Checkbox isSelected={value === 'checked'} isIndeterminate={value === 'indeterminate'} isDisabled={state === 'disabled'} isReadOnly={state === 'read-only'} isInvalid={invalid} errorMessage={invalid ? 'Error message' : undefined} description="Description">
              Label
            </Checkbox>
          </Force>;
  }} />
}`,...g.parameters?.docs?.source},description:{story:`Every Figma variant: state × value. hover / active / focused are forced with data attributes.`,...g.parameters?.docs?.description}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-start gap-(--space-xl)">
      <Checkbox aria-label="Select row" />
      <Checkbox>Label only</Checkbox>
      <Checkbox description="Text messages to the customer's phone">Label and description</Checkbox>
      <Checkbox isInvalid description="Description" errorMessage="Accept the terms to continue">
        With error
      </Checkbox>
    </div>
}`,..._.parameters?.docs?.source},description:{story:`Figma hasLabel / hasDescription / hasError. Without a label the checkbox needs aria-label.`,..._.parameters?.docs?.description}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const all = ['Monday', 'Wednesday', 'Friday'];
    const [days, setDays] = useState<string[]>(['Monday']);
    return <div className="flex flex-col items-start gap-(--space-md)">
        <Checkbox isSelected={days.length === all.length} isIndeterminate={days.length > 0 && days.length < all.length} onChange={on => setDays(on ? all : [])}>
          All days
        </Checkbox>
        <CheckboxGroup aria-label="Service days" value={days} onChange={setDays} className="ps-(--space-xl)">
          {all.map(d => <Checkbox key={d} value={d}>
              {d}
            </Checkbox>)}
        </CheckboxGroup>
      </div>;
  }
}`,...v.parameters?.docs?.source},description:{story:`Select all: indeterminate while some rows are checked; clicking it checks all.`,...v.parameters?.docs?.description}}}})))()}b();export{_ as Content,p as Playground,v as SelectAll,g as States,y as __namedExportsOrder,f as default};