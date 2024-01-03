import dynamic from 'next/dynamic'

export const HomeDynamic = dynamic(() => import('./Home').then(mod => mod.Home))
