import { test, expect } from '@playwright/test'

test.describe('Notify 组件 UI 测试', () => {
  test('基础通知栏渲染正确', async ({ page }) => {
    await page.goto('/notify')
    const notify = page.locator('.bw-notify').first()
    await expect(notify).toBeVisible()
  })
})
