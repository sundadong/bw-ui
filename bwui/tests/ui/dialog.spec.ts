import { test, expect } from '@playwright/test'

test.describe('Dialog 组件 UI 测试', () => {
  test('对话框基础页面样式正确', async ({ page }) => {
    await page.goto('/dialog')
    const btn = page.locator('.bw-button').first()
    await expect(btn).toBeVisible()
  })
})