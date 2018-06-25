<template>
	<div>		
<x-header :left-options="{showBack: false}" :title="'掌握:'+alreadylist.length"></x-header>
		<flexbox :gutter="0" wrap="wrap" class="box" >
      <flexbox-item :span="1/3" v-for="(item,index) in alreadylist"><div class="flex-demo">{{item.word}}</div></flexbox-item>
        </flexbox>
		<tab-bar Tab_Selected="1"></tab-bar>
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
				alreadylist: [],
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
				var studylist=util.getStorage('user_already')				
				if (studylist==false)
					this.studylist=[];
				else
				{
					this.studylist=studylist;	
				}
				for(var i in this.studylist)
				{
					var info=this.list[this.studylist[i]];
					if (info!=undefined)
						this.alreadylist.push(this.list[this.studylist[i]])
				}				
				
			},
			showclick() {
				if(this.show)
					this.showtext = '显示'
				else
					this.showtext = '隐藏'
				this.show = !this.show;
			},			
			ref() {
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
		padding: 20px 15px;
		//text-align: center;
	}
	
	
</style>