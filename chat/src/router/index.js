import Vue from 'vue';
import VueRouter from 'vue-router';
import LogIn from '../views/LogIn.vue';
import Chat from '../views/Chat.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogIn,
    meta: {
      title: 'Login to chat',
    },
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
    meta: {
      title: 'Chat',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
