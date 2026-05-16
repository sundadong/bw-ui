import { test, expect } from '@playwright/test'

test.describe('Space 组件 UI 测试', () => {
  test('基础间距组件渲染正确', async ({ page }) => {
    await page.goto('/space')
    const space = page.locator('.bw-space').first()
    await expect(space).toBeVisible()
  })
})
