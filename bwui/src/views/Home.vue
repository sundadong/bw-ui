<template>
  <div class="home-page">
    <header class="home-header">
      <h1 class="title">BWUI</h1>
      <p class="subtitle">基于 Vue3 + uni-app，对齐 Vant4 组件库</p>
    </header>

    <main class="home-main">
      <section
        v-for="(category, index) in categories"
        :key="index"
        class="category-section"
      >
        <h2 class="category-title">{{ category.name }}</h2>
        <div class="component-list">
          <router-link
            v-for="(component, idx) in category.components"
            :key="idx"
            :to="component.path"
            class="component-item"
          >
            <span class="component-name">{{ component.name }}</span>
            <span class="component-arrow">›</span>
          </router-link>
        </div>
      </section>
    </main>

    <footer class="home-footer">
      <p>BWUI v1.0.0</p>
      <p>支持 H5、微信小程序、支付宝小程序</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface ComponentInfo {
  name: string
  path: string
}

interface Category {
  name: string
  components: ComponentInfo[]
}

const categories = reactive<Category[]>([
  {
    name: '基础组件',
    components: [
      { name: 'Button 按钮', path: '/button' },
      { name: 'Cell 单元格', path: '/cell' },
      { name: 'Icon 图标', path: '/icon' },
      { name: 'Tag 标签', path: '/tag' },
      { name: 'Badge 徽标', path: '/badge' },
      { name: 'Empty 空状态', path: '/empty' },
      { name: 'Progress 进度条', path: '/progress' }
    ]
  },
  {
    name: '表单组件',
    components: [
      { name: 'Switch 开关', path: '/switch' },
      { name: 'Checkbox 复选框', path: '/checkbox' },
      { name: 'Radio 单选框', path: '/radio' },
      { name: 'Field 输入框', path: '/field' }
    ]
  },
  {
    name: '反馈组件',
    components: [
      { name: 'Popup 弹出层', path: '/popup' },
      { name: 'Dialog 对话框', path: '/dialog' },
      { name: 'Toast 轻提示', path: '/toast' },
      { name: 'Overlay 遮罩层', path: '/overlay' }
    ]
  },
  {
    name: '导航组件',
    components: [
      { name: 'Tabs 标签页', path: '/tabs' },
      { name: 'Navbar 导航栏', path: '/navbar' }
    ]
  }
])
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.home-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 48px 20px;
  text-align: center;

  .title {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 14px;
    opacity: 0.9;
  }
}

.home-main {
  padding: 16px;
  padding-bottom: 64px;
}

.category-section {
  margin-bottom: 24px;

  .category-title {
    font-size: 14px;
    font-weight: 500;
    color: #969799;
    margin: 0 0 12px 16px;
  }

  .component-list {
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
  }

  .component-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    color: #323233;
    text-decoration: none;
    transition: background-color 0.2s;
    border-bottom: 1px solid #ebedf0;

    &:last-child {
      border-bottom: none;
    }

    &:active {
      background-color: #f7f8fa;
    }

    .component-name {
      font-size: 14px;
    }

    .component-arrow {
      color: #969799;
      font-size: 18px;
      line-height: 1;
    }
  }
}

.home-footer {
  text-align: center;
  padding: 24px 20px;

  p {
    font-size: 12px;
    color: #969799;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
