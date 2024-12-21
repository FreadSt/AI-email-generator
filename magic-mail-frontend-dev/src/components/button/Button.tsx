import { FC, ReactElement, ReactNode, useState } from 'react'
import './style.scss'
import { Text, TextProps } from '../blocks/text/Text'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { BtnIconProps } from '../blocks/icon/Icon'

interface ButtonProps {
  text?: string
  imageSrc?: string
  LeftSvgIcon?: (props: BtnIconProps) => ReactElement
  RightSvgIcon?: (props: BtnIconProps) => ReactElement
  backgroundColor?: string
  disabled?: boolean
  width?: string
  height?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  additionalText?: string | null
  rightElement?: () => ReactNode | null
  className?: string
  textProps?: Omit<TextProps, 'text'>
}

export const Button: FC<ButtonProps> = ({
  text,
  imageSrc,
  LeftSvgIcon,
  RightSvgIcon,
  backgroundColor,
  disabled,
  width,
  height,
  type = 'button',
  onClick,
  additionalText,
  rightElement,
  className,
  textProps,
}) => {
  const style = {
    backgroundColor,
    width,
    height,
  }

  const [isHovered, setIsHovered] = useState(false)

  const onMouseEnter = () => {
    setIsHovered(true)
  }
  const onMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.button
      initial={{
        background:
          'radial-gradient(91.12% 417.75% at 4.67% 0%, #C5F04D 1.32%, #FFCC00 50%, #FF60B7 100%)',
      }}
      whileHover={{
        background:
          'radial-gradient(40% 188.8% at -12.93% -18%, #C5F04D 1.32%, #FFCC00 20.73%, #FF60B7 100%)',
        transition: { duration: 0.3 },
      }}
      className={clsx('btn btn-default', className)}
      style={style}
      disabled={disabled}
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='btn-content'>
        {imageSrc && <img src={imageSrc} alt='button icon' className='btn-image' />}
        {LeftSvgIcon && (
          <LeftSvgIcon isHovered={isHovered || disabled} opacity={disabled ? 0.5 : 1} />
        )}
        {text && <span {...textProps}>{text}</span>}
        {RightSvgIcon && (
          <RightSvgIcon isHovered={isHovered || disabled} opacity={disabled ? 0.5 : 1} />
        )}
      </div>

      {additionalText && <Text text={additionalText} />}
      {rightElement ? rightElement() : null}
    </motion.button>
  )
}
