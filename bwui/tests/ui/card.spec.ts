import { test, expect } from '@playwright/test'

test.describe('Card 组件 UI 测试', () => {
  test('基础卡片渲染正确', async ({ page }) => {
    await page.goto('/card')
    const card = page.locator('.bw-card').first()
    await expect(card).toBeVisible()
  })
})
