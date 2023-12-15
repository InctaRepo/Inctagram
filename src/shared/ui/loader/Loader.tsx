import s from './loader.module.scss'

import { UseInfiniteScroll } from '@/src/shared/hooks/ useInfiniteScroll'

type LoaderProps = Pick<UseInfiniteScroll, 'isLoading' | 'loadMoreCallback' | 'isLastPage'>

export const Loader = ({ isLoading, isLastPage, loadMoreCallback }: LoaderProps) => {
  if (isLoading) return <span className={s.loader}></span>

  if (isLastPage) return <p>End of content</p>

  return <div ref={loadMoreCallback}>load </div>
}
