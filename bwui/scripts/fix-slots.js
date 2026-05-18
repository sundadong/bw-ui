import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function fixSlots(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8')
    
    // 将 @slots 改回 $slots
    content = content.replace(/@slots/g, '$slots')
    
    await fs.writeFile(filePath, content, 'utf-8')
    console.log(`✓ Fixed slots in: ${filePath}`)
    return true
  } catch (error) {
    console.error(`✗ Error fixing ${filePath}:`, error.message)
    return false
  }
}

async function findAndFixFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const results = []

  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    
    if (file.isDirectory()) {
      const subResults = await findAndFixFiles(fullPath)
      results.push(...subResults)
    } else if (file.name.endsWith('.vue') || file.name.endsWith('.ts')) {
      try {
        const content = await fs.readFile(fullPath, 'utf-8')
        if (content.includes('@slots')) {
          results.push(await fixSlots(fullPath))
        }
      } catch (error) {
        // 忽略错误
      }
    }
  }

  return results
}

async function main() {
  console.log('Fixing @slots to $slots...\n')
  
  const srcDir = path.resolve(__dirname, '..', 'src')
  const results = await findAndFixFiles(srcDir)
  
  console.log(`\nFixed ${results.filter(r => r).length} files`)
}

main().catch(console.error)
