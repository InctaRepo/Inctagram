import dynamic from 'next/dynamic'

export const SearchDynamic = dynamic(() => import('./Search').then(mod => mod.Search))
