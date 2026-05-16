import { test, expect } from '@playwright/test'

test.describe('Grid 组件 UI 测试', () => {
  test('基础宫格渲染正确', async ({ page }) => {
    await page.goto('/grid')
    const grid = page.locator('.bw-grid').first()
    await expect(grid).toBeVisible()
  })

  test('宫格子项渲染正确', async ({ page }) => {
    await page.goto('/grid')
    const gridItem = page.locator('.bw-grid-item').first()
    await expect(gridItem).toBeVisible()
  })
})
