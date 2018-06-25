import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import Study from '@/views/study'
import Test from '@/views/test'
import Setting from '@/views/setting'
import Review from '@/views/review'
import Alreday from '@/views/alreday'
import List from '@/views/list'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: '首页',
			component: Home
		},
		{
			path: '/study',
			name: '学习',
			component: Study
		},
		{
			path: '/test',
			name: '测试 ',
			component: Test
		},
		{
			path: '/setting',
			name: '设置',
			component: Setting
		},
		{
			path: '/review',
			name: '复习',
			component: Review
		},
		{
			path: '/alreday',
			name: '学过',
			component: Alreday
		},
		{
			path: '/list',
			name: '学过',
			component: List
		}
	]
})