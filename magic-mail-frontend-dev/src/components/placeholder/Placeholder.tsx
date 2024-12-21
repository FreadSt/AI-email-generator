import { FC } from 'react'
import './style.scss'
import { Text } from '../blocks/text/Text'
import { Flex } from '../blocks/flex/Flex'
import { PlaceholderStars } from '../blocks/icon/Icon'
import logo from '../../assets/images/placeholder-logo.svg'

export const Placeholder: FC = () => {
  return (
    <Flex className='placeholder' direction='column' align='center' justify='center' gap={30}>
      {/*<div className='placeholder-void'>*/}
      {/*  <PlaceholderStars />*/}
      {/*  <Flex direction='column' align='center' justify='center' gap={20}>*/}
      {/*    <Text*/}
      {/*      text='Nothing magical has happened yet...'*/}
      {/*      color='var(--dino-purple-box)'*/}
      {/*      fontSize='24px'*/}
      {/*      styles={{ padding: '0 15px' }}*/}
      {/*    />*/}
      {/*    <p className='place-desc'>*/}
      {/*      Please complete the prompt on the left and hit ‘Generate an email’. We’ll display a*/}
      {/*      preview of your <span className='place-magic'>MagicMail</span> in this area once it’s*/}
      {/*      ready.*/}
      {/*    </p>*/}
      {/*  </Flex>*/}
      {/*</div>*/}
      <img src={logo} alt='' />
    </Flex>
  )
}
