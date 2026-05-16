import { test, expect } from '@playwright/test'

test.describe('SafeArea 组件 UI 测试', () => {
  test('基础安全区渲染正确', async ({ page }) => {
    await page.goto('/safe-area')
    const safeArea = page.locator('.bw-safe-area').first()
    await expect(safeArea).toBeVisible()
  })
})
