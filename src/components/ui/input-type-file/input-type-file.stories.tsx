import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/src/components/ui/button'

import { Typography } from '@/src/components/ui/typography'
import {InputTypeFile} from "@/src/components/ui/input-type-file/input-type-file";

const meta = {
    title: 'Components/InputTypeFile',
    component: InputTypeFile,
    tags: ['autodocs'],
    argTypes: {},
}

export default meta
type Story = StoryObj<typeof InputTypeFile >

export const Primary: Story = {
    args: {}
}
