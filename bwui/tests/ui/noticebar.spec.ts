import { test, expect } from '@playwright/test'

test.describe('NoticeBar 组件 UI 测试', () => {
  test('基础通知栏渲染正确', async ({ page }) => {
    await page.goto('/notice-bar')
    const noticeBar = page.locator('.bw-notice-bar').first()
    await expect(noticeBar).toBeVisible()
  })
})
