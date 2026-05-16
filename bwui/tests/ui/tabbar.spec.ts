import { test, expect } from '@playwright/test'

test.describe('Tabbar 组件 UI 测试', () => {
  test('基础标签栏渲染正确', async ({ page }) => {
    await page.goto('/tabbar')
    const tabbar = page.locator('.bw-tabbar').first()
    await expect(tabbar).toBeVisible()
  })

  test('标签栏项渲染正确', async ({ page }) => {
    await page.goto('/tabbar')
    const tabbarItem = page.locator('.bw-tabbar-item').first()
    await expect(tabbarItem).toBeVisible()
  })
})
