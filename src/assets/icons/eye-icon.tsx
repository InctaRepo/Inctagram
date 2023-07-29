import {SVGProps, memo} from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		fill={props.color ? props.color : '#fff'}
		xmlns="http://www.w3.org/2000/svg"
		width={20}
		height={20}
		viewBox="0 -960 960 960"
		{...props}
	>
		<path
			d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-143 0-260-78T48-480q55-131 172-209t260-79q143 0 260 79t172 209q-55 131-172 210t-260 78Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/>
	</svg>
)
const EyeIcon = memo(SvgComponent)

export default EyeIcon
