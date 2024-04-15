import KeyboardArrowLeft from '@/public/icon/chevronLeftIcon.svg'
import KeyboardArrowRight from '@/public/icon/chevronRightIcon.svg'
import { DOTS } from '@/shared/const'
import { usePagination } from '@/shared/hooks'
import { Typography } from '@/ui/typography'
import clsx from 'clsx'

import s from '@/shared/ui/pagination/pagination.module.scss'

type PaginationConditionals =
  | {
      onChange: (itemPerPage: number) => void
    }
  | {
      onChange?: never
    }

type Props = {
  className: string

  currentPage: number
  onChange: (page: number) => void
  pageSize: number
  siblings?: number
  totalCount: number
} & PaginationConditionals

export const Pagination = ({
  className,
  currentPage,
  onChange,
  pageSize,
  siblings,
  totalCount,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblings,
    totalCount,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onChange(currentPage + 1)
  }

  const onPrevious = () => {
    onChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Typography as={'ul'} className={clsx(s.paginationContainer, { [className]: className })}>
      <Typography
        as={'li'}
        className={clsx(s.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <KeyboardArrowLeft />
      </Typography>

      {paginationRange.map((pageNumber: number) => {
        if (pageNumber.toString() === DOTS) {
          return (
            <Typography as={'li'} className={`${s.paginationItem} ${s.dots}`} key={pageNumber}>
              &#8230;
            </Typography>
          )
        }

        return (
          <Typography
            as={'li'}
            className={clsx(`${s.paginationItem} `, {
              selected: pageNumber === currentPage,
            })}
            key={pageNumber}
            onClick={() => onChange(pageNumber)}
          >
            {pageNumber}
          </Typography>
        )
      })}

      <Typography
        as={'li'}
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
