import { useCallback, useRef, useState } from 'react'

// eslint-disable-next-line import/order
import axios from 'axios'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useRouter } from 'next/dist/client/router'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { GetUserPostResponse } from '@/src/features/posts'

export interface UseInfiniteScroll {
  isLoading: boolean
  loadMoreCallback: (el: HTMLDivElement) => void
  hasDynamicPosts: boolean
  dynamicPosts: GetUserPostResponse[]
  isLastPage: boolean
}

export const useInfiniteScroll = (posts: GetUserPostResponse[]): UseInfiniteScroll => {
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasDynamicPosts, setHasDynamicPosts] = useState(false)
  const [dynamicPosts, setDynamicPosts] = useState<GetUserPostResponse[]>(posts)
  const [isLastPage, setIsLastPage] = useState(false)
  const router = useRouter()
  const userId = router.query.id as string
  const observerRef = useRef<IntersectionObserver>()
  const loadMoreTimeout: NodeJS.Timeout = setTimeout(() => null, 500)
  const loadMoreTimeoutRef = useRef<NodeJS.Timeout>(loadMoreTimeout)

  const handleObserver = useCallback(
    (entries: any[]) => {
      const target = entries[0]

      if (target.isIntersecting) {
        setIsLoading(true)
        clearTimeout(loadMoreTimeoutRef.current)

        // this timeout debounces the intersection events
        loadMoreTimeoutRef.current = setTimeout(() => {
          axios.get(`https://inctagram.space/api/v1/posts/${userId}/${page}`).then(resp => {
            setPage(page + 1)
            const newPosts = resp?.data['posts']

            if (newPosts?.length) {
              const newDynamicPosts = [...dynamicPosts, ...newPosts]

              setDynamicPosts(newDynamicPosts)
              setIsLastPage(newDynamicPosts?.length === resp?.data['total'])
              setHasDynamicPosts(true)
              setIsLoading(false)
            }
          })
        }, 500)
      }
    },
    [loadMoreTimeoutRef, setIsLoading, page, dynamicPosts]
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
