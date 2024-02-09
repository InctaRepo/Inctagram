import { useMemo } from 'react'

export const DOTS = '...'

const range = (start: number, end: number) => {
  let length = end - start + 1
  //end ic minchev start- ynkac length ,het +1 vor verchacnes length-y

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
  //oject ira proerty-enrov voronq parametrer en
  totalCount,
  currentPage,
  pageSize = 12,
  siblings = 1,
}: UsePaginationParamType) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)
    //page er-y baxhxven bajzanven math.ceil- i michocov  sax tvialner-y hasnen ,bashxven minchev verchin page
    const totalPageNumbers = siblings + 5

    if (totalPageNumbers >= totalPageCount) {
      //ete number-ka bayc el tvlyal chka ,number-y skselua 1-c,vor  aranc tvialneri tver chereva
      //1-ic minchev verchin-in page-y
      //пагинация будет ограничена от первой до последней страницы
      //определение числа страниц
      return range(1, totalPageCount)
    }
    //12...212
    const leftSiblingIndex = Math.max(currentPage - siblings, 1)
    //1-ic gna amen verchin cax tiv-y (page) ete  (1 nra hamara vor chancni sahmany ,chfra)
    const rightSiblingIndex = Math.min(currentPage + siblings, totalPageCount)
    //  totalPageCount nra hamar vorpaes 3 paramater vor tveri diapazonic chelni amena poqr tive lhlni  totalPageCount -ic poqr

    //3 clik aneluc heto erevuma Dots - cax koxmic
    const shouldShowLeftDots = leftSiblingIndex > 2
    // right side -ic because  erb hasnume  99 - i totalPageCount  -i start-ic 2 het a erevum menak  dots-y
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    // firstPageIndex  sksuma 1 hamaric
    // lastPageIndex  =static vichakna bayc dots erevume
    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    /*
                        Case 2: No left dots to show, but rights dots to be shown
                    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblings
      //leftItemCount -5 hata
      let leftRange = range(1, leftItemCount)

      //1-ic minchev verchin tivy caxic
      //vor value-ery lcven copy exac nor array-um amenagam vor sxmes
      return [...leftRange, DOTS, totalPageCount]
      //veradarcnuma zangvac  yndhanur  total page - count-i cax range dots-ov
    }

    /*
                        Case 3: No right dots to show, but left dots to be shown
                    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblings
      // yndhanur
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

      //vereadarcnuma  firstPageIndex- 1ic sksac-y   tox lini  rightRange  nor array -um  (rightRange copy es anum u nor array es unenum vor tex lcvum a caxic  )
      return [firstPageIndex, DOTS, ...rightRange]
    }

    /*
                        Case 4: Both left and right dots to be shown
                    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
    //depensice
    // return [1, 2, 3] as PaginationRange
  }, [siblings, pageSize, totalCount, currentPage]) as PaginationRange

  return paginationRange
}
