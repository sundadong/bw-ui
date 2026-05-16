import { test, expect } from '@playwright/test'

test.describe('Avatar 组件 UI 测试', () => {
  test('基础头像渲染正确', async ({ page }) => {
    await page.goto('/avatar')
    const avatar = page.locator('.bw-avatar').first()
    await expect(avatar).toBeVisible()
  })
})
