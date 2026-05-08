import type { App } from 'vue';
import Loadmore from './index.vue';

Loadmore.name = 'BwLoadmore';

Loadmore.install = (app: App) => {
  app.component(Loadmore.name!, Loadmore);
};

export default Loadmore;
