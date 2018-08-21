// 当前页面打包入口
/* eslint-disable */
// import Vue from 'vue'
// import '@/pages/page_base'
import page from './page.vue'
window.vm = new Vue({
  template: '',
  render: h => h(page),
  data: {
  }
}).$mount('#app')
