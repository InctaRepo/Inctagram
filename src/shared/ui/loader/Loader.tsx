import { UseInfiniteScrollSchema } from '@/shared/hooks'

import s from '@/ui/loader/loader.module.scss'

type LoaderProps = Pick<UseInfiniteScrollSchema, 'isLastPage' | 'isLoading' | 'loadMoreCallback'>

export const Loader = ({ isLastPage, isLoading, loadMoreCallback }: LoaderProps) => {
  if (isLoading) {
    return (
      <div ref={loadMoreCallback}>
        <span className={s.loader}></span>
      </div>
    )
  }

  if (isLastPage) {
    return (
      <div ref={loadMoreCallback}>
        <p>End of content</p>
      </div>
    )
  }

  return (
    <div ref={loadMoreCallback}>
      <span className={s.loader}></span>{' '}
    </div>
  )
}
