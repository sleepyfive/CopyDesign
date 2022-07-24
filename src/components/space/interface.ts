import {ReactNode, CSSProperties} from 'react'

export interface SpaceProps{
    wrap?: boolean,
    align?: 'start' | 'end' | 'center' | 'baseline',
    direction?: 'vertical' | 'horizontal',
    split?: ReactNode,
    className?: string|string[]
    size?: SpaceSize,
    style?: CSSProperties,
    children?: ReactNode[]
}

export type SpaceSize = "mini" | "small" | "medium" | "large" | number;