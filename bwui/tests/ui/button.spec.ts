import { test, expect } from '@playwright/test'

test.describe('Button 组件 UI 测试', () => {
  test('基础按钮样式渲染正确', async ({ page }) => {
    await page.goto('/')
    const button = page.locator('.bw-button').first()
    await expect(button).toBeVisible()
    await expect(button).toHaveScreenshot('button-basic.png')
  })

  test('不同类型按钮样式正确', async ({ page }) => {
    await page.goto('/')
    const primaryButton = page.locator('.bw-button--primary').first()
    await expect(primaryButton).toBeVisible()
    await expect(primaryButton).toHaveScreenshot('button-primary.png')

    const successButton = page.locator('.bw-button--success').first()
    await expect(successButton).toBeVisible()
    await expect(successButton).toHaveScreenshot('button-success.png')
  })

  test('不同尺寸按钮样式正确', async ({ page }) => {
    await page.goto('/')
    const smallButton = page.locator('.bw-button--small').first()
    await expect(smallButton).toBeVisible()
    await expect(smallButton).toHaveScreenshot('button-small.png')
  })

  test('朴素按钮样式正确', async ({ page }) => {
    await page.goto('/')
    const plainButton = page.locator('.bw-button--plain').first()
    await expect(plainButton).toBeVisible()
    await expect(plainButton).toHaveScreenshot('button-plain.png')
  })

  test('圆角按钮样式正确', async ({ page }) => {
    await page.goto('/')
    const roundButton = page.locator('.bw-button--round').first()
    await expect(roundButton).toBeVisible()
    await expect(roundButton).toHaveScreenshot('button-round.png')
  })

  test('禁用按钮样式正确', async ({ page }) => {
    await page.goto('/')
    const disabledButton = page.locator('.bw-button--disabled').first()
    await expect(disabledButton).toBeVisible()
    await expect(disabledButton).toHaveScreenshot('button-disabled.png')
  })
})
