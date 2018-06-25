<template>
	<tabbar  style="position:fixed">
		<tabbar-item link="/" :selected="Tab_Selected==1">
			<i class="icon iconfont icon-shouye" slot="icon"></i>
			<span slot="label">首页</span>
		</tabbar-item>
		<tabbar-item link="/study" :selected="Tab_Selected==2">
			<i class="icon iconfont icon-dianping" slot="icon"></i>
			<span slot="label">学习</span>
		</tabbar-item>
		<tabbar-item link="/review" :selected="Tab_Selected==3">
			<i class="icon iconfont icon-fuzhi" slot="icon"></i>
			<span slot="label">复习</span>
		</tabbar-item>
		<tabbar-item link="/test" :selected="Tab_Selected==4">
			<i class="icon iconfont icon-quguo" slot="icon"></i>
			<span slot="label">测试</span>
		</tabbar-item>
		<tabbar-item link="/setting" :selected="Tab_Selected==5">
			<i class="icon iconfont icon-shezhi" slot="icon"></i>

			<span slot="label">设置</span>
		</tabbar-item>
	</tabbar>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vux'

	export default {
		components: {
			Tabbar,
			TabbarItem
		},
		props: {
			Tab_Selected: {
				type: String,
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style  scoped lang="less">
	.icon {
		font-size: 27px;
		padding: -10px;	
	}	
</style>