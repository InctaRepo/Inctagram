import {SVGProps, memo} from 'react'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 48 1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <title>{'Rectangle 5'}</title>
    <desc>{'Created with Sketch.'}</desc>
    <defs/>
    <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g
        id="19-Separator"
        transform="translate(-129.000000, -156.000000)"
        fill="#063855"
      >
        <g id="Controls/Settings" transform="translate(80.000000, 0.000000)">
          <g id="Content" transform="translate(0.000000, 64.000000)">
            <g id="Group" transform="translate(24.000000, 56.000000)">
              <g id="Group-2">
                <rect id="Rectangle-5" x={25} y={36} width={48} height={1}/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)
const FlagRussiaIcon = memo(SvgComponent)
export default FlagRussiaIcon
