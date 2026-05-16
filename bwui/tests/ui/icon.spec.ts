import { test, expect } from '@playwright/test'

test.describe('Icon 组件 UI 测试', () => {
  test('基础图标样式正确', async ({ page }) => {
    await page.goto('/icon')
    const icon = page.locator('.bw-icon').first()
    await expect(icon).toBeVisible()
    await expect(icon).toHaveScreenshot('icon-basic.png')
  })

  test('全部图标渲染正确', async ({ page }) => {
    await page.goto('/icon')
    const icons = page.locator('.bw-icon')
    const count = await icons.count()
    expect(count).toBeGreaterThanOrEqual(5)
  })
})