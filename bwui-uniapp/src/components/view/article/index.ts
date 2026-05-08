import type { App } from 'vue';
import Article from './index.vue';

Article.name = 'BwArticle';

Article.install = (app: App) => {
  app.component(Article.name!, Article);
};

export default Article;
