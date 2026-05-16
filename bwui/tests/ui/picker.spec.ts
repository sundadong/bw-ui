import { test, expect } from '@playwright/test'

test.describe('Picker 组件 UI 测试', () => {
  test('基础选择器渲染正确', async ({ page }) => {
    await page.goto('/picker')
    const picker = page.locator('.bw-picker').first()
    await expect(picker).toBeVisible()
  })
})
