import { getPublicPostLayout } from '@/src/components/layout/public-post-layout'
import { PublicPosts } from '@/src/components/public-posts'

const PublicPagePosts = () => {
  return <PublicPosts />
}

PublicPagePosts.getLayout = getPublicPostLayout

export default PublicPagePosts
