import type { StoryObj } from '@storybook/react'
import { Meta } from '@storybook/react'
import { Provider } from 'react-redux'

import { InvalidLinkVerification } from './InvalidLinkVerification'

import { store } from '@/src/store'

const meta = {
  title: 'pages/InvalidLinkVerification',
  component: InvalidLinkVerification,
  decorators: [
    Story => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/M7753HAzy0tm9rQWyRBrnI/Inctagram?type=design&node-id=335-6767&mode=design&t=YRhdR3HjVBVklJmy-0',
    },
  },
} satisfies Meta<typeof InvalidLinkVerification>

export default meta
type Story = StoryObj<typeof InvalidLinkVerification>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
