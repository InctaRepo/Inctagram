import { test } from '@playwright/test'

// test('signIn', async ({ page }) => {
//   await page.goto('http://localhost:3000')
//   await page.getByRole('button', { name: 'Sign In' }).click()
//   await page.locator('input[name="email"]').click()
//   await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
//   await page.locator('input[name="password"]').click()
//   await page.locator('input[name="password"]').fill('1qaz@WSX')
//   await page.locator('form').getByRole('button', { name: 'Sign In' }).click()
//   await page.getByRole('link', { name: 'My Profile' }).click()
// })
//
// test('test', async ({ page }) => {
//   await page.goto('http://localhost:3000')
//   await page.getByRole('button', { name: 'Sign In' }).click()
//   await page.locator('input[name="email"]').click()
//   await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
//   await page.locator('input[name="password"]').click()
//   await page.locator('input[name="password"]').fill('1qaz@WSX')
//   await page.locator('form').getByRole('button', { name: 'Sign In' }).click()
//   await page.getByRole('link', { name: 'My Profile' }).click()
//   await page.locator('.showPostModal_postImage__cJ5FK > img').first().click()
//   await page.locator('.editModal_IconButton__r0PgZ > svg').click()
//   await page.getByRole('button', { name: 'Log Out' }).click()
//   await page.getByRole('button', { name: 'Yes' }).click()
// })
//
// test('disc', async ({ page }) => {
//   await page.goto('http://localhost:3000')
//   await page.getByRole('button', { name: 'Sign In' }).click()
//   await page.locator('input[name="email"]').click()
//   await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
//   await page.locator('input[name="password"]').click()
//   await page.locator('input[name="password"]').fill('1qaz@WSX')
//   await page.locator('form').getByRole('button', { name: 'Sign In' }).click()
//   await page.getByRole('link', { name: 'My Profile' }).click()
//   await page.locator('.showPostModal_postImage__cJ5FK > img').first().click()
//   await page.locator('.postMenu_blue__nnUAa').click()
//   await page.getByText('Edit Post').click()
//   await page.getByRole('textbox').click()
//   await page.getByRole('textbox').fill('eeeee', { timeout: 500 })
//   await page.getByRole('button', { name: 'Save changes' }).click({ timeout: 1000 })
// })
test('testLogin', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/sign-in')
  // await page.getByRole('button', { name: 'Log in' }).click()
  // await page.locator('input[name="email"]').click()
  // await page.locator('input[name="email"]').fill('chernik5059585@gmail.com')
  // await page.locator('input[name="password"]').click()
  // await page.locator('input[name="password"]').fill('1qaz@WSX')
  // await page.locator('form').getByRole('button', { name: 'Sign In' }).click()
  // await page.locator('div:nth-child(2) > .showPostModal_postImage__cJ5FK > img').click()
  // await page.locator('.editModal_IconButton__r0PgZ > svg > path').click()
  // await page.locator('.showPostModal_postImage__cJ5FK > img').first().click()
  // await page.locator('.postMenu_blue__nnUAa').click()
  // await page.locator('.editModal_IconButton__r0PgZ > svg > path').click()
  // await page.getByRole('button', { name: 'Profile settings' }).click()
  // await page.goto('http://localhost:3000/profile/settings')
  // await page.getByRole('tab', { name: 'Account management' }).dblclick()
  // await page.getByRole('button', { name: 'Open Modal Success' }).click()
  // await page.getByRole('button', { name: 'OK' }).click()
  // await page.getByRole('button', { name: 'Open Modal Error' }).click()
})
