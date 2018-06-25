<template>
	<div>
		<x-header :left-options="{showBack: false}" title="设置"></x-header>
		<group>
			<popup-radio title="选择书库" @on-hide="setbook" :options="book" v-model="bookname">
			</popup-radio>
		</group>
		<br>
		<div class="box">
			<x-button type="default" @click.native="clear">清空学习记录</x-button>
		</div>
		<confirm v-model="show" title="是否删除" @on-confirm="onConfirm">
			<p style="text-align:center;">数据将被清空是否确认?</p>
		</confirm>
		<tab-bar Tab_Selected="5"></tab-bar>
	</div>
</template>

<script>
	import { Confirm, Group, Card, XHeader, PopupRadio, XButton } from 'vux'
	import TabBar from '../components/tab_bar'
	import * as util from "../util/util.js";
	export default {
		components: {
			Confirm,
			XButton,
			PopupRadio,
			Group,
			XHeader,
			Card,
			'tab-bar': TabBar
		},
		data() {
			return {
				bookname: '',
				show: false,
				book: [],
				books: [],
			}
		},
		methods: {
			setbook() {
				util.setBook(this.bookname, this.books)
			},
			clear() {
				this.show = true;
			},
			onConfirm(msg) {				
				localStorage.removeItem('user_setting');
				localStorage.removeItem('user_already');
				localStorage.removeItem('user_study');
				localStorage.removeItem('book_setting');	
				this.bookname = ''
				
			},
		},
		created() {
			var system = require('../../static/book.json')
			for(var i in system) {
				this.book.push({
					"key": system[i].id,
					"value": system[i].name
				})
			}
			this.books = system;
			var book = util.getBook();
			if(book != false) {
				this.bookname = book.id
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		padding: 0 15px;
		text-align: center;
	}
</style>