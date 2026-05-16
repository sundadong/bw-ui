import { test, expect } from '@playwright/test'

test.describe('Tag 组件 UI 测试', () => {
  test('标签类型样式正确', async ({ page }) => {
    await page.goto('/tag')
    const tag = page.locator('.bw-tag').first()
    await expect(tag).toBeVisible()
    await expect(tag).toHaveScreenshot('tag-basic.png')
  })

  test('朴素标签样式正确', async ({ page }) => {
    await page.goto('/tag')
    const plainTag = page.locator('.bw-tag--plain').first()
    await expect(plainTag).toBeVisible()
  })

  test('圆角标签样式正确', async ({ page }) => {
    await page.goto('/tag')
    const roundTag = page.locator('.bw-tag--round').first()
    await expect(roundTag).toBeVisible()
  })
})