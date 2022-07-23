import React from 'react'
import { IconArrowDown } from './icons'
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