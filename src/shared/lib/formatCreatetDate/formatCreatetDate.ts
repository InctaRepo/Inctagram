export const formatPostCreatedAt = (createdAt: string): string => {
  const now = new Date()
  const postDate = new Date(createdAt)
  const differenceInMinutes = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60))

  if (differenceInMinutes < 2) {
    return `${differenceInMinutes} min ago`
  } else if (differenceInMinutes < 24 * 60) {
    const differenceInHours = Math.floor(differenceInMinutes / 60)

    return `${differenceInHours} hours ago`
  } else if (differenceInMinutes < 30 * 24 * 60) {
    const differenceInDays = Math.floor(differenceInMinutes / (24 * 60))

    return `${differenceInDays} days ago`
  } else {
    const differenceInMonths = Math.floor(differenceInMinutes / (30 * 24 * 60))

    return `${differenceInMonths} month ago`
  }
}
