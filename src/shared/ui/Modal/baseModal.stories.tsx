import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../button'
import { Typography } from '../typography'
import { Modal } from './Modal'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof Modal>

export const DefaultModal: Story = {
  render: args => {
    const [open, setOpen] = useState(false)
    const handler = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal</Button>
        <Modal {...args} title={'Default Modal'} open={open} onClose={handler}>
          <Typography variant={'regular16'}>
            We have sent a link to confirm your email to epam@epam.com
          </Typography>
        </Modal>
      </>
    )
  },
}

export const ModalWithSaveButton: Story = {
  render: args => {
    const [open, setOpen] = useState(false)
    const handler = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal</Button>
        <Modal
          {...args}
          title={'With One Button'}
          open={open}
          actionButtonName={'OK'}
          onClose={handler}
        >
          <Typography variant={'regular16'}>
            We have sent a link to confirm your email to epam@epam.com
          </Typography>
        </Modal>
      </>
    )
  },
}
