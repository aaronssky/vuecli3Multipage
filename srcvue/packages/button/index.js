/* eslint-disable */
import component from './src/main';

component.install = function (Vue) {
  Vue.component(component.name, component);
};

export default component;