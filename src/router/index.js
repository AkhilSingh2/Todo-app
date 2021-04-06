import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import EditTask from '@/components/EditTask'
import AddTask from '@/components/AddTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      props: true
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
      
    }
  ]
})
