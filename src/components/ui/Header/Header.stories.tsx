
import Header from "./Header";

import type { Meta, StoryObj } from '@storybook/react'

// import { Story, Meta } from '@storybook/addon-docs/blocks';

const meta: Meta<typeof Header> = {
    title: 'Components/Header',
    component: Header,
};





// export default {
//   title:'Header',
//   component:Header,
// }
    
export default meta;

type Story = StoryObj<typeof Header>

export const Primary: Story = {
    args: {
        primary: true
    }
};