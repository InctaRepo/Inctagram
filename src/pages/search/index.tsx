import React from 'react'

import { SearchDynamic } from '@/features/search'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SearchPage: NextPageWithLayout = () => <SearchDynamic />

SearchPage.getLayout = GetAuthLayout
export default SearchPage
