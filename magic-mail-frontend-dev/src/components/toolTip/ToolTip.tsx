import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'
import arrow from '../../assets/images/tooltip-arrow.svg'
import './style.scss'

interface PropsType extends PropsWithChildren {
  text: string
}

const ToolTip: FC<PropsType> = ({ children, text }) => {
  const [showToolTip, setShowToolTip] = useState(false)
  const [offsets, setOffsets] = useState<DOMRect>()
  const ref = useRef<HTMLDivElement>(null)

  const onMouseEnterHandler = () => {
    setShowToolTip(true)
  }

  const onMouseLeaveHandler = () => {
    setShowToolTip(false)
  }

  useEffect(() => {
    if (ref.current) {
      setOffsets(ref.current.getBoundingClientRect())
    }
  }, [ref.current])

  return (
    <div
      className='tooltip-container'
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {showToolTip && (
        <div
          className='tooltip'
          style={{ bottom: `-${(offsets?.height ?? 110) + 2}px`, left: -(offsets?.width ?? 230) / 2 - 12 }}
          ref={ref}
        >
          <img src={arrow} alt='' role='presentation' />
          <div className='tooltip-inner'>
            {text}
          </div>
        </div>
      )}
    </div>
  )
}

export default ToolTip
