import { test, expect } from '@playwright/test'

test.describe('AreaPicker 组件 UI 测试', () => {
  test('基础区域选择器渲染正确', async ({ page }) => {
    await page.goto('/area-picker')
    const areaPicker = page.locator('.bw-area-picker').first()
    await expect(areaPicker).toBeVisible()
  })
})
