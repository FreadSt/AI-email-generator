import { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import './style.scss'

interface EmailProps {
  html: string
}

const EmailComponent: FC<EmailProps> = ({ html }) => {
  const layout = useSelector((state: RootState) => state.layout.layout)
  return (
    <div className={`generated-container ${layout}`}>
      <iframe className='generated-content-frame' srcDoc={html} sandbox='allow-scripts' />
    </div>
  )
}

export default EmailComponent
