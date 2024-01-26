import React from 'react'

import { SearchDynamic } from '@/features/search'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const SearchPage: NextPageWithLayout = () => {
  return <SearchDynamic />
}

SearchPage.getLayout = getAuthLayout
export default SearchPage
