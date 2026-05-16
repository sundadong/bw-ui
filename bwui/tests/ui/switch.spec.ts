import { test, expect } from '@playwright/test'

test.describe('Switch 组件 UI 测试', () => {
  test('开关基础样式正确', async ({ page }) => {
    await page.goto('/switch')
    const sw = page.locator('.bw-switch').first()
    await expect(sw).toBeVisible()
  })

  test('禁用状态样式正确', async ({ page }) => {
    await page.goto('/switch')
    const disabled = page.locator('.bw-switch--disabled').first()
    await expect(disabled).toBeVisible()
  })
})