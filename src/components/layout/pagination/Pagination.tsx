import { FC } from 'react'

import classnames from 'classnames'

import { Typography } from '../../ui/typography'

import s from './pagination.module.scss'
import { DOTS, usePagination } from './usePagination'

import KeyboardArrowLeft from '@/src/assets/icons/key-board-arrow-left'
import KeyboardArrowRight from '@/src/assets/icons/key-board-arrow-right'

type PaginationConditionals =
  | {
      onChange: (itemPerPage: number) => void
    }
  | {
      onChange?: never
    }
//props- i hamar
export type PaginationProps = {
  onChange: (page: number) => void

  siblings?: number
  currentPage: number
  totalCount: number
  pageSize: number
  className: string
} & PaginationConditionals

export const Pagination: FC<PaginationProps> = props => {
  const { onChange, totalCount, siblings = 1, currentPage, pageSize, className } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblings,
    pageSize,
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

  let lastPage = paginationRange[paginationRange.length - 1]

  return (
    <Typography as="ul" className={classnames(s.paginationContainer, { [className]: className })}>
      {/*erbvor click es anum ashxatuma onPrevious is mich ayd anchataca qani ka ynacik page-y (text)-y*/}
      <Typography
        as="li"
        className={classnames(s.paginationItem, {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <KeyboardArrowLeft />
      </Typography>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber.toString() === DOTS) {
          return (
            <Typography as="li" key={index} className={`${s.paginationItem} ${s.dots}`}>
              &#8230;
            </Typography>
          )
        }

        return (
          <Typography
            as="li"
            key={index}
            className={classnames(`${s.paginationItem} `, {
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
        className={classnames(s.paginationItem, {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <KeyboardArrowRight />
      </Typography>
    </Typography>
  )
}
