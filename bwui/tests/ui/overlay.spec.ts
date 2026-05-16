import { test, expect } from '@playwright/test'

test.describe('Overlay 组件 UI 测试', () => {
  test('遮罩层基础页面样式正确', async ({ page }) => {
    await page.goto('/overlay')
    const btn = page.locator('.bw-button').first()
    await expect(btn).toBeVisible()
  })
})