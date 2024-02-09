import React, { useMemo, useState } from 'react'

import { MyPayment } from '../MyPayment'

import data from './data/mock-data.json'
import s from './style.module.scss'

import { Typography } from '@/shared/ui/typography'

let PageSize = 10

export const Main = () => {
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
      //t
      setCurrentPage(page)
    }
  }

  return (
    <div className={s.main}>
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
          {currentTableData.map(item => (
            <Typography key={item.id} as="tr" className={s.userTableRow}>
              <Typography as="td">{item.id}</Typography>
              <Typography as="td">{item.first_name}</Typography>
              <Typography as="td">{item.last_name}</Typography>
              <Typography as="td">{item.email}</Typography>
              <Typography as="td">{item.phone}</Typography>
            </Typography>
          ))}
        </Typography>
      </Typography>

      <MyPayment
        className={s.paginationBar}
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onChange={handlePageChange}
      />
    </div>
  )
}
