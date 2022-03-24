import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { getToken } from '@/utils/auth'
import store from '@/store'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },
  {
    path: '/announcement',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Announcement',
      component: () => import('@/views/announcement/index'),
      meta: { title: '公告', icon: 'el-icon-s-promotion' }
    }]
  },
 
  
 



  // 404 page must be placed at the end !!!
  
]

export const syyRoutes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'announcementrelease',
      name: 'AnnouncementRelease',
      component: () => import('@/views/announcementRelease'),
      meta: { title: '发布公告', icon: 'el-icon-edit-outline' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'announcementmanage',
      name: 'AnnouncementManage',
      component: () => import('@/views/announcementManage/index'),
      meta: { title: '公告管理', icon: 'el-icon-s-management' }
    }]
  },
  {
    path: '/affairmanage',
    component: Layout,
    redirect: '/affairmanage/processed',
    meta: { title: '事务处理', icon: 'el-icon-menu' },
    children: [{
      path: 'processed',
      name: 'Processed',
      component: () => import('@/views/affairManage/processed'),
      meta: { title: '已处理' }
    },
    {
      path: 'unprocessed',
      name: 'Unprocessed',
      component: () => import('@/views/affairManage/unprocessed'),
      meta: { title: '未处理' }
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'membermanage',
      name: 'MemberManage',
      component: () => import('@/views/memberManage/index'),
      meta: { title: '成员管理', icon: 'el-icon-s-custom' }
    }]
  },
];

export const normalRoutes = [
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'problemrelease',
      name: 'ProblemRelease',
      component: () => import('@/views/problemRelease/index'),
      meta: { title: '发布问题', icon: 'el-icon-edit' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'myproblem',
      name: 'MyProblem',
      component: () => import('@/views/myProblem/index'),
      meta: { title: '我的问题', icon: 'el-icon-question' }
    }]
  },
];

export const anyRoutes = [{ path: '*', redirect: '/404', hidden: true }];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})


const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
