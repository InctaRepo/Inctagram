
import  {Cards}  from "./Cards";
import type {Meta,StoryObj} from '@storybook/react'

// export default {
//     title:'Cards',
//     component:Cards,

//   }
    
//   export const Card=()=><Cards/>


const meta: Meta<typeof Cards> = {
  title: 'Components/Cards',
  component: Cards,
};




export default meta;

type Story = StoryObj<typeof Cards>

export const Primary: Story = {
    args: {
        primary: true
    }
};