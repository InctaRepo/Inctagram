import React from 'react'

import { MessageDynamic } from '@/features/message'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const MessagesPage: NextPageWithLayout = () => <MessageDynamic />

MessagesPage.getLayout = getAuthLayout
export default MessagesPage
