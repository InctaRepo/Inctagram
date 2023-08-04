import {memo, SVGProps} from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={36}
		height={36}
		fill="none"
		{...props}
	>
		<g clipPath="url(#a)">
			<path
				fill="#EA4335"
				d="M7.9 14.6a10.6 10.6 0 0 1 16.7-4.9L30 4.5a18 18 0 0 0-28 5.5l6 4.6Z"
			/>
			<path
				fill="#34A853"
				d="M24 27a11 11 0 0 1-6 1.6c-4.7 0-8.7-3-10-7.2L1.8 26a18 18 0 0 0 27.9 5.5L24 27Z"
			/>
			<path
				fill="#4A90E2"
				d="M29.8 31.5a18 18 0 0 0 5-16.8H18v7h9.7A8.1 8.1 0 0 1 24 27l5.7 4.5Z"
			/>
			<path
				fill="#FBBC05"
				d="M8 21.4a10.7 10.7 0 0 1-.1-6.8l-6-4.6a17.9 17.9 0 0 0 0 16l6-4.6Z"
			/>
		</g>
		<defs>
			<clipPath id="a">
				<path fill="#fff" d="M0 0h36v36H0z"/>
			</clipPath>
		</defs>
	</svg>
)
const GoogleIcon = memo(SvgComponent)
export default GoogleIcon
