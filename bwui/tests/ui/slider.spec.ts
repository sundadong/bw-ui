import { test, expect } from '@playwright/test'

test.describe('Slider 组件 UI 测试', () => {
  test('基础滑块渲染正确', async ({ page }) => {
    await page.goto('/slider')
    const slider = page.locator('.bw-slider').first()
    await expect(slider).toBeVisible()
  })

  test('滑块轨道和按钮渲染正确', async ({ page }) => {
    await page.goto('/slider')
    const track = page.locator('.bw-slider__track').first()
    const button = page.locator('.bw-slider__button').first()
    await expect(track).toBeVisible()
    await expect(button).toBeVisible()
  })
})
