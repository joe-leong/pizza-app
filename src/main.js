import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
import axios from 'axios'



import { routes } from './routes';

Vue.use(vueRouter)
axios.defaults.baseURL = 'https://wd5136467665zctkda.wilddogio.com/'



const router = new vueRouter(
  {
    routes,
    mode:"history",
    scrollBehavior(to,from,savedPosition){
      // return{selector:'.btn'}
      if(savedPosition){
        return savedPosition;
      }else{
        return {x:0,y:0}
      }
    }
  
  })

// 全局守卫
// router.beforeEach((to,from,next)=>{
//   // alert("还没有登录，请先登录！");
//   // next()
//   console.log(to);
//   if(to.path == '/login' || to.path == '/register'){
//     next();
//   }else{
//     next('/login');
//   }
// })


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
