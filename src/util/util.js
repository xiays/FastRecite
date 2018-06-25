import { router } from '../router'
import axios from 'axios' //引用axios
//获取cookie、
export function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return(arr[2]);
	else
		return null;
}
export function setCookie(name, value, Days) {
	if(Days == null || Days == '') {
		Days = 300;
	}
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + "; path=/;expires=" + exp.toGMTString();
}

//删除cookie
export function delCookie(name) {
	setCookie(name, '', -1);
	return;
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if(cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
//初始化用户
export function initUser() {
	var name = 'user_setting';
	if(localStorage.getItem(name) == null || localStorage.getItem(name) == '') {		
		//var list = require('../../static/data_1.json')
		var userinfo = {
				count: 0,
				study: 0,
				alreday: 0,
				index: 0
			}
			localStorage.setItem(name, JSON.stringify(userinfo))
		return true;
	}
	else
	{
		return false;
	}
}

//获取用户
export function getUser() {
	//判断用户是否初始化
	var name = 'user_setting';	
	//用户信息包括 总行数,学会条数 ,当前索引
	return JSON.parse(localStorage.getItem(name))

};

export function getStudy(index) {
	var list=[];
	var studylist="user_study"
	if (localStorage.getItem(studylist)!=null &&localStorage.getItem(studylist)!='')
		list=JSON.parse(localStorage.getItem(studylist));
	for(var i in list)
	{
		if (list[i]==index)
			return true;
	}
	return false;
}

export function getAlready(index) {
	var list=[];
	var studylist="user_already"
	if (localStorage.getItem(studylist)!=null &&localStorage.getItem(studylist)!='')
		list=JSON.parse(localStorage.getItem(studylist));
	for(var i in list)
	{
		if (list[i]==index)
			return true;
	}
	return false;
}

export function getBook() {
	var name = 'book_setting';	
	if (localStorage.getItem(name)!=null &&localStorage.getItem(name)!='')
		return JSON.parse(localStorage.getItem(name));
	return false;	
}

export function setBook(bookid,books) {
	backupBook();
	var name = 'book_setting';	
	var bookinfo={};	
	for(var i in books)
	{	
		if (bookid==books[i].id)
		{			
			bookinfo=books[i];
			break;
		}
	}
	localStorage.setItem(name, JSON.stringify(bookinfo))
	recoverBook(bookid,bookinfo)
	
	return bookinfo;
};

export function backupBook() {
	var bookinfo=getBook()
	if (bookinfo==false)
		return ;
	var userinfo=getStorage('user_setting');	
	if (userinfo==false)
		return ;
	var name="user_backup"
	var list=[];
	if (localStorage.getItem(name)!=null &&localStorage.getItem(name)!='')
		list=JSON.parse(localStorage.getItem(name));
	var info={
		"bookid":bookinfo.id	
	}
	var study=getStorage('user_study');
	if (study!=false)
	{
		info.study=study;
	}
	else
	{
		info.study=[];
	}
	var already=getStorage('user_already');
	if (already!=false)
	{
		info.already=already;
	}
	else
	{
		info.already=[];
	}
	//var userinfo=getStorage('user_setting');
	if (userinfo!=false)
	{
		info.userinfo=userinfo;
	}
	else
	{
		info.userinfo={};
	}
	
	var found=false;
	for(var i in list)
	{
		if (list[i].bookid==bookinfo.id)
		{
			list[i]=info;
			found=true;
		}
		
	}
	if (!found)
	{
		list.push(info)
	}
	
	localStorage.setItem(name, JSON.stringify(list))
	
	
}

export function recoverBook(bookid,bookinfo) {
	var name="user_backup"
	var list=[];
	if (localStorage.getItem(name)!=null &&localStorage.getItem(name)!='')
		list=JSON.parse(localStorage.getItem(name));
	for	(var i in list)
	{
		if (list[i].bookid==bookid)
		{
			localStorage.setItem('user_setting', JSON.stringify(list[i].userinfo))
			localStorage.setItem('user_already', JSON.stringify(list[i].already))
			localStorage.setItem('user_study', JSON.stringify(list[i].study))
			return;
		}
	}
	var booklist = require('../../static/'+bookinfo.path)	
	var userinfo = {
			count: booklist.length,
			study: 0,
			alreday: 0,
			index: 0
	}
	localStorage.setItem('user_setting', JSON.stringify(userinfo))
	localStorage.setItem('user_already', JSON.stringify([]))
	localStorage.setItem('user_study', JSON.stringify([]))		
}

export function getStorage(name) {
	if (localStorage.getItem(name)!=null &&localStorage.getItem(name)!='')
	{
		var list=JSON.parse(localStorage.getItem(name));
		return list;
	}
	return false;
}

//学习
export function setStudy(index) {
	var name = 'user_setting';
	var userinfo=getUser();
	if (setStudyList(userinfo.index))
		userinfo.study+=1
	if (userinfo.index<userinfo.count-1)
	{
		userinfo.index=userinfo.index+1;
	}
	
	localStorage.setItem(name, JSON.stringify(userinfo))
	return userinfo;
};




export function setAlready(index) {
	var name = 'user_setting';
	var userinfo=getUser();
	if (setAlreadyList(userinfo.index))
		userinfo.alreday+=1
	if (userinfo.index<userinfo.count-1)
	{
		userinfo.index=userinfo.index+1;
	}
	
	localStorage.setItem(name, JSON.stringify(userinfo))
	return userinfo;
};
export function Finish(index,id) {
	var name = 'user_setting';
	var userinfo=getUser();	
	DelStudyList(index)		
	setAlreadyList(id)
};

export function setAlreadyList(index) {	
	var list=[];
	var studylist="user_already"
	if (localStorage.getItem(studylist)!=null&&localStorage.getItem(studylist)!='')
		list=JSON.parse(localStorage.getItem(studylist));
	for(var i in list)
	{
		if (list[i]==index)
			return false;
	}
	list.push(index);
	localStorage.setItem(studylist, JSON.stringify(list))		
	return true;
};

export function DelStudyList(index) {
	var list=[];
	var studylist="user_study"
	if (localStorage.getItem(studylist)!=null&&localStorage.getItem(studylist)!='')
		list=JSON.parse(localStorage.getItem(studylist));
	list.splice(index,1)
	localStorage.setItem(studylist, JSON.stringify(list))
	return true;	
}

export function setStudyList(index) {
	var list=[];
	var studylist="user_study"
	if (localStorage.getItem(studylist)!=null&&localStorage.getItem(studylist)!='')
		list=JSON.parse(localStorage.getItem(studylist));
	for(var i in list)
	{
		if (list[i]==index)
			return false;
	}
	list.push(index);
	localStorage.setItem(studylist, JSON.stringify(list))		
	return true;
}
//翻页
export function setPage(type) {
	
	var name = 'user_setting';
	var userinfo=getUser();
	if (type==1) 
	{
		//向后
		if (userinfo.index<userinfo.count-1)
		{
			userinfo.index=userinfo.index+1;
		}
	}
	else
	{
		//向前
		if (userinfo.index>0)
		{
			userinfo.index=userinfo.index-1;
		}
	}
	localStorage.setItem(name, JSON.stringify(userinfo))
	return userinfo;
};

export function getStudyPage() {
	var name = 'user_study_page';
	var page=0
	if (localStorage.getItem(name)!=null &&localStorage.getItem(name)!='')
	{
		page= parseInt(localStorage.getItem(name));		
	}	
	return page;
}

export function getStudyInfo(id,list) {
	return list[id];	
}

export function setStudyPage(type,pagecount) {
	var name = 'user_study_page';
	var page=getStudyPage()	
	if (type>0)
	{
		if (page<pagecount-1)
		{
				page++;
		}
	}	
	else
	{
		if (page>0)
		{
			page--;
		}
			
	}		
	localStorage.setItem(name, page)	
	return page;
}