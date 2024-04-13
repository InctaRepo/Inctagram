import { useMemo } from 'react'

import { DOTS } from '@/shared/const'

const range = (start: number, end: number) => {
  const length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}

type Props = {
  currentPage: number
  pageSize: number
  siblings?: number
  totalCount: number
}

type PaginationRange = number[]

export const usePagination = ({
  currentPage,
  pageSize = 12,
  siblings = 1,
  //oject ira proerty-enrov voronq parametrer en
  totalCount,
}: Props) => {
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
      const leftItemCount = 3 + 2 * siblings
      //leftItemCount -5 hata
      const leftRange = range(1, leftItemCount)

      //1-ic minchev verchin tivy caxic
      //vor value-ery lcven copy exac nor array-um amenagam vor sxmes
      return [...leftRange, DOTS, totalPageCount]
      //veradarcnuma zangvac  yndhanur  total page - count-i cax range dots-ov
    }

    /*
                        Case 3: No right dots to show, but left dots to be shown
                    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblings
      // yndhanur
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
                        Case 4: Both left and right dots to be shown
                    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
    //depensice
    // return [1, 2, 3] as PaginationRange
  }, [siblings, pageSize, totalCount, currentPage]) as PaginationRange

  return paginationRange
}
