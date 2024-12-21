import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import loader from '../../assets/images/Stars.gif'
import './style.scss'

const messages = [
  'Brewing the perfect cup of digital coffee...',
  'Counting pixels one by one...',
  'Polishing email fonts...',
  'Convincing the servers to work harder...',
  'Detangling lines of code...',
  'Adding a sprinkle of marketing magic...',
  'Teaching your email to fly...',
  'Converting caffeine into creativity...',
  'Consulting with email wizards...',
  'Tuning the email frequency...',
  'Sharpening subject lines...',
  'Whispering sweet nothings to the data...',
  'Calibrating pixel perfection...',
  'Turning zeros into ones...',
  'Grooming HTML tags...',
  'Checking for email gremlins...',
  'Inserting witty puns...',
  'Running a background cat video...',
  'Sending a high-five to the cloud...',
  'Testing with invisible ink...',
]

export const Loader = ({ showProgress = false }) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval1 = setInterval(
      () => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval1)
            return 100
          }
          return prev + 1
        })
      },
      (40 * 1000) / 100,
    )

    const interval2 = setInterval(() => {
      setCurrentMessage((prevMessage) => {
        const currentIndex = messages.indexOf(prevMessage)
        const nextIndex = (currentIndex + 1) % messages.length
        return messages[nextIndex]
      })
    }, 5000)

    return () => {
      clearInterval(interval1)
      clearInterval(interval2)
    }
  }, [])

  return (
    <div className='loader-container'>
      <img src={loader} alt='loader' className='loader-image' />
      {showProgress && (
        <div className='loader-progress-box'>
          <motion.div
            className='loader-progress-line'
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'linear' }}
          >
            <div className='loader-progress-mask mask-1'></div>
            <div className='loader-progress-mask mask-2'></div>
            <div className='loader-progress-mask mask-3'></div>
          </motion.div>
        </div>
      )}
      <span color='var(--dino-white)' className='loader-text'>
        {currentMessage}
      </span>
    </div>
  )
}
