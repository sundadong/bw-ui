import { test, expect } from '@playwright/test'

test.describe('Pagination 组件 UI 测试', () => {
  test('基础分页渲染正确', async ({ page }) => {
    await page.goto('/pagination')
    const pagination = page.locator('.bw-pagination').first()
    await expect(pagination).toBeVisible()
  })
})
