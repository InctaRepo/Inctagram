// import React from 'react'
// import { render, cleanup } from '@testing-library/react'
// import Icons from '../IconsComponent'
// import style from '../IconsComponent.module.scss'

// const iconsSubcomponent: Array<string> = ['Home', 'Create', 'Profile', 'Messenger', 'Search', 'Statistics', 'Favorites', 'Logout']
// const disabledProps = [true, false]

// describe('render snapshot correctly \t', () => {
//   afterEach(cleanup)

//   iconsSubcomponent.map((Subcomponent: string) => {
//     disabledProps.map((isDisabled) => {
//       it(`Subcomponent: ${Subcomponent} \t
//       disabled: ${isDisabled} \t
//       `, () => {
//         const Icon = Icons[Subcomponent as keyof typeof Icons]
//         const props = { isDisabled: isDisabled }
//         const { asFragment } = render(<Icon {...props} />)
//         expect(asFragment()).toMatchSnapshot()
//       })
//     })
//   })
// })

// describe('Icons', () => {
//   afterEach(cleanup)
//   it('renders correctly', () => {
//     const { getByText } = render(<Icons.Home />)

//     const IconElement = getByText('Home')
//     expect(IconElement).toBeInTheDocument()
//   })

//   it('custom text renders correctly', () => {
//     const { getByText } = render(<Icons.Home customText="test" />)

//     const IconElement = getByText('test')
//     expect(IconElement).toBeInTheDocument()
//   })

//   it('custom class renders correctly', () => {
//     const { getByText } = render(<Icons.Home customClass="test" />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('a')).toHaveClass('test')
//   })

//   it('redirects to the specified url', () => {
//     const { getByText } = render(<Icons.Home url="test" />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('a')).toHaveAttribute('href', 'test')
//   })

//   it('link doesnt work when disabled', () => {
//     const { getByText } = render(<Icons.Home url="test" isDisabled={true} />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('a')).toBeFalsy()
//   })

//   it('have disabled class when disabled', () => {
//     const { getByText } = render(<Icons.Home isDisabled={true} />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('div')).toHaveClass(style.IconWrapperDisabled)
//   })

//   it('have active class when active', () => {
//     const { getByText } = render(<Icons.Home isActive={true} />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('a')).toHaveClass(style.IconWrapperActive)
//   })

//   it('link doesnt work when active and disabled', () => {
//     const { getByText } = render(<Icons.Home isActive={true} isDisabled={true} />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('a')).toBeFalsy()
//   })

//   it('have only disabled class when active and disabled', () => {
//     const { getByText } = render(<Icons.Home isActive={true} isDisabled={true} />)

//     const IconElement = getByText('Home')
//     expect(IconElement.closest('div')).toHaveClass(style.IconWrapperDisabled)
//   })
// })
