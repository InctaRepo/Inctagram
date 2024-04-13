import { useCallback, useEffect, useRef, useState } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetUserPostResponse, useGetUserPostsQuery } from '@/features/posts'

export type UseInfiniteScrollSchema = {
  dynamicPosts?: GetUserPostResponse[]
  hasDynamicPosts?: boolean
  isLastPage?: boolean
  isLoading?: boolean
  loadMoreCallback?: (el: HTMLDivElement) => void
}

export const useInfiniteScroll = (
  posts: GetUserPostResponse[],
  userId: string
): UseInfiniteScrollSchema => {
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(2)
  const [hasDynamicPosts, setHasDynamicPosts] = useState(false)
  const [dynamicPosts, setDynamicPosts] = useState<GetUserPostResponse[]>(posts)
  const [isLastPage, setIsLastPage] = useState(false)

  const { data, isSuccess, refetch } = useGetUserPostsQuery({
    pageNumber: page,
    userId: userId!,
  })

  const observerRef = useRef<IntersectionObserver>()
  // eslint-disable-next-line no-undef
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500)
  // eslint-disable-next-line no-undef
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout)
  let newPosts = null

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    newPosts = data?.data?.items
    if (dynamicPosts?.length === data?.data?.totalCount) {
      setIsLastPage(true)
    }
  }, [data?.data, isSuccess, page, dynamicPosts])

  useEffect(() => {
    if (dynamicPosts?.length > data?.data?.totalCount!) {
      setIsLastPage(false)
      setPage(1)
    }
  }, [data?.data?.totalCount, dynamicPosts?.length])
  // }, [data?.data?.totalCount])
  useEffect(() => {
    if (page === 1 && dynamicPosts?.length != data?.data.totalCount!) {
      refetch()
        .unwrap()
        .then(payload => {
          if (payload) {
            setDynamicPosts(payload?.data?.items!)
          }
        })
    }
  }, [data?.data.totalCount, dynamicPosts?.length, page, refetch])
  // }, [ page])

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0]

      if (target.isIntersecting) {
        setIsLoading(true)
        clearTimeout(loadMoreTimeoutRef.current)

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          if (page < data?.data?.pagesCount!) {
            setPage(page + 1)
          }

          if (dynamicPosts?.length < data?.data?.totalCount!) {
            const newDynamicPosts = [...dynamicPosts, ...newPosts!]

            setDynamicPosts(newDynamicPosts)
            setIsLastPage(newDynamicPosts?.length >= data?.data.totalCount!)
            setHasDynamicPosts(true)
            setIsLoading(false)
          }
          setIsLoading(false)
        }, 500)
      }
      setIsLoading(false)
    },
    [page, data?.data?.pagesCount, data?.data.totalCount, dynamicPosts, newPosts]
    //[
    //       loadMoreTimeoutRef,
    //       setIsLoading,
    //       page,
    //       dynamicPosts,
    //       isSuccess,
    //       newPosts,
    //       data?.data?.totalCount!,
    //     ]
  )

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) {
        return
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      // eslint-disable-next-line no-undef
      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observerRef.current = new IntersectionObserver(handleObserver, option)

      if (el) {
        observerRef.current.observe(el)
      }
    },
    [handleObserver, isLoading]
  )

  return {
    dynamicPosts,
    hasDynamicPosts,
    isLastPage,
    isLoading,
    loadMoreCallback,
  }
}
