import React, { CSSProperties } from 'react'
import clsx from 'clsx'
import './style.scss'

interface FlexProps {
  direction?: CSSProperties['flexDirection']
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  padding?: CSSProperties['padding']
  margin?: CSSProperties['margin']
  gap?: CSSProperties['gap']
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

export const Flex: React.FC<FlexProps> = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  padding = '0',
  margin = '0',
  gap = '0',
  onClick,
  className,
  children,
}) => {
  const style: any = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    padding: padding as CSSProperties['padding'],
    margin: margin as CSSProperties['margin'],
    gap: gap as CSSProperties['gap'],
  }
  return (
    <div style={style} className={clsx('flex', className)} onClick={onClick}>
      {children}
    </div>
  )
}
