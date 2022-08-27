import Vue from 'vue'
import App from './App.vue'
//注册全局组件(三级联动组件)
import TypeNav from '@/components/TypeNav'
//注册全局轮播图
import Carousel from '@/components/Carousel'
//注册全局分页器
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.component(Button.name,Button)
import router from '@/router'
// import {reqCategoryList} from '@/api'
import store from '@/store';
// reqCategoryList();
import '@/mock/mockServe';
//引入swiper样式
import "swiper/css/swiper.css";
import {reqGetSearchInfo} from '@/api'
console.log(reqGetSearchInfo({}))
Vue.config.productionTip = false
//统一引入
import * as API from '@/api'
import VueLazyload from 'vue-lazyload';
import load from '@/assets/00.jpg'
Vue.use(VueLazyload,{
  loading:load
})
//引入校验插件
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount('#app')
