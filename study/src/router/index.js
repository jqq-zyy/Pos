import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/pages/pos'
import Store from '@/components/pages/storeMan'
import Member from '@/components/pages/member'
import Statistics from '@/components/pages/statistics'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: '收银系统',
			component: Pos
		},
		{
			path: '/store',
			name: '店铺管理',
			component: Store
		},
		{
			path: '/member',
			name: '会员管理',
			component: Member
		},
		{
			path: '/statistics',
			name: '统计',
			component: Statistics
		}
	]
})
