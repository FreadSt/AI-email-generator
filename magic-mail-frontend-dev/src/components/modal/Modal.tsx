import { motion } from 'framer-motion';
import './style.scss'
import {PropsWithChildren} from 'react';
import clsx from 'clsx'

const overlayVariants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const contentVariants = {
  hidden: { scale: 0.3, opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: 'easeOut' } },
};

interface Props extends PropsWithChildren {
  modalClassName?: string
  modalContentClassName?: string
}

export default function Modal({modalClassName, modalContentClassName, children}: Props) {
  return (
    <motion.div
      initial='hidden'
      animate='visible'
      exit='hidden'
      variants={overlayVariants}
      className={clsx('modal', modalClassName)}
    >
      <motion.div
        initial='hidden'
        animate='visible'
        exit='hidden'
        variants={contentVariants}
        className={clsx('modal-content', modalContentClassName)}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
