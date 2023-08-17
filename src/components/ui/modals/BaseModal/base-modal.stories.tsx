import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/src/components/ui/button'
import BaseModal from '@/src/components/ui/modals/BaseModal/BaseModal'
import { Typography } from '@/src/components/ui/typography'

const meta = {
  title: 'Components/Modal',
  component: BaseModal,
  tags: ['autodocs'],
} satisfies Meta<typeof BaseModal>

export default meta
type Story = StoryObj<typeof BaseModal>

export const DefaultModal: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)
    const handler = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal</Button>
        <BaseModal {...args} title={'Default Modal'} open={open} onClose={handler}>
          <Typography variant={'regular16'}>
            We have sent a link to confirm your email to epam@epam.com
          </Typography>
        </BaseModal>
      </>
    )
  },
}

export const ModalWithSaveButton: Story = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false)
    const handler = () => {
      setOpen(!open)
    }

    return (
      <>
        <Button onClick={() => setOpen(true)}>Modal</Button>
        <BaseModal
          {...args}
          title={'With One Button'}
          open={open}
          actionButtonName={'OK'}
          onClose={handler}
        >
          <Typography variant={'regular16'}>
            We have sent a link to confirm your email to epam@epam.com
          </Typography>
        </BaseModal>
      </>
    )
  },
}
