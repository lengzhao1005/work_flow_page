var jquery = require('jquery')
var $ = require('jquery')
var AppUser = require('@/appuser.js')

function AppSocket(options)
{
	/*
	client主动询问的消息: 
		send_verify_code: 发送验证码
		user_register: 用户注册
		user_login: 用户登陆
		
		member_project_fetchall: 获取所有项目成员
		member_project_join: 项目成员添加
		
		project_init: 项目详细信息(包括邀请码、邀请链接)
		project_save: 项目保存
		projectlist_init: 推送全量项目列表
		task_init: 任务详细信息
		task_save: 任务保存
		tasklist_init: 推送全量任务列表
		tasklist_project_init: 推送项目下全量任务列表
	
	server主动推送的消息:
		auth_fail: 登陆超时
		project_new: 新增项目
		project_update: 项目修改
		project_delete: 项目删除
		task_new: 新增任务
		task_update: 任务修改
		task_delete: 任务删除
	*/

	var opts = $.extend({},
		{
			url: '',
			sendMsgsOnInit: [],
			msgProcessors: {
				// type1: function(event_data){}, 
				// type2: function(event_data){}, 
			}, 
			authfailProcessor: function(event_data){
				AppUser.logout();
				location.assign('/user/login.html');
			}
		},
		options
	);
	
	var _self = this;
	
	this.webSocket = new WebSocket(opts.url);
	this.webSocket.onopen = function(event){
		console.log('onopen');
		console.log(event);

		$.each(opts.sendMsgsOnInit, function(k, sendMsg){
			_self.send(sendMsg);
		});
	}
	this.webSocket.onmessage = function(event){
		console.log('onmessage');
		console.log(event);
		var event_data = JSON.parse(event.data);
		
		if(event_data.type == 'auth_fail'){
			opts.authfailProcessor(event_data);
		}else{
			processor = opts.msgProcessors[event_data.type];
			if(typeof(processor) == 'function'){
				processor(event_data);
			}
		}
	}
	this.webSocket.onerror = function(event){
		console.log('onerror');
		console.log(event);
		
	}
	this.webSocket.onclose = function(event){
		console.log('onclose');
		console.log(event);
	}
	
	this.send = function(sendMsg){
		if(AppUser.isLogin()){
			sendMsg.auth_token = AppUser.getData().userInfo.auth_token;
		}
		_self.webSocket.send(JSON.stringify(sendMsg));
	}
}


module.exports = {
	create: function(options){
		return new AppSocket(options);
	}
}