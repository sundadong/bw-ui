import { test, expect } from '@playwright/test'

test.describe('DatePicker 组件 UI 测试', () => {
  test('基础日期选择器渲染正确', async ({ page }) => {
    await page.goto('/date-picker')
    const datePicker = page.locator('.bw-date-picker').first()
    await expect(datePicker).toBeVisible()
  })
})
