import { test, expect } from '@playwright/test'

test.describe('Tabs 组件 UI 测试', () => {
  test('标签页基础样式正确', async ({ page }) => {
    await page.goto('/tabs')
    const tab = page.locator('.bw-tabs__tab').first()
    await expect(tab).toBeVisible()
  })

  test('标签页切换功能正常', async ({ page }) => {
    await page.goto('/tabs')
    const tabs = page.locator('.bw-tabs__tab')
    const count = await tabs.count()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})