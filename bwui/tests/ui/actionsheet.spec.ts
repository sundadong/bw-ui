import { test, expect } from '@playwright/test'

test.describe('ActionSheet 组件 UI 测试', () => {
  test('基础动作面板渲染正确', async ({ page }) => {
    await page.goto('/action-sheet')
    const actionSheet = page.locator('.bw-action-sheet').first()
    await expect(actionSheet).toBeVisible()
  })
})
