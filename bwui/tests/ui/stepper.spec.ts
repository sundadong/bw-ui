import { test, expect } from '@playwright/test'

test.describe('Stepper 组件 UI 测试', () => {
  test('基础步进器渲染正确', async ({ page }) => {
    await page.goto('/stepper')
    const stepper = page.locator('.bw-stepper').first()
    await expect(stepper).toBeVisible()
  })

  test('加减按钮渲染正确', async ({ page }) => {
    await page.goto('/stepper')
    const minusBtn = page.locator('.bw-stepper__minus').first()
    const plusBtn = page.locator('.bw-stepper__plus').first()
    await expect(minusBtn).toBeVisible()
    await expect(plusBtn).toBeVisible()
  })
})
