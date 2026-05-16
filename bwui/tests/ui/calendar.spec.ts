import { test, expect } from '@playwright/test'

test.describe('Calendar 组件 UI 测试', () => {
  test('基础日历渲染正确', async ({ page }) => {
    await page.goto('/calendar')
    const calendar = page.locator('.bw-calendar').first()
    await expect(calendar).toBeVisible()
  })
})
