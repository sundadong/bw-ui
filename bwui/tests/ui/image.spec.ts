import { test, expect } from '@playwright/test'

test.describe('Image 组件 UI 测试', () => {
  test('基础图片组件渲染正确', async ({ page }) => {
    await page.goto('/image')
    const image = page.locator('.bw-image').first()
    await expect(image).toBeVisible()
  })
})
