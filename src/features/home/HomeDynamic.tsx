import dynamic from 'next/dynamic'

export const HomeDynamic = dynamic(() => import('./HomeCH').then(mod => mod.Home))
