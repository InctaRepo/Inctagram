import {SVGProps, memo} from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill={props.color}
		height={20}
		viewBox="0 -960 960 960"
		width={20}
		{...props}
	>
		<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
	</svg>
)

export const CheckIcon = memo(SvgComponent)
