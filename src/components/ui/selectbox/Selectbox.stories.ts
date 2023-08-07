import type {Meta, StoryObj} from '@storybook/react';
import {Selectbox} from './Selectbox';

const meta: Meta<typeof Selectbox> = {
  title: 'Select',
  component: Selectbox,
};

export default meta;
type Story = StoryObj<typeof Selectbox>;

export const Default: Story = {
	args: {
		// status: 'default',
	},
};

//
// export const Active: Story = {
//   args: {
//     status: 'active',
//   },
// };
//
// export const Hover: Story = {
//   args: {
//     status: 'hover',
//   },
// };
//
// export const Focus: Story = {
//   args: {
//     status: 'focus',
//   },
// };
//
// export const Disabled: Story = {
//     args: {
//       status: 'disabled',
//     },
//   };