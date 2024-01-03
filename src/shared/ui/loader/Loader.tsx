import { UseInfiniteScrollSchema } from '@/src/shared/hooks'
import s from '@/src/shared/ui/loader/loader.module.scss'

type LoaderProps = Pick<UseInfiniteScrollSchema, 'isLoading' | 'loadMoreCallback' | 'isLastPage'>

export const Loader = ({ isLoading, isLastPage, loadMoreCallback }: LoaderProps) => {
  if (isLoading)
    return (
      <div ref={loadMoreCallback}>
        <span className={s.loader}></span>
      </div>
    )

  if (isLastPage)
    return (
      <div ref={loadMoreCallback}>
        <p>End of content</p>
      </div>
    )

  return (
    <div ref={loadMoreCallback}>
      <span className={s.loader}></span>{' '}
    </div>
  )
}
