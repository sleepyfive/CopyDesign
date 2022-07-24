import React from 'react'
import { IconArrowDown, IconPlus, IconDelete } from './icons'
import { D0 } from './components/button/demo'

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
		comp: <D0/>
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