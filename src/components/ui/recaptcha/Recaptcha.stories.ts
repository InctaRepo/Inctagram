import type {Meta, StoryObj} from '@storybook/react';
import {Recaptcha} from './Recaptcha';


const meta: Meta<typeof Recaptcha> = {
    title: 'Components/Recaptcha',
    component: Recaptcha,
};

export default meta;

type Story = StoryObj<typeof Recaptcha>

export const Primary: Story = {
    args: {
        primary: true
    }
};

export const Error: Story = {
    args: {
        primary: false
    }
};

export const Expired: Story = {
    args: {
        expired: true
    }
};