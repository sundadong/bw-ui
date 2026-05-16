import { test, expect } from '@playwright/test'

test.describe('Popup 组件 UI 测试', () => {
  test('弹出层基础页面样式正确', async ({ page }) => {
    await page.goto('/popup')
    const btn = page.locator('.bw-button').first()
    await expect(btn).toBeVisible()
  })

  test('弹出层触发按钮存在', async ({ page }) => {
    await page.goto('/popup')
    const buttons = page.locator('.bw-button')
    const count = await buttons.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})