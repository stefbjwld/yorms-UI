import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: () => import('@/components/login/login')   //  直接使用的路由懒加载，防止页面打包后首屏加载慢的问题
		},
		{
			path: '/main',	// 项目主体
			name: 'main',
			component: () => import('@/components/layout/layout'),   //  直接使用的路由懒加载，防止页面打包后首屏加载慢的问题
			children : [
				{ path: '/main/dashboard/', name: 'dashboard', component: () => import('@/components/dashboard/dashboard') },
				{ path: '/riskDiscern/', name: 'riskDiscern', component: () => import('@/components/riskDiscern/riskDiscern') },
				{ path: '/add_risk/', name: 'add_risk', component: () => import('@/components/riskDiscern/add_risk') },
				{ path: '/issueAdmin/', name: 'issueAdmin', component: () => import('@/components/issueAdmin/issueAdmin') },
				{ path: '/add_issue/', name: 'addIssue', component: () => import('@/components/issueAdmin/add_issue') },,
				{ path: '/rectificAdmin/', name: 'rectificAdmin', component: () => import('@/components/rectificAdmin/rectificAdmin') },
				{ path: '/add_rectific/', name: 'addRectific', component: () => import('@/components/rectificAdmin/add_rectific') },
				{ path: '/taskAdmin/', name: 'taskAdmin', component: () => import('@/components/taskAdmin/taskAdmin') },
				{ path: '/rectificationContent/', name: 'rectificationContent', component: () => import('@/components/taskAdmin/rectificationContent') },
				{ path: '/policySystemlist/', name: 'policySystemlist', component: () => import('@/components/policySystem/policySystem') },
				{ path: '/unitAdmin/', name: 'unitAdmin', component: () => import('@/components/unitAdmin/unitAdmin') },
				{ path: '/authorityAdmin/', name: 'authorityAdmin', component: () => import('@/components/authorityAdmin/authorityAdmin') },
				{ path: '/roleManagement/', name: 'roleManagement', component: () => import('@/components/roleManagement/roleManagement') },
				{ path: '/userGroup/', name: 'userGroup', component: () => import('@/components/userGroup/userGroup') },
				{ path: '/add_policy/', name: 'add_policy', component: () => import('@/components/policySystem/add_policy') },
				{ path: '/add_regulationType/', name: 'add_regulationType', component: () => import('@/components/addRegulationType/index') },
				{ path: '/obj_riskDiscern/', name: 'obj_riskDiscern', component: () => import('@/components/riskDiscern/objRiskDiscern/index') },
				{ path: '/tar_riskDiscern/', name: 'tar_riskDiscern', component: () => import('@/components/riskDiscern/tarRiskDiscern/index') },
				{ path: '/mon_riskDiscern/', name: 'mon_riskDiscern', component: () => import('@/components/riskDiscern/monRiskDiscern/index') },
				{ path: '/taradd/', name: 'taradd', component: () => import('@/components/riskDiscern/tarRiskDiscern/taradd') },
				{ path: '/objadd/', name: 'objadd', component: () => import('@/components/riskDiscern/objRiskDiscern/objadd') },
			]
		}
	]
})

