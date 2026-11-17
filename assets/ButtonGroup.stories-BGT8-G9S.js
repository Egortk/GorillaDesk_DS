import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{t}from"./jsx-runtime-MKhVqBIO.js";import{a as n,i as r,n as i,r as a,s as o}from"./helpers-CqeQ1S3I.js";import{t as s}from"./cx-BOo3OvTL.js";import{i as c,r as l,s as u}from"./buttonStyles-D_HOzWT3.js";import{n as d,t as f}from"./Button-BOzjYugS.js";import{n as p,t as m}from"./IconButton-t2Oo6Giu.js";function h({children:e,className:t,...n}){return(0,g.jsx)(c.Provider,{value:!0,children:(0,g.jsx)(`div`,{role:`group`,...n,className:s(`isolate inline-flex items-center rounded-md shadow-interactive-default has-[>[data-borderless]]:shadow-none`,t),children:e})})}var g;function _(){return(_=e((()=>{u(),g=t(),h.__docgenInfo={description:`Joins related actions into one control. Buttons share their borders (−1 px overlap), only the outer corners are
rounded, and the resting shadow is drawn once for the whole group (none when an item is a borderless variant). For choosing one option use a segmented control.`,methods:[],displayName:`ButtonGroup`,props:{children:{required:!0,tsType:{name:`ReactNode`},description:"Two or more Button / IconButton elements (Figma slot `items`). Each keeps its own variant and size."},"aria-label":{required:!1,tsType:{name:`string`},description:`Names the group for screen readers, e.g. "Calendar view".`},"aria-labelledby":{required:!1,tsType:{name:`string`},description:``},className:{required:!1,tsType:{name:`string`},description:``}}}})))()}function v({variant:e=`default`,size:t=`md`}){return(0,y.jsxs)(h,{"aria-label":`Actions`,children:[(0,y.jsx)(f,{variant:e,size:t,children:`Day`}),(0,y.jsx)(f,{variant:e,size:t,children:`Week`}),(0,y.jsx)(m,{variant:e,size:t,icon:(0,y.jsx)(r,{}),"aria-label":`More`})]})}var y,b,x,S,C,w,T,E;function D(){return(D=e((()=>{o(),d(),u(),p(),_(),y=t(),b={title:`Components/ButtonGroup`,component:h,args:{"aria-label":`Calendar view`,children:null},parameters:{controls:{include:[`aria-label`]}}},x={render:e=>(0,y.jsx)(h,{...e,children:[`Day`,`Week`,`Month`].map(e=>(0,y.jsx)(f,{startIcon:(0,y.jsx)(n,{}),endIcon:(0,y.jsx)(r,{}),children:e},e))})},S={render:()=>(0,y.jsxs)(`div`,{className:`flex flex-col items-start gap-(--space-xl)`,children:[(0,y.jsx)(v,{size:`md`}),(0,y.jsx)(v,{size:`sm`}),(0,y.jsxs)(h,{"aria-label":`Text alignment`,children:[(0,y.jsx)(m,{icon:(0,y.jsx)(n,{}),"aria-label":`Add`}),(0,y.jsx)(m,{icon:(0,y.jsx)(r,{}),"aria-label":`More`})]})]})},C=[`default`,`hover`,`active`,`focused`,`disabled`],w={render:()=>(0,y.jsx)(a,{rows:[`md`,`sm`],cols:C,render:(e,t)=>(0,y.jsx)(i,{state:t===`disabled`?`default`:t,target:`[role=group] > :nth-child(2)`,children:(0,y.jsxs)(h,{"aria-label":`Calendar view`,children:[(0,y.jsx)(f,{size:e,children:`Day`}),(0,y.jsx)(f,{size:e,isDisabled:t===`disabled`,children:`Week`}),(0,y.jsx)(f,{size:e,children:`Month`})]})})})},T={render:()=>(0,y.jsx)(a,{rows:l,cols:[`md`],render:e=>(0,y.jsx)(v,{variant:e})})},E=[`Playground`,`Kinds`,`States`,`Variants`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: args => <ButtonGroup {...args}>
      {['Day', 'Week', 'Month'].map(label => <Button key={label} startIcon={<PlusIcon />} endIcon={<MoreVerticalIcon />}>
          {label}
        </Button>)}
    </ButtonGroup>
}`,...x.parameters?.docs?.source},description:{story:"Figma default: three `kind=button` items with both icons.",...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div className="flex flex-col items-start gap-(--space-xl)">
      <Group size="md" />
      <Group size="sm" />
      <ButtonGroup aria-label="Text alignment">
        <IconButton icon={<PlusIcon />} aria-label="Add" />
        <IconButton icon={<MoreVerticalIcon />} aria-label="More" />
      </ButtonGroup>
    </div>
}`,...S.parameters?.docs?.source},description:{story:"`kind=button` and `kind=icon` items in one group, both sizes.",...S.parameters?.docs?.description}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={['md', 'sm'] as const} cols={STATES} render={(size, state) => <Force state={state === 'disabled' ? 'default' : state} target="[role=group] > :nth-child(2)">
          <ButtonGroup aria-label="Calendar view">
            <Button size={size}>Day</Button>
            <Button size={size} isDisabled={state === 'disabled'}>
              Week
            </Button>
            <Button size={size}>Month</Button>
          </ButtonGroup>
        </Force>} />
}`,...w.parameters?.docs?.source},description:{story:`The middle item in each state: it rises above its neighbours so its whole border and focus ring show.`,...w.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Matrix rows={BUTTON_VARIANTS} cols={['md'] as const} render={variant => <Group variant={variant} />} />
}`,...T.parameters?.docs?.source},description:{story:`Every Button variant inside a group.`,...T.parameters?.docs?.description}}}})))()}D();export{S as Kinds,x as Playground,w as States,T as Variants,E as __namedExportsOrder,b as default};