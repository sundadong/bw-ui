import { test, expect } from '@playwright/test'

test.describe('Sidebar 组件 UI 测试', () => {
  test('基础侧边栏渲染正确', async ({ page }) => {
    await page.goto('/sidebar')
    const sidebar = page.locator('.bw-sidebar').first()
    await expect(sidebar).toBeVisible()
  })

  test('侧边栏项渲染正确', async ({ page }) => {
    await page.goto('/sidebar')
    const sidebarItem = page.locator('.bw-sidebar-item').first()
    await expect(sidebarItem).toBeVisible()
  })
})
