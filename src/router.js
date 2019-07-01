import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Perjalanan from './views/Perjalanan.vue';
import Pesan from './views/Pesan.vue';
import Seat from './views/Seat.vue';
import Login from './views/Login.vue';
import VueSession from 'vue-session';
import Register from './views/Register.vue';
import Pesanan from './views/Pesanan.vue';

Vue.use(VueSession)

Vue.use(Router)

// export default new Router({
  const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        access_token: true
      },
    },
    {
      path: '/perjalanan',
      name: 'perjalanan',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
      component: Perjalanan,
      props: true,
      meta:{
        access_token: true
      },
    },
    {
      path: '/pesan/:id',
      name: 'pesan',
      component: Pesan,
      props: true,
      meta:{
        access_token: true
      },
    },
    {
      path: '/seat/:id',
      name: 'seat',
      component: Seat,
      props: true,
      meta:{
        access_token: true
      },
    },
    {
      path: '/pesanan',
      name: 'pesanan',
      component: Pesanan,
      props: true,
      meta:{
        access_token: true
      }
    },
  ],
})
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record =>  record.meta.access_token)){
    if (sessionStorage.getItem('access_token') === null) {
      next('/login');
    }else{
    next()
    }
  }else{
    next()
  }
});

export default router;
// })
