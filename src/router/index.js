import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export const routes= [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/login/login') //  直接使用的路由懒加载，防止页面打包后首屏加载慢的问题
  },
  {
    path: '/main', // 项目主体
    name: 'main',
    component: () => import('@/components/layout/layout'), //  直接使用的路由懒加载，防止页面打包后首屏加载慢的问题
    redirect: '/dashboard',
    children: [{
        path: '/dashboard/',
        name: 'dashboard',
        component: () => import('@/components/dashboard/dashboard'),
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          noCache: true,
          affix: true
        }
      },
      {
        path: '/riskDiscern/',
        name: 'riskDiscern',
        component: () => import('@/components/riskDiscern/riskDiscern'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/add_risk/',
        name: 'add_risk',
        component: () => import('@/components/riskDiscern/add_risk'),
        meta: {
          title: '添加风险',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/issueAdmin/',
        name: 'issueAdmin',
        component: () => import('@/components/issueAdmin/issueAdmin'),
        meta: {
          title: '问题管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/add_issue/',
        name: 'addIssue',
        component: () => import('@/components/issueAdmin/add_issue'),
        meta: {
          title: '添加问题',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      }, ,
      {
        path: '/rectificAdmin/',
        name: 'rectificAdmin',
        component: () => import('@/components/rectificAdmin/rectificAdmin'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/add_rectific/',
        name: 'addRectific',
        component: () => import('@/components/rectificAdmin/add_rectific'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/taskAdmin/',
        name: 'taskAdmin',
        component: () => import('@/components/taskAdmin/taskAdmin'),
        meta: {
          title: '任务管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/rectificationContent/',
        name: 'rectificationContent',
        component: () => import('@/components/taskAdmin/rectificationContent'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/policySystemlist/',
        name: 'policySystemlist',
        component: () => import('@/components/policySystem/policySystem'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/unitAdmin/',
        name: 'unitAdmin',
        component: () => import('@/components/unitAdmin/unitAdmin'),
        meta: {
          title: '组织机构管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/authorityAdmin/',
        name: 'authorityAdmin',
        component: () => import('@/components/authorityAdmin/authorityAdmin'),
        meta: {
          title: '权限管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/roleManagement/',
        name: 'roleManagement',
        component: () => import('@/components/roleManagement/roleManagement'),
        meta: {
          title: '角色管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/userGroup/',
        name: 'userGroup',
        component: () => import('@/components/userGroup/userGroup'),
        meta: {
          title: '用户管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
        
      },
      {
        path: '/add_policy/',
        name: 'add_policy',
        component: () => import('@/components/policySystem/add_policy'),
        meta: {
          title: '政策法规制度管理',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/add_regulationType/',
        name: 'add_regulationType',
        component: () => import('@/components/addRegulationType/index'),
        meta: {
          title: '添加法规类型',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
        
      },
      {
        path: '/obj_riskDiscern/',
        name: 'obj_riskDiscern',
        component: () => import('@/components/riskDiscern/objRiskDiscern/index'),
        meta: {
          title: '风险管控对象',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/tar_riskDiscern/',
        name: 'tar_riskDiscern',
        component: () => import('@/components/riskDiscern/tarRiskDiscern/index'),
        meta: {
          title: '风险指标集',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/mon_riskDiscern/',
        name: 'mon_riskDiscern',
        component: () => import('@/components/riskDiscern/monRiskDiscern/index'),
        meta: {
          title: '风险指标监测',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/taradd/',
        name: 'taradd',
        component: () => import('@/components/riskDiscern/tarRiskDiscern/taradd'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
      {
        path: '/objadd/',
        name: 'objadd',
        component: () => import('@/components/riskDiscern/objRiskDiscern/objadd'),
        meta: {
          title: '风险识别',
          icon: 'dashboard',
          noCache: true,
          affix: false
        }
      },
    ]
  }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  routes: routes
})

const router = createRouter()

export default router