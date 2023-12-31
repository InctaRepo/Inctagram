import dynamic from 'next/dynamic'

export const MessageDynamic = dynamic(() => import('./Message').then(mod => mod.Message))
