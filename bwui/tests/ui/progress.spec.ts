import { test, expect } from '@playwright/test'

test.describe('Progress 组件 UI 测试', () => {
  test('进度条基础样式正确', async ({ page }) => {
    await page.goto('/progress')
    const progress = page.locator('.bw-progress').first()
    await expect(progress).toBeVisible()
  })

  test('不同进度值渲染正确', async ({ page }) => {
    await page.goto('/progress')
    const progresses = page.locator('.bw-progress')
    const count = await progresses.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })
})