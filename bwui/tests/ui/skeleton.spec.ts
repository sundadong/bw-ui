import { test, expect } from '@playwright/test'

test.describe('Skeleton 组件 UI 测试', () => {
  test('基础骨架屏渲染正确', async ({ page }) => {
    await page.goto('/skeleton')
    const skeleton = page.locator('.bw-skeleton').first()
    await expect(skeleton).toBeVisible()
  })
})
