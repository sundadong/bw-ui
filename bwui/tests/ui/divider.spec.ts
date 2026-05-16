import { test, expect } from '@playwright/test'

test.describe('Divider 组件 UI 测试', () => {
  test('基础分割线渲染正确', async ({ page }) => {
    await page.goto('/divider')
    const divider = page.locator('.bw-divider').first()
    await expect(divider).toBeVisible()
  })
})
