import { test, expect } from '@playwright/test'

test.describe('Swipe 组件 UI 测试', () => {
  test('基础轮播渲染正确', async ({ page }) => {
    await page.goto('/swipe')
    const swipe = page.locator('.bw-swipe').first()
    await expect(swipe).toBeVisible()
  })

  test('轮播项渲染正确', async ({ page }) => {
    await page.goto('/swipe')
    const swipeItem = page.locator('.bw-swipe-item').first()
    await expect(swipeItem).toBeVisible()
  })
})
