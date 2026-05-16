import { test, expect } from '@playwright/test'

test.describe('Rate 组件 UI 测试', () => {
  test('基础评分渲染正确', async ({ page }) => {
    await page.goto('/rate')
    const rate = page.locator('.bw-rate').first()
    await expect(rate).toBeVisible()
  })

  test('星星图标渲染正确', async ({ page }) => {
    await page.goto('/rate')
    const star = page.locator('.bw-rate__item').first()
    await expect(star).toBeVisible()
  })
})
