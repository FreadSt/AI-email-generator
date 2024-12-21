import { motion } from 'framer-motion'
import { useNotification } from '../../lib/hooks/useNotification'
import { NotificationTypes } from '../../lib/constants'
import successIcon from '../../assets/images/check-circle-2.svg'
import warningIcon from '../../assets/images/warning.svg'
import { useDimensions } from '../../lib/hooks/useDimensions'
import './style.scss'

const contentVariants = {
  hidden: { y: 120, transition: { duration: 0.2, ease: 'easeOut' } },
  visible: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const contentMobileVariants = {
  hidden: { y: 120, transition: { duration: 0.2, ease: 'easeOut' } },
  visible: { y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const successNotifications = [NotificationTypes.success, NotificationTypes.applyCodeSuccess]

export const Notification = () => {
  const { isMobile } = useDimensions()
  const { notificationType, notification, isShowNotification } = useNotification()
  const icon = successNotifications.some((item) => item === notificationType)
    ? successIcon
    : warningIcon
  const variants = isMobile ? contentMobileVariants : contentVariants
  return (
    <motion.div
      className='notification'
      initial={false}
      animate={isShowNotification ? 'visible' : 'hidden'}
      variants={variants}
    >
      <div className='notification-wrapper'>
        <img className='notification-icon' src={icon} alt='' />
        <div className='notification-text'>
          {isMobile ? <p>{notification}</p> : notification.split('\n').map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
