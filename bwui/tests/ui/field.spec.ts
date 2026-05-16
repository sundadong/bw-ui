import { test, expect } from '@playwright/test'

test.describe('Field 组件 UI 测试', () => {
  test('输入框基础样式正确', async ({ page }) => {
    await page.goto('/field')
    const field = page.locator('.bw-field').first()
    await expect(field).toBeVisible()
  })

  test('输入框 placeholder 显示正确', async ({ page }) => {
    await page.goto('/field')
    const input = page.locator('.bw-field__input').first()
    await expect(input).toBeVisible()
  })
})