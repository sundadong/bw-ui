import { test, expect } from '@playwright/test'

test.describe('Toast 组件 UI 测试', () => {
  test('轻提示基础页面样式正确', async ({ page }) => {
    await page.goto('/toast')
    const btn = page.locator('.bw-button').first()
    await expect(btn).toBeVisible()
  })
})