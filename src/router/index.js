//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
Vue.use(VueRouter);
//重写push和replace函数
//第一个参数，告诉原来的push方法往哪里跳，第二个参数，成功的回调，第三个参数，失败的回调
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function(localtion,resolve,rejest)
{
    if(resolve&&rejest)
    {
        originPush.call(this,localtion,resolve,rejest);
    }
    else
        originPush.call(this,localtion,()=>{},()=>{});
}

VueRouter.prototype.replace = function(localtion,resolve,rejest)
{
    if(resolve&&rejest)
    {
        originReplace.call(this,localtion,resolve,rejest);
    }
    else
        originReplace.call(this,localtion,()=>{},()=>{});
}
let router =  new VueRouter({
    routes,
    scrollBehavior(to,from,savedPosition){
        //return的是滚动条的位置
        return {x:0,y:0}
    }
})
//全局守卫：前置守卫
router.beforeEach(async (to,from,next)=>{
    //to：可以获取到你要跳转到哪个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next：放行函数
    //用户登录了才会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        //登陆了去不了登录页面
        if(to.path=='/login'){
            next('/home')
        }else{
            if(name){
                next()
            }else{
                try {
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    //token失效了获取不到用户信息，需要重新登陆
                    //清除token
                    await store.dispatch('userLogout');
                    next('/login ')
                }
            }
        }
    } else {
        //未登录 不能去交易相关、支付相关、订单相关
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //把未登录的时候想去而未去成的信息，存储与地址栏中
            next('/login?redirect='+toPath)
        }
        next()
    }
})
export default router;