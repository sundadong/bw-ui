import type { App } from 'vue';
import Loading from './index.vue';

Loading.name = 'BwLoading';

Loading.install = (app: App) => {
  app.component(Loading.name!, Loading);
};

export default Loading;
