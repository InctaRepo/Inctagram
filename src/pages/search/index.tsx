import React from 'react'

import { SearchDynamic } from '@/src/features/search'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SearchPage: NextPageWithLayout = () => {
  return <SearchDynamic />
}

SearchPage.getLayout = getAuthLayout
export default SearchPage
