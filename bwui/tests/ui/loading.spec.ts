import { test, expect } from '@playwright/test'

test.describe('Loading 组件 UI 测试', () => {
  test('基础加载组件渲染正确', async ({ page }) => {
    await page.goto('/loading')
    const loading = page.locator('.bw-loading').first()
    await expect(loading).toBeVisible()
  })

  test('不同类型加载组件渲染正确', async ({ page }) => {
    await page.goto('/loading')
    const circular = page.locator('.bw-loading--circular').first()
    const spinner = page.locator('.bw-loading--spinner').first()
    await expect(circular).toBeVisible()
    await expect(spinner).toBeVisible()
  })
})
