import { PublicPosts } from '@/src/features/publicPosts'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const PublicPagePosts = () => {
  return <PublicPosts />
}

PublicPagePosts.getLayout = getAuthLayout

export default PublicPagePosts
