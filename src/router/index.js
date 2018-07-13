import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Login from '../components/login.vue'
import User from '../components/user.vue'
import Topic from '../components/topic.vue'
import Add from '../components/add.vue'
/*import Info from '../components/info.vue'*/
import Message from '../components/message.vue'
import Collection from '../components/collection.vue'
import { getLocal } from '../util/index'
import store from '../store/index'

Vue.use(Router);

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/topic/:id',
      name: 'topic',
      component: Topic
    },{
      path: '/user/:loginname',
      name: 'user',
      component: User
    },{
      path: '/add',
      name: 'add',
      component: Add
    },{
      path: '/collection',
      name: 'collection',
      component: Collection
    },{
      path: '/message',
      name: 'message',
      component: Message
    }
  ]
});



//判断是否需要登录
router.beforeEach((to,from,next)=>{
  if(to.matched.some(res => res.meta.requireAuth)){  //判断是否有meta标签（登录）,如果有则需要跳转到登录，否则直接跳转
    if(store.state.userInfo){  //判断用户信息是否存在，如果有则需要跳转到登录，否则直接跳转
      next();
    }else{
      next({
        path: '/login'
      })
    }
  }else{
    next();
  }
});

export default router
