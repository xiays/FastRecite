<template>
	<div>
		<x-header :left-options="{showBack: false}" :title="'我的测试'"></x-header>
		<card class="card" @click.native="showclick">
			<div slot="content" class="card-padding">
				<div class="title">{{info.word}}
				</div>
				<div>{{info.phonetic}}</div>
				<div class="divpage">
					{{pageindex+1}}/{{pagecount}}
				</div>
			</div>

		</card>
		<flexbox orient="vertical">
			<flexbox-item v-for="(item,index) in answer">
				<div class="flex-demo" @click="answerclick(item.code)">{{index+1}}.{{item.Interpretation}}</div>
			</flexbox-item>
		</flexbox>
		<alert v-model="showover" title="恭喜您"> {{'答对了:' +count }}</alert>
		<toast v-model="right" position="bottom" :time="1000">答对了</toast>
		<toast v-model="wrong" position="bottom" type="text" :time="1000">答错了</toast>
		<tab-bar Tab_Selected="4"></tab-bar>
	</div>
</template>

<script>
	import { Alert, Toast, XHeader, Scroller, Flexbox, FlexboxItem, Grid, GridItem, Group, Card, Checker, CheckerItem, XButton, Icon } from 'vux'
	import axios from 'axios'
	import TabBar from '../components/tab_bar'
	import * as util from "../util/util.js";
	export default {
		components: {
			Alert,
			Toast,
			XHeader,
			Scroller,
			Flexbox,
			FlexboxItem,
			Grid,
			GridItem,
			Icon,
			Checker,
			CheckerItem,
			Card,
			XButton,
			'tab-bar': TabBar
		},
		data() {
			return {
				selected: '',
				show: true,
				pageindex: 0,
				readid: 0,
				pagecount: 0,
				list: [],
				studylist: [],
				alreadylist: [],
				testlist: [],
				info: {},
				answer: [],
				userinfo: {},
				right: false,
				wrong: false,
				showover: false,
				count: 0,
				state: true,
			}
		},
		methods: {
			getData() {
				var book = util.getBook();
				if(book == false) {
					this.$router.push({
						path: "/setting"
					});
					return;
				}
				this.list = require('../../static/' + book.path)
				var studylist = util.getStorage('user_already')
				if(studylist == false)
					this.studylist = [];
				else {
					this.studylist = studylist;
				}
				if(this.studylist.length == 0)
					return;

				for(var i in this.studylist) {
					var info = this.list[this.studylist[i]];
					if(info != undefined)
						this.alreadylist.push(this.list[this.studylist[i]])
				}
				var arr = this.alreadylist;
				var result = [];
				var ranNum = 10;

				if(ranNum > this.alreadylist.length) {
					ranNum = this.alreadylist.length;
				}
				for(var i = 0; i < ranNum; i++) {
					var ran = Math.floor(Math.random() * (arr.length - i));
					result.push(arr[ran]);
					arr[ran] = arr[arr.length - i - 1];
				};
				this.testlist = result;
				this.pagecount = this.testlist.length
				this.ref()
			},
			answerclick(code) {
				if(code == this.info.code) {					
					if(this.state) {
						this.count++;
					}					
					this.state = true;
					if(this.pageindex >= this.pagecount - 1) {
						this.showover = true;
						return;
					}
					this.right = true;
					this.pageindex++;
					this.ref()
				} else {
					this.state = false;
					this.wrong = true;
				}

			},
			ref() {
				this.info = this.testlist[this.pageindex]
				var ranNum1 = 4;
				var result1 = [];
				this.answer = []
				for(var i = 0; i < ranNum1; i++) {
					var ran = Math.floor(Math.random() * (this.list.length - i));
					this.answer.push(this.list[ran]);
				};
				ran = Math.floor(Math.random() * 3);
				this.answer[ran] = this.info;

			}
		},
		created() {
			this.getData();

		}

	}
</script>

<style scoped lang="less">
	.box {
		padding: 20px 15px;
		text-align: center;
	}
	
	.card {
		margin: 15px 15px;
		min-height: 150px;
	}
	
	.card-padding {
		padding: 15px;
		text-align: center;
	}
	
	.title {
		font-size: 32px;
		font-weight: 800;
	}
	
	.divpage {
		width: 100%;
		text-align: right;
		font-size: 24px;
		color: #FF6600;
		font-weight: 800;
	}
	
	.flex-demo {
		padding: 8px 15px;
		margin: 0px 15px;
		text-align: left;
		color: #555;
		background-color: #CCCCCC;
		border-radius: 4px;
		background-clip: padding-box;
	}
</style>