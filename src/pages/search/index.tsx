import React from 'react'

import { SearchDynamic } from '@/features/search'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const SearchPage = () => <SearchDynamic />

SearchPage.getLayout = GetAuthLayout
export default SearchPage
