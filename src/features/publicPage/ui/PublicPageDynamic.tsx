import dynamic from 'next/dynamic'

export const PublicPageDynamic = dynamic(() =>
  import('src/features/publicPage/ui/PublicPage').then(mod => mod.PublicPage)
)
