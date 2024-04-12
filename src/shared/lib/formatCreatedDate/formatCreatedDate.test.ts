import { formatPostCreatedAt } from '@/shared/lib/formatCreatedDate/formatCreatedDate'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ locale: 'en' }),
}))
describe('formatPostCreatedAt', () => {
  it('should format the creation date correctly', () => {
    const today = new Date()

    today.setMonth(today.getMonth() - 5)

    const formattedDate = formatPostCreatedAt(today.toISOString())

    expect(formattedDate.endsWith('ago')).toBe(true)
    expect(formattedDate).toBe('5 months ago')
  })
})
