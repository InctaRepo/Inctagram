import { errors, test } from '@playwright/test'
// test.describe.configure({ retries: 1, timeout: 40_000 })
// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/')
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/)
// })
//
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/')
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click()
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible()
// })

test('signIn', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/en')
    await page.goto('http://localhost:3000/home')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.locator('input[name="email"]').click()
    await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
    await page.locator('input[name="password"]').click()
    await page.locator('input[name="password"]').fill('1qaz@WSX')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.getByRole('link', { name: 'My Profile' }).click()
    await page.waitForTimeout(5000)
  } catch (error) {
    if (error instanceof errors.TimeoutError) console.log('Timeout!')
  }
})

test('test', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/en')
    await page.goto('http://localhost:3000/home')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.locator('input[name="email"]').click()
    await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
    await page.locator('input[name="password"]').click()
    await page.locator('input[name="password"]').fill('1qaz@WSX')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.getByRole('link', { name: 'My Profile' }).click()
    await page.locator('.showPostModal_postImage__cJ5FK > img').first().click()
    await page.locator('.editModal_IconButton__r0PgZ > svg').click()
    await page.getByRole('button', { name: 'Log Out' }).click()
    await page.getByRole('button', { name: 'Yes' }).click()
    await page.waitForTimeout(5000)
  } catch (error) {
    if (error instanceof errors.TimeoutError) console.log('Timeout!')
  }
})

test('disc', async ({ page }) => {
  try {
    await page.goto('http://localhost:3000/en')
    await page.goto('http://localhost:3000/home')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.locator('input[name="email"]').click()
    await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
    await page.locator('input[name="password"]').click()
    await page.locator('input[name="password"]').fill('1qaz@WSX')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.getByRole('link', { name: 'My Profile' }).click()
    await page.locator('.showPostModal_postImage__cJ5FK > img').first().click()
    await page.locator('.postMenu_blue__nnUAa').click()
    await page.getByText('Edit Post').click()
    await page.getByRole('textbox').click()
    await page.waitForTimeout(5000)
    await page.getByRole('textbox').fill('eeeee')
    await page.getByRole('button', { name: 'Save changes' }).click()
    await page.waitForTimeout(500)
    await page.locator('.postMenu_blue__nnUAa').click()
    await page.waitForTimeout(500)
    await page.getByText('Edit Post').click()
    await page.getByLabel('Edit Post').getByText('eeeee').click()
    await page.getByLabel('Edit Post').getByText('eeeee').fill('')
    await page.getByRole('button', { name: 'Save changes' }).click()
    await page.locator('.editModal_IconButton__r0PgZ > svg').click()
    await page.locator('div:nth-child(2) > .showPostModal_postImage__cJ5FK > img').click()
    await page.waitForTimeout(5000)
  } catch (error) {
    if (error instanceof errors.TimeoutError) console.log('Timeout!')
  }
})
