import { test, expect } from '@playwright/test'

test.describe('Timeline 组件 UI 测试', () => {
  test('基础时间轴渲染正确', async ({ page }) => {
    await page.goto('/timeline')
    const timeline = page.locator('.bw-timeline').first()
    await expect(timeline).toBeVisible()
  })

  test('时间轴项渲染正确', async ({ page }) => {
    await page.goto('/timeline')
    const timelineItem = page.locator('.bw-timeline-item').first()
    await expect(timelineItem).toBeVisible()
  })
})
