import { useMemo } from 'react'

export const DOTS = '...'

const range = (start: number, end: number) => {
  let length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

type UsePaginationParamType = {
  totalCount: number
  currentPage: number
  pageSize: number
  siblings?: number
}

type PaginationRange = number[]

export const usePagination = ({
  totalCount,
  currentPage,
  pageSize = 12,
  siblings = 1,
}: UsePaginationParamType) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    const totalPageNumbers = siblings + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }
    //12...212
    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
                                    Case 2: No left dots to show, but rights dots to be shown
                                */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblings
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    /*
                                    Case 3: No right dots to show, but left dots to be shown
                                */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblings
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
                                    Case 4: Both left and right dots to be shown
                                */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [siblings, pageSize, totalCount, currentPage]) as PaginationRange

  return paginationRange
}
