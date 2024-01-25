import { PublicPosts } from '@/features/publicPosts'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const PublicPagePosts = () => {
  return <PublicPosts />
}

PublicPagePosts.getLayout = getAuthLayout

export default PublicPagePosts
