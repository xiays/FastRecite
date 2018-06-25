<template>
	<div>		
<x-header :left-options="{showBack: false}" :title="pageindex+1+'/'+pagecount"></x-header>
		<card class="card" @click.native="showclick">
			<div slot="content" class="card-padding">
				<flexbox>					
						<x-icon @click.native="previous();showclick()" type="ios-arrow-back" ></x-icon>
						<x-icon class="green" type="ios-information" v-if="studyed"></x-icon>
						<x-icon class="green" type="ios-checkmark"  v-if="isalread"></x-icon>
			
					</flexbox-item>
					<flexbox-item style="text-align: right;">
						<x-button mini >{{showtext}}</x-button>
					</flexbox-item>

				</flexbox>

				</grid>

				<div class="title">{{info.word}}

				</div>
				<div>{{info.phonetic}}</div>
				<div v-if="show">{{info.Interpretation}}</div>
				<div class="card-content" v-if="show">拆法:{{info.split}}
				</div>
				<div class="card-content" v-if="show">综合法:{{info.Synthesis}}
				</div>
				<div class="card-content" v-if="show">联想法:{{info.associative}}
				</div>
				<div class="card-content" v-if="show">例句:{{info.example}}
				</div>
				<div class="card-content" v-if="show">翻译:{{info.translate}}
				</div>

			</div>
		</card>
		<div class="box">
			<x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="alread">学会了</x-button>
			<flexbox>				
				<flexbox-item>					
					<x-button :gradients="['#666666', '#CCCCCC']" @click.native="next">跳过</x-button>
				</flexbox-item>
			</flexbox>
			
			<br>
			<span></span>
			<br>
			<br>
		</div>

		<tab-bar Tab_Selected="3"></tab-bar>
	</div>
</template>

<script>
	import {XHeader, Scroller, Flexbox, FlexboxItem, Grid, GridItem, Group, Card, Checker, CheckerItem, XButton, Icon } from 'vux'
	import axios from 'axios'
	import TabBar from '../components/tab_bar'
	import * as util from "../util/util.js";
	export default {
		components: {
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
				pageindex:0,
				readid:0,
				pagecount:0,
				studyed: false,
				isalread: false,
				showtext: '隐藏',
				list: [],
				studylist: [],
				info: {},
				userinfo: {},
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
				this.userinfo = util.getUser()
				
				var studylist=util.getStorage('user_study')				
				if (studylist==false)
					this.studylist=[];
				else
					this.studylist=studylist;
				this.pageindex=util.getStudyPage();
				this.pagecount=this.studylist.length;
				var id=this.studylist[this.pageindex]
				this.readid=id;
				if (id==undefined)
				{
					this.info={}
				}
				else
				{
					this.info = util.getStudyInfo(id,this.list);	
				}
				
			},
			showclick() {
				if(this.show)
					this.showtext = '显示'
				else
					this.showtext = '隐藏'
				this.show = !this.show;
			},
			previous() {
				if (this.studylist.length==0)
					return;
				this.pageindex = util.setStudyPage(-1,this.pagecount)				
				this.readid=this.studylist[this.pageindex];				
				this.ref()
			},
			next() {
				if (this.studylist.length==0)
					return;
				this.pageindex = util.setStudyPage(1,this.pagecount)
				this.readid=this.studylist[this.pageindex];
				this.ref()
			},					
			alread() {		
				if (this.studylist.length==0)
					return;				
				util.Finish(this.pageindex,this.readid)
				this.studylist=util.getStorage('user_study')	
				this.pagecount=this.studylist.length;
				if (this.pageindex>this.pagecount-1)
				{
					this.pageindex--;
				}
				this.ref()
			},
			ref() {
				this.readid=this.studylist[this.pageindex];			
				this.info = util.getStudyInfo(this.readid,this.list);
				
			}
		},
		created() {
			this.getData();

		}

	}
</script>

<style scoped lang="less">
	.box {
		padding: 0 15px;
		text-align: center;
	}
	
	.weui-panel__hd {
		font-size: 24px;
	}
	
	.demo1-item {
		border: 1px solid #ececec;
		padding: 5px 15px;
	}
	
	.demo1-item-selected {
		border: 1px solid green;
	}
	
	.card {
		margin: 15px 15px;
		min-height: 350px;
	}
	
	.card-padding {
		padding: 15px;
		text-align: center;
	}
	
	.title {
		font-size: 24px;
		font-weight: 800;
	}
	
	.contenttop {
		//text-align: right;
	}
	
	.card-content {
		width: 90%;
		text-align: left;
	}
	
	.grid-center {
		display: block;
		text-align: center;
		color: #666;
	}
	
	.weui-grid {
		padding: 5px;
	}
	.vux-flexbox 
	{
		padding: 12px 0;
	}
</style>