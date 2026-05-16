import { test, expect } from '@playwright/test'

test.describe('BackTop 组件 UI 测试', () => {
  test('基础回到顶部渲染正确', async ({ page }) => {
    await page.goto('/back-top')
    const backTop = page.locator('.bw-back-top').first()
    await expect(backTop).toBeVisible()
  })
})
