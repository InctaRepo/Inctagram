import React from 'react'

import { MessageDynamic } from '@/features/message'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const MessagesPage: NextPageWithLayout = () => <MessageDynamic />

MessagesPage.getLayout = GetAuthLayout
export default MessagesPage
