import { test, expect } from '@playwright/test'

test.describe('Cell 组件 UI 测试', () => {
  test('单元格基础样式正确', async ({ page }) => {
    await page.goto('/cell')
    const cell = page.locator('.bw-cell').first()
    await expect(cell).toBeVisible()
  })

  test('单元格标题显示正确', async ({ page }) => {
    await page.goto('/cell')
    const title = page.locator('.bw-cell__title-text').first()
    await expect(title).toBeVisible()
  })
})