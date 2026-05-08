import type { App } from 'vue';
import Row from './index.vue';
import Col from './col.vue';

Row.name = 'BwRow';
Col.name = 'BwCol';

Row.install = (app: App) => {
  app.component(Row.name!, Row);
};

Col.install = (app: App) => {
  app.component(Col.name!, Col);
};

export { Row, Col };
export default Row;
