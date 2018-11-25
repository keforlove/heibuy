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
/* 绑定基地址 */
axios.defaults.baseURL = 'http://111.230.232.110:8899/';

/* 导入放大镜 */
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

/* 导入单文件组件 */
import index from './components/index.vue';
import detail from './components/detail.vue';
import shopCart from './components/shopCart.vue'

let routes = [
  {path: '/', redirect:'/index'},
  {path: '/index',component:index},
  {path: '/detail/:id',component:detail},
  {path: '/shopCart',component:shopCart}
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


/* 导入Vuex */
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartData: JSON.parse(window.localStorage.getItem('hm24')) || {90:5,91:6} 
  },
  mutations: {
    add2Cart (state,obj) {
      //console.log("点击了")
      //state.count += 4
      //console.log(state);
      //console.log(obj);
      /* 有数据 */
      if(state.cartData[obj.goodId] != undefined){
        state.cartData[obj.goodId] += obj.goodNum;
      }else{
        /* 没有数据 */
        Vue.set(state.cartData,obj.goodId,obj.goodNum)
      }
      //console.log(state);
    }
  },
  getters: {
    totalCount(state){
      let num = 0;
      for(let key in state.cartData) {
        num += state.cartData[key]
      } 
      return num;
    }
  },
  
})
 /* 关闭浏览器 */
 window.onbeforeunload = function(){
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
 }

/* 实例化vue */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
