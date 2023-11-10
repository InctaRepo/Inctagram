import React, { useMemo, useState } from 'react'

import { Typography } from '../../../ui/typography'
import { Pagination } from '../Pagination'

import s from './style.module.scss'

import data from '@/src/components/layout/pagination/examples/data/mock-data.json'

let PageSize = 10

export function Main() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(data.length / PageSize)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize

    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  const handlePageChange = (page: number) => {
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
              ID
            </Typography>
            <Typography as="th">FIRST NAME</Typography>
            <Typography as="th">LAST NAME</Typography>
            <Typography as="th">EMAIL</Typography>
            <Typography as="th">PHONE</Typography>
          </Typography>
        </Typography>
        <Typography as="tbody">
          {currentTableData.map((item, index) => (
            <Typography as="tr" key={index} className={s.tr}>
              <Typography as="td">{item.id}</Typography>
              <Typography as="td">{item.first_name}</Typography>
              <Typography as="td">{item.last_name}</Typography>
              <Typography as="td">{item.email}</Typography>
              <Typography as="td">{item.phone}</Typography>
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
