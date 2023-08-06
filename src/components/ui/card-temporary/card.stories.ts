import type { StoryObj} from '@storybook/react'

import {Card} from './'

const meta = {
	title: 'Components/Card',
	component: Card,
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const CardExample: Story = {
	args: {
		children:
			'card example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example textcard example text',
	},
}
