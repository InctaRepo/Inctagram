import type {Meta, StoryObj} from '@storybook/react';
import {CreateNewPassword} from './CreateNewPassword';

const meta = {
    title: 'Components/CreateNewPassword',
    component: CreateNewPassword,
    parameters: {
        layout: "centered",
    },
    tags: ['autodocs'],
    argTypes: {
        onSubmitHandler: {
            action: 'submit',
        },
    },
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {},
}