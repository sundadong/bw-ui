import { test, expect } from '@playwright/test'

test.describe('Collapse 组件 UI 测试', () => {
  test('基础折叠面板渲染正确', async ({ page }) => {
    await page.goto('/collapse')
    const collapse = page.locator('.bw-collapse').first()
    await expect(collapse).toBeVisible()
  })

  test('折叠面板项渲染正确', async ({ page }) => {
    await page.goto('/collapse')
    const collapseItem = page.locator('.bw-collapse-item').first()
    await expect(collapseItem).toBeVisible()
  })
})
