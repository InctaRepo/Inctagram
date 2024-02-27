import dynamic from 'next/dynamic'

export const MessageDynamic = dynamic(() => import('./Messages').then(mod => mod.Message))
