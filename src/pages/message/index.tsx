import React from 'react'

import { MessageDynamic } from '@/src/features/message'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const MessagesPage: NextPageWithLayout = () => {
  return <MessageDynamic />
}

MessagesPage.getLayout = getAuthLayout
export default MessagesPage
