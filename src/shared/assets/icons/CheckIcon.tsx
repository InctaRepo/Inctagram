import { SVGProps, memo } from 'react'

export const CheckIcon = memo((props: SVGProps<SVGSVGElement>) => (
  <svg
    fill={props.color}
    height={24}
    viewBox={'0 -960 960 960'}
    width={24}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path d={'M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'} />
  </svg>
))
