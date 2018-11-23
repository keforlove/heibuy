import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* 导入element-ui框架 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/* 导入iview框架 */
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);


import './assets/site/css/style.css'

Vue.config.productionTip = false

/* 导入axios */
import axios from 'axios';
/* 挂载到Vue原型上 */
Vue.prototype.$axios = axios;

/* 导入单文件组件 */
import index from './components/index.vue';
import detail from './components/detail.vue'

let routes = [
  {path: '/', redirect:'/index'},
  {path: '/index',component:index},
  {path: '/detail/:id',component:detail}
]

/* 实例化router */
let router = new VueRouter({
  routes
})
/* 引入moment */
import moment from 'moment';
Vue.filter('shorttime',  (value) => {
  return moment(value).format("YYYY-MM-DD");
})
Vue.filter('shorttimePlus',  (value) => {
  return moment(value).format("YYYY-MM-DD HH:mm:ss");
})


/* 实例化vue */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
