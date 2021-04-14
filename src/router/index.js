import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import EditTask from '@/components/EditTask'
import AddTask from '@/components/AddTask'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import Admin from '@/components/Admin'

Vue.use(Router);

   const routes = [
    {
      path: '/main-app',
      name: 'main-app',
      component: main,
      props: true,
      meta: {requiresAuth: true},
    },
    {
      path: '/edit',
      name: 'EditTask',
      component: EditTask,
      props: true
    },
    {
      path: '/add',
      name: 'AddTask',
      component: AddTask,
      props: true
      
    },
    {
      path: '/register',
      name: 'register',
      component: Signup,
      meta: { guest: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
          requiresAuth: true,
          is_admin : true
      }
  },

  ];

const router = new Router({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('jwt') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let user = JSON.parse(localStorage.getItem('user'))
          if(to.matched.some(record => record.meta.is_admin)) {
              if(user.is_admin == 1){
                  next()
              }
              else{
                  next({ name: 'main-app'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('jwt') == null){
          next()
      }
      else{
          next({ name: 'main-app'})
      }
  }else {
      next()
  }
})

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isLoggedIn) {
//       next()
//       return
//     }
//     next('/login')
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters.isAuthenticated) {
//       next("/main-app");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });

export default router;
