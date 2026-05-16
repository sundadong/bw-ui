import { test, expect } from '@playwright/test'

test.describe('Article 组件 UI 测试', () => {
  test('基础文章渲染正确', async ({ page }) => {
    await page.goto('/article')
    const article = page.locator('.bw-article').first()
    await expect(article).toBeVisible()
  })
})
