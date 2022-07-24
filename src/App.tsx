import React from 'react'
import { IconArrowDown, IconPlus, IconDelete } from './icons'
import Button from "./components/button";

const components = [
	{
		title: 'icon',
		comp: <IconArrowDown style={{
			color:'red',
			width: '50px',
			height: '50px'
		}}/>
	},
	{
		title: 'button',
		comp: (<div>
				<Button type='primary'>Primary</Button>
				<Button type='secondary'>Secondary</Button>
				<Button type='dashed'>Dashed</Button>
				<Button type='outline'>Outline</Button>
				<Button type='text'>Text</Button>
				<Button type='primary' icon={<IconPlus />} />
      			<Button type='primary' icon={<IconDelete />}>
        				Delete
      			</Button>
				  <Button type='primary' icon={<IconPlus />} />
      <Button shape='circle' type='primary' icon={<IconPlus />} />
      <Button shape='round' type='primary'>
        Primary
      </Button>
      <Button type='primary'>Primary</Button>
	  <Button size='mini' type='primary'>
        Mini
      </Button>
      <Button size='small' type='primary'>
        Small
      </Button>
      <Button size='default' type='primary'>
        Default
      </Button>
      <Button size='large' type='primary'>
        Large
      </Button>
	  <Button>
	  Warning
      </Button>
      <Button status='warning'>Warning</Button>
      <Button type='outline' status='warning'>
        Warning
      </Button>
      <Button type='text' status='warning'>
        Warning
      </Button>

      <Button type='primary' status='danger'>
        Danger
      </Button>
      <Button status='danger'>Danger</Button>
      <Button type='outline' status='danger'>
        Danger
      </Button>
      <Button type='text' status='danger'>
        Danger
      </Button>

      <Button type='primary' status='success'>
        Success
      </Button>
      <Button status='success'>Success</Button>
      <Button type='outline' status='success'>
        Success
      </Button>
      <Button type='text' status='success'>
        Success
      </Button>
	  <Button>
	            Primary
				</Button>
				<Button disabled type='secondary'>
				  Secondary
				</Button>
				<Button disabled type='dashed'>
				  Dashed
				</Button>
				<Button disabled type='outline'>
				  Outline
				</Button>
				<Button disabled type='text'>
				  Text
				</Button>
				<Button disabled type='primary' status='danger'>
				  Primary
				</Button>
				<Button disabled type='secondary' status='danger'>
				  Secondary
				</Button>
				<Button disabled type='dashed' status='danger'>
				  Dashed
				</Button>
				<Button disabled type='outline' status='danger'>
				  Outline
				</Button>
				<Button disabled type='text' status='danger'>
				  Text
				</Button>
				<Button disabled type='primary' status='warning'>
				  Primary
				</Button>
				<Button disabled type='secondary' status='warning'>
				  Secondary
				</Button>
				<Button disabled type='dashed' status='warning'>
				  Dashed
				</Button>
				<Button disabled type='outline' status='warning'>
				  Outline
				</Button>
				<Button disabled type='text' status='warning'>
				  Text
				</Button>
				<Button disabled type='primary' status='success'>
				  Primary
				</Button>
				<Button disabled type='secondary' status='success'>
				  Secondary
				</Button>
				<Button disabled type='dashed' status='success'>
				  Dashed
				</Button>
				<Button disabled type='outline' status='success'>
				  Outline
				</Button>
				<Button disabled type='text' status='success'>
				  Text
				</Button>
				<Button type='primary' loading>
          Loading
        </Button>
        <Button type='secondary' loading>
          Loading
        </Button>
        <Button type='dashed' loading>
          Loading
        </Button>
        <Button type='primary' shape='circle' loading />
        <Button type='secondary' shape='circle' loading />
        <Button type='dashed' shape='circle' loading />
      <Button
        type='primary'
        loading={true}
        onClick={()=>{}}
        style={{ margin: 24 }}
      >
        Click Me
      </Button>
      <Button
        type='primary'
        loading={false}
        onClick={()=>{}}
        style={{ margin: 24 }}
      >
        <IconPlus />Click Me
      </Button>
      <Button
        type='primary'
        loadingFixedWidth
        loading={true}
        onClick={()=>{}}
        style={{ margin: 24 }}
      >
        Search
      </Button>
			</div>)
	}
]

const App = ()=>{
	return (
		<div>
			{
				components.reverse().map(e=>{
					return (
						<div>
							<h2>{e.title}</h2>
							{e.comp}
						</div>
					)
				})
			}
		</div>
	)
}

export default App