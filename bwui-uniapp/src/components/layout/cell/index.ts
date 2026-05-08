import type { App } from 'vue';
import Cell from './index.vue';

Cell.name = 'BwCell';

Cell.install = (app: App) => {
  app.component(Cell.name!, Cell);
};

export default Cell;
