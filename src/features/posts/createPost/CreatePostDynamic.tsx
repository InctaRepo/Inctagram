import dynamic from 'next/dynamic'

export const CreatePostDynamic = dynamic(() =>
  import('./CreateNewPost').then(mod => mod.CreateNewPost)
)
