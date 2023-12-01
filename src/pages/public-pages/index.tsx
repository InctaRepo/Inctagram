import { getPublicPostLayout } from 'src/widgets/layout/publicPostLayout'
import { PublicPosts } from 'src/features/publicPosts'

const PublicPagePosts = () => {
  return <PublicPosts />
}

PublicPagePosts.getLayout = getPublicPostLayout

export default PublicPagePosts
