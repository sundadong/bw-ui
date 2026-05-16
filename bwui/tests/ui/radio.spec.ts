import { test, expect } from '@playwright/test'

test.describe('Radio 组件 UI 测试', () => {
  test('单选框基础样式正确', async ({ page }) => {
    await page.goto('/radio')
    const radio = page.locator('.bw-radio').first()
    await expect(radio).toBeVisible()
  })

  test('禁用状态样式正确', async ({ page }) => {
    await page.goto('/radio')
    const disabled = page.locator('.bw-radio--disabled').first()
    await expect(disabled).toBeVisible()
  })
})