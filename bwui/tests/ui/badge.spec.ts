import { test, expect } from '@playwright/test'

test.describe('Badge 组件 UI 测试', () => {
  test('基础徽标样式正确', async ({ page }) => {
    await page.goto('/badge')
    const badge = page.locator('.bw-badge').first()
    await expect(badge).toBeVisible()
  })

  test('徽标内容显示正确', async ({ page }) => {
    await page.goto('/badge')
    const content = page.locator('.bw-badge__content').first()
    await expect(content).toBeVisible()
  })

  test('小红点样式正确', async ({ page }) => {
    await page.goto('/badge')
    const dot = page.locator('.bw-badge__content--dot').first()
    await expect(dot).toBeVisible()
  })
})