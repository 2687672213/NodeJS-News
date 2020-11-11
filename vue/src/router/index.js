import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/main.vue';
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "about" */ '../components/login.vue')
  },
  {
    path: '/onceNew/:id',
    name: 'noceNew',
    component: () => import( /* webpackChunkName: "about" */ '../components/onceNew.vue')
  },
  {
    path: '/myInfo',
    name: 'Info',
    component: () => import( /* webpackChunkName: "about" */ '../views/myinfo.vue'),
    children: [{
        path: '/myInfo/addNews',
        name: 'addNews',
        component: () => import( /* webpackChunkName: "about" */ '../components/addNews.vue'),
        alias: 'Info'
      },
      {
        path: '/myInfo/newsUp',
        name: 'newsUp',
        component: () => import( /* webpackChunkName: "about" */ '../components/newsUp.vue')
      },
      {
        path: '/myInfo/myReply',
        name: 'myReply',
        component: () => import( /* webpackChunkName: "about" */ '../components/myReply.vue')
      },
      {
        path: '/myInfo/about',
        name: 'about',
        component: () => import( /* webpackChunkName: "about" */ '../components/aboutMy.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router