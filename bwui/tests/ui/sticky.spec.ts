import { test, expect } from '@playwright/test'

test.describe('Sticky 组件 UI 测试', () => {
  test('基础粘性布局渲染正确', async ({ page }) => {
    await page.goto('/sticky')
    const sticky = page.locator('.bw-sticky').first()
    await expect(sticky).toBeVisible()
  })
})
