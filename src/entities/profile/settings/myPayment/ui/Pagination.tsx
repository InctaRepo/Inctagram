import clsx from 'clsx'

import { DOTS, usePagination } from './hook/usePagination'

import s from 'src/entities/profile/settings/myPayment/ui/myPayment.module.scss'

import KeyboardArrowLeft from '/public/icon/chevronLeftIcon.svg'
import KeyboardArrowRight from '/public/icon/chevronRightIcon.svg'

import { Typography } from 'src/shared/ui/typography'

type PaginationConditionals =
  | {
      onChange: (itemPerPage: number) => void
    }
  | {
      onChange?: never
    }

type Props = {
  onChange: (page: number) => void

  siblings?: number
  currentPage: number
  totalCount: number
  pageSize: number
  className: string
} & PaginationConditionals

export const MyPayment = ({
  onChange,
  siblings,
  currentPage,
  totalCount,
  pageSize,
  className,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblings,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
    //dwew
  }

  const onNext = () => {
    onChange(currentPage + 1)
  }

  const onPrevious = () => {
    onChange(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Typography as="ul" className={clsx(s.paginationContainer, { [className]: className })}>
      <Typography
        as="li"
        className={clsx(s.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <KeyboardArrowLeft />
      </Typography>

      {paginationRange.map(pageNumber => {
        if (pageNumber.toString() === DOTS) {
          return (
            <Typography as="li" key={pageNumber} className={`${s.paginationItem} ${s.dots}`}>
              &#8230;
            </Typography>
          )
        }

        return (
          <Typography
            key={pageNumber}
            as="li"
            className={clsx(`${s.paginationItem} `, {
              selected: pageNumber === currentPage,
            })}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </Typography>
        )
      })}

      <Typography
        as="li"
        className={clsx(s.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <KeyboardArrowRight />
      </Typography>
    </Typography>
  )
}
