import { test, expect } from '@playwright/test'

test.describe('Checkbox 组件 UI 测试', () => {
  test('复选框基础样式正确', async ({ page }) => {
    await page.goto('/checkbox')
    const cb = page.locator('.bw-checkbox').first()
    await expect(cb).toBeVisible()
  })

  test('禁用状态样式正确', async ({ page }) => {
    await page.goto('/checkbox')
    const disabled = page.locator('.bw-checkbox--disabled').first()
    await expect(disabled).toBeVisible()
  })
})