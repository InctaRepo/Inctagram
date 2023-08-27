import { memo, SVGProps } from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g id="Layer 2">
      <g id="message-circle">
        <path
          id="Vector"
          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
          fill={props.color}
        />
        <path
          id="Vector_2"
          d="M16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11C15.4477 11 15 11.4477 15 12C15 12.5523 15.4477 13 16 13Z"
          fill={props.color}
        />
        <path
          id="Vector_3"
          d="M8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13Z"
          fill={props.color}
        />
        <path
          id="Vector_4"
          d="M19.0701 4.92999C17.4293 3.27849 15.2638 2.2512 12.9467 2.02523C10.6297 1.79926 8.30647 2.38877 6.3775 3.69212C4.44854 4.99548 3.03475 6.931 2.37988 9.165C1.72501 11.399 1.87009 13.7915 2.79012 15.93C2.88601 16.1288 2.91747 16.3525 2.88012 16.57L2.00012 20.8C1.96621 20.9622 1.97314 21.1302 2.02027 21.2891C2.06739 21.4479 2.15325 21.5925 2.27012 21.71C2.36592 21.8051 2.47999 21.8798 2.60545 21.9297C2.73091 21.9795 2.86516 22.0034 3.00012 22H3.20012L7.48012 21.14C7.69765 21.1138 7.91824 21.1449 8.12012 21.23C10.2586 22.15 12.6511 22.2951 14.8851 21.6402C17.1191 20.9854 19.0546 19.5716 20.358 17.6426C21.6613 15.7136 22.2508 13.3904 22.0249 11.0734C21.7989 8.75635 20.7716 6.59078 19.1201 4.94999L19.0701 4.92999ZM19.9001 13.29C19.7046 14.484 19.2408 15.6181 18.5437 16.6069C17.8465 17.5957 16.9342 18.4136 15.8753 18.9988C14.8164 19.5841 13.6385 19.9216 12.4303 19.9859C11.2222 20.0502 10.0151 19.8396 8.90012 19.37C8.50466 19.2018 8.07985 19.1134 7.65012 19.11C7.4624 19.1113 7.2751 19.128 7.09012 19.16L4.27012 19.73L4.84012 16.91C4.95364 16.2993 4.88046 15.6685 4.63012 15.1C4.16051 13.985 3.94992 12.7779 4.01421 11.5698C4.0785 10.3616 4.41598 9.18374 5.00126 8.12484C5.58654 7.06595 6.40438 6.15359 7.39321 5.45644C8.38205 4.75929 9.51614 4.29551 10.7101 4.09999C11.9634 3.89431 13.2476 3.98997 14.4566 4.37905C15.6656 4.76814 16.7645 5.43948 17.6626 6.33753C18.5606 7.23558 19.232 8.33454 19.6211 9.54351C20.0101 10.7525 20.1058 12.0367 19.9001 13.29Z"
          fill={props.color}
        />
      </g>
    </g>
  </svg>
)

const MessageIcon = memo(SvgComponent)

export default MessageIcon