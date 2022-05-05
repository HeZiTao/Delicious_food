import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

//导入flexible.js设置rem的基准值
import 'lib-flexible/flexible'

import {
  Tabbar,
  TabbarItem,
  Icon,
  Search,
  Toast,
  NavBar,
  Tab,
  Tabs,
  Swipe,
  SwipeItem,
  Lazyload,
  Image as VanImage,
  PullRefresh,
  Button,
  Loading,
  Sidebar,
  SidebarItem,
  Empty,
  Popup,
  Sticky,
  Form,
  Field,
  Dialog,
  SwipeCell
} from 'vant';



//注册注册
Vue
  .use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Search)
  .use(Toast)
  .use(NavBar)
  .use(Tab)
  .use(Tabs)
  .use(Swipe)
  .use(SwipeItem)
  .use(VanImage)
  .use(Lazyload, {
    lazyComponent: true,
  })
  .use(PullRefresh)
  .use(Button)
  .use(Loading)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Empty)
  .use(Popup)
  .use(Sticky)
  .use(Form)
  .use(Field)
  .use(Dialog)
  .use(SwipeCell)

axios.defaults.baseURL = 'https://apis.netstart.cn/douguo/';

axios.interceptors.request.use(config => {
  //启动加载提示
  // Toast.loading({
  //   message: '加载中...',
  //   //禁止穿透点击
  //   forbidClick: true,
  //   loadingType: 'spinner',
  //   //不会自动关闭提示
  //   duration: 0
  // })

  return config;
}, err => {
  
  //关闭加载提示
  // Toast.clear();
  return Promise.reject(err);
})

axios.interceptors.response.use(res => {
  // Toast.clear();
  return res;
}, err => {
  

  //关闭加载提示
  // Toast.clear();
  return Project.reject(err);
})

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
