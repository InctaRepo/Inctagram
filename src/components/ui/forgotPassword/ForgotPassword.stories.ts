import type {Meta, StoryObj} from '@storybook/react';
import {ForgotPassword} from './ForgotPassword';


const meta: Meta<typeof ForgotPassword> = {
    title: 'Components/ForgotPassword',
    component: ForgotPassword,
};

export default meta;

type Story = StoryObj<typeof ForgotPassword>

export const Primary: Story = {
    args: {
        primary: true
    }
};

export const Secondary: Story = {
    args: {
        primary: false
    }
};