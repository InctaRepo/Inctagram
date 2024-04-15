import React from 'react'

import { MessageDynamic } from '@/features/message'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const MessagesPage = () => <MessageDynamic />

MessagesPage.getLayout = GetAuthLayout
export default MessagesPage
