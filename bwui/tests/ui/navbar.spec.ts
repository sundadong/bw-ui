import { test, expect } from '@playwright/test'

test.describe('Navbar 组件 UI 测试', () => {
  test('导航栏基础样式正确', async ({ page }) => {
    await page.goto('/navbar')
    const navbar = page.locator('.bw-navbar').first()
    await expect(navbar).toBeVisible()
  })

  test('导航栏标题显示正确', async ({ page }) => {
    await page.goto('/navbar')
    const title = page.locator('.bw-navbar__title').first()
    await expect(title).toBeVisible()
  })
})