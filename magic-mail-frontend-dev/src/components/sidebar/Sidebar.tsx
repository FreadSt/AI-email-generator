import { FC } from 'react'
import { Flex } from '../blocks/flex/Flex'
import { FormComponent } from './form/Form'
import './style.scss'

export const Sidebar: FC = () => {
  return (
    <Flex direction='column' className='sidebar'>
      <FormComponent />
    </Flex>
  )
}
