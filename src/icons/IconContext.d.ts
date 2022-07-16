import { type } from 'os'
import { Context, CSSProperties } from 'react'

type IIconContextType = {
    classPrefix: string
}

declare const IconContext: Context<IIconContextType>

export default IconContext
