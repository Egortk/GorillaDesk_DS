import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,r,s as i,t as a}from"./helpers-CqeQ1S3I.js";import{r as o,t as s}from"./avatars-aH4Pzkp9.js";import{n as c,t as l}from"./UserAvatar-D9TeW5Cf.js";import{n as u,t as d}from"./Badge-DlZFKx65.js";import{i as f,n as p,r as m,t as h}from"./ListBox-D9HV_U_U.js";import{n as g,t as _}from"./Tag-DDJaGEZ7.js";import{n as v,t as y}from"./UserChip-CccSJGvN.js";var b,x,S,C,w,T,E,D,O;function k(){return(k=e((()=>{o(),i(),c(),u(),g(),v(),p(),f(),b=t(),x={title:`Components/ListBox`,component:h,args:{"aria-label":`Frequency`,selectionMode:`single`,defaultSelectedKeys:[`bi-weekly`]},argTypes:{selectionMode:{control:`inline-radio`,options:[`single`,`multiple`,`none`]}},parameters:{controls:{include:[`selectionMode`]}},render:e=>(0,b.jsxs)(h,{...e,className:`w-60`,children:[(0,b.jsx)(m,{id:`monthly`,children:`Monthly`}),(0,b.jsx)(m,{id:`bi-weekly`,children:`Bi-weekly`}),(0,b.jsx)(m,{id:`quarterly`,children:`Quarterly`}),(0,b.jsx)(m,{id:`once`,isDisabled:!0,children:`One time`})]})},S={},C={args:{selectionMode:`multiple`,defaultSelectedKeys:[`monthly`,`quarterly`]}},w=[`default`,`hover`,`active`,`disabled`],T=[`single`,`single selected`,`multiple`,`multiple selected`],E={render:()=>(0,b.jsx)(r,{rows:w,cols:T,render:(e,t)=>(0,b.jsx)(n,{state:e===`hover`||e===`active`?e:`default`,target:`[role=option]`,children:(0,b.jsx)(h,{"aria-label":`${e} ${t}`,className:`w-60`,selectionMode:t.startsWith(`single`)?`single`:`multiple`,defaultSelectedKeys:t.endsWith(`selected`)?[`a`]:[],disabledKeys:e===`disabled`?[`a`]:[],children:(0,b.jsx)(m,{id:`a`,leading:(0,b.jsx)(a,{}),badge:(0,b.jsx)(d,{intent:`neutral`,children:`16`}),children:`Label`})})})})},D={render:()=>(0,b.jsxs)(h,{"aria-label":`Content`,selectionMode:`multiple`,className:`w-72`,children:[(0,b.jsx)(m,{id:`text`,children:`Label only`}),(0,b.jsx)(m,{id:`desc`,description:`Every second week on the same weekday`,children:`With description`}),(0,b.jsx)(m,{id:`icon`,leading:(0,b.jsx)(a,{}),children:`Leading icon`}),(0,b.jsx)(m,{id:`avatar`,leading:(0,b.jsx)(l,{size:`sm`,name:`Rebecca Moore`,src:s.rebecca}),textValue:`Rebecca Moore`,children:`Rebecca Moore`}),(0,b.jsx)(m,{id:`tag`,textValue:`Termite`,children:(0,b.jsx)(_,{size:`sm`,children:`Termite`})}),(0,b.jsx)(m,{id:`chip`,textValue:`Zane Cooper`,children:(0,b.jsx)(y,{avatarSrc:s.zane,children:`Zane Cooper`})}),(0,b.jsx)(m,{id:`badge`,badge:(0,b.jsx)(d,{intent:`neutral`,children:`16`}),children:`With badge`}),(0,b.jsx)(m,{id:`long`,children:`A very long option label that does not fit on one line and truncates`})]})},O=[`Playground`,`Multiple`,`ItemStates`,`Content`],S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    selectionMode: 'multiple',
    defaultSelectedKeys: ['monthly', 'quarterly']
  }
}`,...C.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={STATES} cols={COLS} render={(state, col) => <Force state={state === 'hover' || state === 'active' ? state : 'default'} target="[role=option]">
          <ListBox aria-label={\`\${state} \${col}\`} className="w-60" selectionMode={col.startsWith('single') ? 'single' : 'multiple'} defaultSelectedKeys={col.endsWith('selected') ? ['a'] : []} disabledKeys={state === 'disabled' ? ['a'] : []}>
            <ListBoxItem id="a" leading={<AccountIcon />} badge={<Badge intent="neutral">16</Badge>}>
              Label
            </ListBoxItem>
          </ListBox>
        </Force>} />
}`,...E.parameters?.docs?.source},description:{story:`ListBoxItem: every Figma variant (state × selected × selectionMode). hover / active are forced.`,...E.parameters?.docs?.description}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <ListBox aria-label="Content" selectionMode="multiple" className="w-72">
      <ListBoxItem id="text">Label only</ListBoxItem>
      <ListBoxItem id="desc" description="Every second week on the same weekday">
        With description
      </ListBoxItem>
      <ListBoxItem id="icon" leading={<AccountIcon />}>
        Leading icon
      </ListBoxItem>
      <ListBoxItem id="avatar" leading={<UserAvatar size="sm" name="Rebecca Moore" src={SAMPLE.rebecca} />} textValue="Rebecca Moore">
        Rebecca Moore
      </ListBoxItem>
      <ListBoxItem id="tag" textValue="Termite">
        <Tag size="sm">Termite</Tag>
      </ListBoxItem>
      <ListBoxItem id="chip" textValue="Zane Cooper">
        <UserChip avatarSrc={SAMPLE.zane}>Zane Cooper</UserChip>
      </ListBoxItem>
      <ListBoxItem id="badge" badge={<Badge intent="neutral">16</Badge>}>
        With badge
      </ListBoxItem>
      <ListBoxItem id="long">A very long option label that does not fit on one line and truncates</ListBoxItem>
    </ListBox>
}`,...D.parameters?.docs?.source},description:{story:"Figma `_list-label` content (text, tag, userChip), leading icon or avatar, description, badge, long label.",...D.parameters?.docs?.description}}}})))()}k();export{D as Content,E as ItemStates,C as Multiple,S as Playground,O as __namedExportsOrder,x as default};