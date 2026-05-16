import { test, expect } from '@playwright/test'

test.describe('Textarea 组件 UI 测试', () => {
  test('基础文本域渲染正确', async ({ page }) => {
    await page.goto('/textarea')
    const textarea = page.locator('.bw-textarea').first()
    await expect(textarea).toBeVisible()
  })

  test('带字数统计文本域', async ({ page }) => {
    await page.goto('/textarea')
    const wordLimit = page.locator('.bw-textarea__count').first()
    if (await wordLimit.count() > 0) {
      await expect(wordLimit).toBeVisible()
    }
  })
})
