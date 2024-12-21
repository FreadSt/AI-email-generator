import { createContext, PropsWithChildren, useState } from 'react'
import { notificationText, NotificationTypes } from '../constants'

interface INotificationContext {
  notification: string
  notificationType: NotificationTypes
  isShowNotification: boolean
  showNotification: (notificationType: NotificationTypes) => void
}

const initialContext: INotificationContext = {
  notification: '',
  notificationType: NotificationTypes.empty,
  isShowNotification: false,
  showNotification: (notificationType: NotificationTypes) => {},
}

export const NotificationContext = createContext<INotificationContext>(initialContext)

export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState<NotificationTypes>(NotificationTypes.empty)
  const isShowNotification = notificationType !== NotificationTypes.empty

  const showNotification = (notificationType: NotificationTypes) => {
    setNotificationType(notificationType)
    setNotification(notificationText[notificationType])
    setTimeout(() => {
      setNotificationType(NotificationTypes.empty)
      setNotification(notificationText[NotificationTypes.empty])
    }, 5000)
  }

  return (
    <NotificationContext.Provider
      value={{
        notification,
        notificationType,
        isShowNotification,
        showNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
