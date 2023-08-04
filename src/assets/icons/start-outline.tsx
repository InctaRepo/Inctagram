import {SVGProps, Ref, forwardRef, memo} from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" ref={ref} {...props}>
		<g clipPath="url(#a)">
			<path
				fill="#E6AC39"
				d="M11.707 14a.666.666 0 0 1-.307-.073L8 12.147l-3.4 1.78a.666.666 0 0 1-.967-.707L4.3 9.467 1.553 6.8a.667.667 0 0 1-.166-.667.667.667 0 0 1 .54-.453l3.8-.553L7.4 1.707a.667.667 0 0 1 1.2 0l1.693 3.413 3.8.553a.667.667 0 0 1 .54.454.666.666 0 0 1-.166.666L11.72 9.46l.667 3.753a.666.666 0 0 1-.267.667.667.667 0 0 1-.413.12ZM8 10.733a.614.614 0 0 1 .307.074l2.513 1.333-.48-2.807a.667.667 0 0 1 .193-.593l2-1.953-2.8-.414A.667.667 0 0 1 9.26 6L8 3.5 6.74 6a.667.667 0 0 1-.5.36l-2.8.413 2 1.954a.667.667 0 0 1 .193.593l-.48 2.773 2.514-1.333A.614.614 0 0 1 8 10.733Z"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h16v16H0z"/>
			</clipPath>
		</defs>
	</svg>
)
const ForwardRef = forwardRef(SvgComponent)

export const StarOutline = memo(ForwardRef)
