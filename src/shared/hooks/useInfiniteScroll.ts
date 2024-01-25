import { useCallback, useEffect, useRef, useState } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetUserPostResponse, useGetUserPostsQuery } from '@/src/features/posts'

export type UseInfiniteScrollSchema = {
  isLoading?: boolean
  loadMoreCallback?: (el: HTMLDivElement) => void
  hasDynamicPosts?: boolean
  dynamicPosts?: GetUserPostResponse[]
  isLastPage?: boolean
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
    userId: userId!,
    pageNumber: page,
  })

  const observerRef = useRef<IntersectionObserver>()
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500)
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout)
  let newPosts = null

  useEffect(() => {
    newPosts = data?.data.items
    if (dynamicPosts?.length === data?.data.totalCount) {
      setIsLastPage(true)
    }
  }, [data, isSuccess, page, dynamicPosts])
  useEffect(() => {
    if (dynamicPosts?.length > data?.data.totalCount!) {
      setIsLastPage(false)
      setPage(1)
    }
  }, [data?.data?.totalCount!])
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
  }, [page])

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0]

      if (target.isIntersecting) {
        setIsLoading(true)
        clearTimeout(loadMoreTimeoutRef.current)

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          if (page < data?.data.pagesCount!) {
            setPage(page + 1)
          }

          if (dynamicPosts?.length < data?.data.totalCount!) {
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
    [
      loadMoreTimeoutRef,
      setIsLoading,
      page,
      dynamicPosts,
      isSuccess,
      newPosts,
      data?.data?.totalCount!,
    ]
  )

  const loadMoreCallback = useCallback(
    (el: HTMLDivElement) => {
      if (isLoading) return
      if (observerRef.current) observerRef.current.disconnect()

      const option: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observerRef.current = new IntersectionObserver(handleObserver, option)

      if (el) observerRef.current.observe(el)
    },
    [handleObserver, isLoading]
  )

  return {
    isLoading,
    loadMoreCallback,
    hasDynamicPosts,
    dynamicPosts,
    isLastPage,
  }
}
