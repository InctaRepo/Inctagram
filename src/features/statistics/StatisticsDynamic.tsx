import dynamic from 'next/dynamic'

export const StatisticsDynamic = dynamic(() => import('./Statistics').then(mod => mod.Statistics))
