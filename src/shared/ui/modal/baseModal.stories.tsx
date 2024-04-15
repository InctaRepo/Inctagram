import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '@/ui/button'
import { Modal } from '@/ui/modal'
import { Typography } from '@/ui/typography'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
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
        <Modal {...args} onClose={handler} open={open} title={'Default Modal'}>
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
          actionButtonName={'OK'}
          onClose={handler}
          open={open}
          title={'With One Button'}
        >
          <Typography variant={'regular16'}>
            We have sent a link to confirm your email to epam@epam.com
          </Typography>
        </Modal>
      </>
    )
  },
}
