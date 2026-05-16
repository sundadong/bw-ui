import { test, expect } from '@playwright/test'

test.describe('Circle 组件 UI 测试', () => {
  test('基础环形进度渲染正确', async ({ page }) => {
    await page.goto('/circle')
    const circle = page.locator('.bw-circle').first()
    await expect(circle).toBeVisible()
  })
})
