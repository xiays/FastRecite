<template>
	<div>		
<x-header :left-options="{showBack: false}" :title="'全部:'+list.length"></x-header>
		<flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/3" v-for="(item,index) in list"><div class="flex-demo">{{item.code}}:{{item.word}}</div></flexbox-item>
        </flexbox>
       
			<x-button :gradients="['#FF5E3A', '#FF9500']" @click.native="test" v-if='false'>验证</x-button>
		<div v-html='validtext'></div>
        
        
        <br><br><br><br><br><br>
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
				list: [],
				validtext:'',				
			}
		},
		methods: {
			test()
			{				
				if (this.validtext=='')
				{					
					for(var i in this.list)
					{
						
						if (!this.list[i].hasOwnProperty('translate'))
						{							
							this.validtext=this.validtext+"行:"+i+' ,"translate":"'+this.list[i].phonetic+"\"<br>";
						}
					}	
				}
				else
				{
					this.validtext=''
				}
				
			},
			getData() {
				var book = util.getBook();
				if(book == false) {
					this.$router.push({
							path: "/setting"
						});
					return;
				}
				this.list = require('../../static/' + book.path)	
				
			},
			
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