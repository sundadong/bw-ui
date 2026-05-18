import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function convertFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8')
    let modified = false

    // 1. 将 lang="scss" 改为 lang="less"
    if (content.includes('lang="scss"')) {
      content = content.replace(/lang="scss"/g, 'lang="less"')
      modified = true
    }

    // 2. 将 @import 路径中的 .scss 改为 .less
    content = content.replace(/@import\s+['"](.+)\.scss['"]/g, (match, p1) => {
      modified = true
      return `@import '${p1}.less'`
    })

    // 3. 将 SCSS 变量 $variable 改为 @variable (在样式上下文中)
    // 需要小心处理，避免影响 JavaScript 代码
    // 匹配在样式定义中的变量使用
    content = content.replace(/(\{|\s|:|\(|,)\s*\$([a-zA-Z][a-zA-Z0-9_-]*)/g, '$1 @$2')
    if (content.includes('@$')) modified = true

    // 4. 将 @include mixin() 改为 .mixin()
    content = content.replace(/@include\s+([a-zA-Z][a-zA-Z0-9_-]*)\s*\(/g, '.$1(')
    if (content.includes('.text-ellipsis') || content.includes('.clearfix') || 
        content.includes('.flex-center')) modified = true

    if (modified) {
      await fs.writeFile(filePath, content, 'utf-8')
      console.log(`✓ Converted: ${filePath}`)
      return true
    } else {
      console.log(`○ Skipped (no changes): ${filePath}`)
      return false
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message)
    return false
  }
}

async function findAndConvertFiles(dir, pattern) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const results = []

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      const subResults = await findAndConvertFiles(fullPath, pattern)
      results.push(...subResults)
    } else if (file.name.endsWith('.vue')) {
      results.push(await convertFile(fullPath))
    }
  }

  return results
}

async function main() {
  console.log('Starting SCSS to LESS conversion...\n')
  
  const srcDir = path.resolve(__dirname, '..', 'src')
  const results = await findAndConvertFiles(srcDir, '*.vue')
  
  const total = results.length
  const converted = results.filter(r => r).length
  
  console.log(`\nConversion complete!`)
  console.log(`Total files processed: ${total}`)
  console.log(`Files modified: ${converted}`)
}

main().catch(console.error)
