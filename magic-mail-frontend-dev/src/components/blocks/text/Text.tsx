import React, { PropsWithChildren } from 'react'
import './style.scss';

export interface TextProps extends PropsWithChildren{
  text?: string;
  fontSize?: string;
  opacity?: number;
  color?: string;
  fontFamily?: string;
  letterSpacing?: string;
  lineHeight?: string;
  fontWeight?: string;
  className?: string | 'text';
  styles?: React.CSSProperties
}

export const Text: React.FC<TextProps> = (
  {
    text,
    fontSize = 'inherit',
    opacity = 1,
    color = 'black',
    fontFamily = 'Outfit, sans-serif',
    letterSpacing = 'normal',
    lineHeight = 'normal',
    fontWeight = 'normal',
    className,
    styles,
    children
  }) => {
  const style: React.CSSProperties = {
    fontSize,
    opacity,
    color,
    fontFamily,
    letterSpacing,
    lineHeight,
    fontWeight,
  };

  return (
    <span style={{ ...style, ...styles }} className={className}>
      {text ? text : children}
    </span>
  )
};
