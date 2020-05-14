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
			component: () => import('@/components/main/main'),   //  直接使用的路由懒加载，防止页面打包后首屏加载慢的问题
			children : [
				{ path: '/main/', name: 'numView', component: () => import('@/components/numView/numView') },
				{ path: '/riskDiscern/', name: 'riskDiscern', component: () => import('@/components/riskDiscern/riskDiscern') },
				{ path: '/add_risk/', name: 'add_risk', component: () => import('@/components/riskDiscern/add_risk') },
				{ path: '/issueAdmin/', name: 'issueAdmin', component: () => import('@/components/issueAdmin/issueAdmin') },
				{ path: '/add_issue/', name: 'addIssue', component: () => import('@/components/issueAdmin/add_issue') },,
				{ path: '/rectificAdmin/', name: 'rectificAdmin', component: () => import('@/components/rectificAdmin/rectificAdmin') },
				{ path: '/add_rectific/', name: 'addRectific', component: () => import('@/components/rectificAdmin/add_rectific') },
				{ path: '/taskAdmin/', name: 'taskAdmin', component: () => import('@/components/taskAdmin/taskAdmin') },
				{ path: '/policySystemlist/', name: 'policySystemlist', component: () => import('@/components/policySystem/policySystem') },
				{ path: '/unitAdmin/', name: 'unitAdmin', component: () => import('@/components/unitAdmin/unitAdmin') },
				{ path: '/authorityAdmin/', name: 'authorityAdmin', component: () => import('@/components/authorityAdmin/authorityAdmin') },
				{ path: '/add_policy/', name: 'add_policy', component: () => import('@/components/policySystem/add_policy') },
				{ path: '/add_regulationType/', name: 'add_regulationType', component: () => import('@/components/addRegulationType/index') },
			]
		}
	]
})

