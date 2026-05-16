import { test, expect } from '@playwright/test'

test.describe('Empty 组件 UI 测试', () => {
  test('空状态默认样式正确', async ({ page }) => {
    await page.goto('/empty')
    const empty = page.locator('.bw-empty').first()
    await expect(empty).toBeVisible()
  })

  test('空状态描述文本正确', async ({ page }) => {
    await page.goto('/empty')
    const desc = page.locator('.bw-empty__description').first()
    await expect(desc).toBeVisible()
  })
})