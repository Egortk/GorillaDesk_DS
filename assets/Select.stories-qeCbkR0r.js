import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{n,r,s as i,t as a}from"./helpers-CqeQ1S3I.js";import{r as o,t as s}from"./avatars-aH4Pzkp9.js";import{i as c,r as l}from"./ListBox-D9HV_U_U.js";import{n as u,t as d}from"./Select-CZTSw15R.js";import{n as f,t as p}from"./UserChip-CccSJGvN.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{o(),i(),c(),f(),u(),m=t(),h=(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(l,{id:`monthly`,children:`Monthly`}),(0,m.jsx)(l,{id:`bi-weekly`,children:`Bi-weekly`}),(0,m.jsx)(l,{id:`quarterly`,children:`Quarterly`}),(0,m.jsx)(l,{id:`once`,children:`One time`})]}),g={title:`Components/Select`,component:d,args:{"aria-label":`Frequency`,placeholder:`Choose frequency`,variant:`box`,isDisabled:!1,isReadOnly:!1,isInvalid:!1,children:h},argTypes:{variant:{control:`inline-radio`,options:[`box`,`inline`]}},parameters:{controls:{include:[`placeholder`,`variant`,`isDisabled`,`isReadOnly`,`isInvalid`]}},render:e=>(0,m.jsx)(`div`,{className:`w-60`,children:(0,m.jsx)(d,{...e})})},_={},v=[`default`,`hover`,`focused`,`disabled`,`readonly`,`invalid`,`invalid-hover`,`invalid-focused`],y=[`box`,`box + value`,`inline`,`inline + value`],b={render:()=>(0,m.jsx)(r,{rows:v,cols:y,render:(e,t)=>{let r=e.endsWith(`hover`)?`hover`:e.endsWith(`focused`)?`focused`:`default`;return(0,m.jsx)(`div`,{className:`w-60`,children:(0,m.jsx)(n,{state:r,target:`button`,children:(0,m.jsx)(d,{"aria-label":`${e} ${t}`,variant:t.startsWith(`box`)?`box`:`inline`,placeholder:`Choose frequency`,defaultValue:t.endsWith(`value`)?`bi-weekly`:void 0,isDisabled:e===`disabled`,isReadOnly:e===`readonly`,isInvalid:e.startsWith(`invalid`),icon:(0,m.jsx)(a,{}),children:h})})})}})},x={args:{defaultOpen:!0,defaultValue:`bi-weekly`},parameters:{layout:`padded`},render:e=>(0,m.jsx)(`div`,{className:`h-64 w-60`,children:(0,m.jsx)(d,{...e})})},S=[`Termite`,`Rodents`,`Mosquito`,`Bed bugs`,`Ants`,`Wasps`].map(e=>({id:e.toLowerCase(),name:e})),C={render:()=>(0,m.jsx)(`div`,{className:`w-60`,children:(0,m.jsx)(d,{"aria-label":`Services`,selectionMode:`multiple`,placeholder:`Choose services`,items:S,defaultValue:[`termite`,`rodents`,`mosquito`,`ants`],children:e=>(0,m.jsx)(l,{id:e.id,children:e.name})})})},w={render:()=>(0,m.jsx)(`div`,{className:`flex flex-col gap-(--space-xl)`,children:[`tag`,`text`].map(e=>(0,m.jsx)(`div`,{className:`w-60`,children:(0,m.jsx)(d,{"aria-label":`Services (${e})`,variant:`inline`,moreKind:e,selectionMode:`multiple`,items:S,defaultValue:[`termite`,`rodents`,`mosquito`,`ants`],children:e=>(0,m.jsx)(l,{id:e.id,children:e.name})})},e))})},T=[{id:`rebecca`,name:`Rebecca Moore`,photo:s.rebecca},{id:`zane`,name:`Zane Cooper`,photo:s.zane},{id:`alex`,name:`Alex Kim`,photo:void 0}],E={render:()=>(0,m.jsx)(`div`,{className:`flex flex-col gap-(--space-xl)`,children:[`box`,`inline`].map(e=>(0,m.jsx)(`div`,{className:e===`box`?`w-72`:`w-56`,children:(0,m.jsx)(d,{"aria-label":`Technicians (${e})`,variant:e,selectionMode:`multiple`,moreKind:`pill`,items:T,defaultValue:[`rebecca`,`zane`,`alex`],renderValue:e=>(0,m.jsx)(p,{avatarSrc:e.value?.photo,children:e.textValue}),children:e=>(0,m.jsx)(l,{id:e.id,textValue:e.name,children:(0,m.jsx)(p,{kind:`plain`,avatarSrc:e.photo,children:e.name})})})},e))})},D=[`Playground`,`States`,`Open`,`Multiple`,`MultipleInline`,`Users`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{}`,..._.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={STATES} cols={COLS} render={(state, col) => {
    const forced = state.endsWith('hover') ? 'hover' : state.endsWith('focused') ? 'focused' : 'default';
    return <div className="w-60">
            <Force state={forced} target="button">
              <Select aria-label={\`\${state} \${col}\`} variant={col.startsWith('box') ? 'box' : 'inline'} placeholder="Choose frequency" defaultValue={col.endsWith('value') ? 'bi-weekly' : undefined} isDisabled={state === 'disabled'} isReadOnly={state === 'readonly'} isInvalid={state.startsWith('invalid')} icon={<AccountIcon />}>
                {FREQUENCY}
              </Select>
            </Force>
          </div>;
  }} />
}`,...b.parameters?.docs?.source},description:{story:`Every Figma state except open (see Open). hover / focused are forced on the trigger.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    defaultOpen: true,
    defaultValue: 'bi-weekly'
  },
  parameters: {
    layout: 'padded'
  },
  render: args => <div className="h-64 w-60">
      <Select {...args} />
    </div>
}`,...x.parameters?.docs?.source},description:{story:`Figma state=open: the field takes the focused look, the arrow points up, the list opens under it.`,...x.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className="w-60">
      <Select aria-label="Services" selectionMode="multiple" placeholder="Choose services" items={SERVICES} defaultValue={['termite', 'rodents', 'mosquito', 'ants']}>
        {s => <ListBoxItem id={s.id}>{s.name}</ListBoxItem>}
      </Select>
    </div>
}`,...C.parameters?.docs?.source},description:{story:`Several values in a box field: Tags wrap and the field grows.`,...C.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-(--space-xl)">
      {(['tag', 'text'] as const).map(more => <div key={more} className="w-60">
          <Select aria-label={\`Services (\${more})\`} variant="inline" moreKind={more} selectionMode="multiple" items={SERVICES} defaultValue={['termite', 'rodents', 'mosquito', 'ants']}>
            {s => <ListBoxItem id={s.id}>{s.name}</ListBoxItem>}
          </Select>
        </div>)}
    </div>
}`,...w.parameters?.docs?.source},description:{story:`Several values in an inline field: one line, "+N" for the values that do not fit.`,...w.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col gap-(--space-xl)">
      {(['box', 'inline'] as const).map(variant => <div key={variant} className={variant === 'box' ? 'w-72' : 'w-56'}>
          <Select aria-label={\`Technicians (\${variant})\`} variant={variant} selectionMode="multiple" moreKind="pill" items={PEOPLE} defaultValue={['rebecca', 'zane', 'alex']} renderValue={o => <UserChip avatarSrc={o.value?.photo}>{o.textValue}</UserChip>}>
            {p => <ListBoxItem id={p.id} textValue={p.name}>
                <UserChip kind="plain" avatarSrc={p.photo}>
                  {p.name}
                </UserChip>
              </ListBoxItem>}
          </Select>
        </div>)}
    </div>
}`,...E.parameters?.docs?.source},description:{story:`UserChip values (renderValue) with the pill counter.`,...E.parameters?.docs?.description}}}})))()}O();export{C as Multiple,w as MultipleInline,x as Open,_ as Playground,b as States,E as Users,D as __namedExportsOrder,g as default};