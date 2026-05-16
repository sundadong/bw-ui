import { test, expect } from '@playwright/test'

test.describe('Search 组件 UI 测试', () => {
  test('基础搜索栏渲染正确', async ({ page }) => {
    await page.goto('/search')
    const search = page.locator('.bw-search').first()
    await expect(search).toBeVisible()
  })

  test('搜索图标渲染正确', async ({ page }) => {
    await page.goto('/search')
    const icon = page.locator('.bw-search__icon').first()
    await expect(icon).toBeVisible()
  })
})
