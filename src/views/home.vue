<template>
	<div>
		<div class="top">
			<img src="../assets/timg.jpg">
		</div>
		<card>
			<div slot="content" class="card-demo-flex card-demo-content01">
				<div class="vux-1px-r" @click='golist'>
					<i class="icon iconfont icon-zonghe"></i>
					<br/>
					<span>{{userinfo.count}}</span>
					<br/> 默认词
				</div>
				<div class="vux-1px-r">
					<i class="icon iconfont icon-qinzi"></i>
					<br/>

					<span>{{study}}</span>
					<br/> 记忆中
				</div>
				<div class="vux-1px-r" @click='goalready'>
					<i class="icon iconfont icon-jinnang"></i>
					<br/>
					<span>{{alreday}}</span>
					<br/> 已掌握
				</div>
			</div>
		</card>
		<box gap="10px 10px">
			<x-button :gradients="['#FF5E3A', '#FF9500']" link="/study">开始学习</x-button>
		</box>
		<tab-bar Tab_Selected="1"></tab-bar>

	</div>
</template>

<script>
	import { Group, Card, XButton, Box } from 'vux'
	import TabBar from '../components/tab_bar'
	import * as util from "../util/util.js";
	export default {
		components: {
			Box,
			XButton,
			Card,
			'tab-bar': TabBar
		},
		data() {
			return {
				msg: 'Hello World!',
				userinfo: {},
				study:0,
				alreday:0
			}
		},
		methods: {
			goalready() {
				this.$router.push({
					path: "/alreday"
				});

			},
			golist() {
				this.$router.push({
					path: "/list"
				});

			}
		},
		created() {
			util.initUser()
			this.userinfo = util.getUser()
			var studylist=util.getStorage('user_already')	
			this.alreday=studylist.length;
			var study=util.getStorage('user_study')
			this.study=study.length
		}
	}
</script>

<style scoped lang="less">
	@import '~vux/src/styles/1px.less';
	.top {
		height: 300px;
		width: 100%;
		text-align: center;
	}
	
	.top img {
		height: 100%;
		width: 100%;
	}
	
	.card-demo-flex {
		display: flex;
	}
	
	.card-demo-content01 {
		padding: 10px 0;
	}
	
	.card-padding {
		padding: 15px;
	}
	
	.card-demo-flex>div {
		flex: 1;
		text-align: center;
		font-size: 12px;
	}
	
	.card-demo-flex span {
		color: #f74c31;
	}
	
	.icon {
		color: #f74c31;
		font-size: 32px;
	}
</style>