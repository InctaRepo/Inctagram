import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import { useRouter } from 'next/router'

export const formatPostCreatedAt = (createdAt: string): string => {
  TimeAgo.addLocale(en)
  TimeAgo.addLocale(ru)
  const { locale } = useRouter()
  const timeAgo = new TimeAgo(locale!)
  const postDate = new Date(createdAt)

  return timeAgo.format(postDate.getTime(), 'round-minute')
}
