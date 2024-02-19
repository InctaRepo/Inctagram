import React, { useMemo, useState } from 'react'

import data from '@/entities/profile/settings/myPayment/ui/data/mockData.json'
import s from '@/entities/profile/settings/myPayment/ui/myPayment.module.scss'
import { Pagination } from '@/ui/pagination/Pagination'
import { Typography } from '@/ui/typography'

let PageSize = 10

export const MyPayment = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / PageSize)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize

    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  const handlePageChange = (page: number) => {
    //cikla 1.ete ka tex galu tox mi mi agam arag ga  ,2.ete ete tex chka galu toxa ereva uxaki  totalPages-y
    if (page < 1) {
      setCurrentPage(1) // Set to the first page
    } else if (page > totalPages) {
      setCurrentPage(totalPages) // Set to the last page
    } else {
      setCurrentPage(page)
    }
  }

  return (
    <div>
      <Typography as="table" className={s.table}>
        <Typography as="thead" className={s.thead}>
          <Typography as="tr" className={s.tr}>
            <Typography as="th" className={s.th}>
              Date of Payment
            </Typography>
            <Typography as="th">End date subscription</Typography>
            <Typography as="th">Price</Typography>
            <Typography as="th">Subscription Type </Typography>
            <Typography as="th">Payment Type</Typography>
          </Typography>
        </Typography>
        <Typography as="tbody">
          {currentTableData.map((item, index) => (
            <Typography key={index} as="tr" className={s.userTableRow}>
              <Typography as="td">{item.DateOfPayment}</Typography>
              <Typography as="td">{item.EndDateSubscription}</Typography>
              <Typography className={s.price} as="td">
                {item.Price}
              </Typography>
              <Typography as="td">{item.SubscriptionType}</Typography>
              <Typography as="td">{item.PaymentType}</Typography>
            </Typography>
          ))}
        </Typography>
      </Typography>

      <Pagination
        className={s.paginationBar}
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onChange={handlePageChange}
      />
    </div>
  )
}
