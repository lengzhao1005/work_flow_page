<template>
	<div id="app">
		<h2 class="project-title">
			<img class="icon" src="../assets/img/project-form-icon.png" />
			{{project.name}} · {{taskForm.name}}
		</h2>
		<el-container>
			<el-main>
				<el-form :model="taskForm" :rules="taskRule" ref="taskForm" class="project-form">
					<el-form-item prop="name">
						<el-checkbox v-if="taskForm.mine" v-model="taskForm.completed" class="big" size="medium" prop="name">
							<el-input placeholder="任务标题" v-model="taskForm.name" auto-complete="off" type="text"></el-input>
						</el-checkbox>
						<el-checkbox v-if="!taskForm.mine" disabled="disabled" v-model="taskForm.completed" class="big" size="medium" prop="name">
							<el-input placeholder="任务标题" v-model="taskForm.name" auto-complete="off" type="text"></el-input>
						</el-checkbox>
					</el-form-item>
					<el-form-item class="fake-label" prop="content">
						<el-input placeholder="任务内容" v-model="taskForm.content" auto-complete="off" type="text"></el-input>
					</el-form-item>
					<el-form-item class="fake-label" prop="members_task">
						<img class="icon" src="../assets/img/users-icon.png" style="height: 24px; top: 8px;" />
						<el-select v-model=taskForm.members_task multiple class="project-users" placeholder="请选择项目成员">
							<el-option
								v-for="item in members_project"
								:key="item.id_user"
								:label="item.nickname"
								:value="item.id_user">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="fake-label" prop="expireat">
						<img class="icon" src="../assets/img/expireat-icon.png" style="width: 22px; left: 2px;" />
						<el-date-picker prefix-icon="no-icon" v-model="taskForm.expire_time" type="date" placeholder="截止时间"></el-date-picker>
					</el-form-item>
					<el-form-item class="fake-label" prop="priority">
						<img class="icon" src="../assets/img/priority-icon.png" />
						<div style="padding-left: 40px;">
							<el-radio v-model="taskForm.priority" label="low" border size="mini">普通</el-radio>
							<el-radio v-model="taskForm.priority" label="middle" border size="mini">紧急</el-radio>
							<el-radio v-model="taskForm.priority" label="high" border size="mini">非常紧急</el-radio>
						</div>
					</el-form-item>
					
					<el-form-item style="margin-top: 50px;">
						<el-button class="btn-block" type="primary" @click="submitForm('taskForm')">保存修改</el-button>
					</el-form-item>
					
				</el-form>
			</el-main>
		</el-container>
	</div>
	
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'
import AppSocket from '@/appsocket.js'

function GetQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";  
    if (r != null)  
         context = r[2];  
    reg = null;  
    r = null;  
    return context == null || context == "" || context == "undefined" ? "" : context;  
}

export default {
	data() {		
		var thisObj = this;
		var id_task = GetQueryString('id_task');
		
		return {
			webSocket: AppSocket.create({
				url: settings.api_socket_base_url,
				sendMsgsOnInit: [
					{
					    action: 'task_init',
					    content: {
					    	id_task: id_task
					    }
					}
				],
				msgProcessors: {
					task_init: function(ret){
						if(ret.code != '100'){
							thisObj.$message(ret.message);
							return false;
						}else{
							var members_task = [];
							$.each(ret.data.task.members_task, function(k, v){
								members_task.push(v.id_user);
							});
							
							thisObj.taskForm = {
								id_project: ret.data.task.id_project, 
								id_task: ret.data.task.id_task, 
								mine: ret.data.task.mine, 
								completed: ret.data.task.completed, 
								name: ret.data.task.name, 
								content: ret.data.task.content, 
								members_task: members_task, 
								expire_time: ret.data.task.expire_time, 
								priority: ret.data.task.priority.type
							};
							
							thisObj.webSocket.send({
							    action: 'member_project_fetchall',
							    content: {
							    	id_project: ret.data.task.id_project
							    }
							});
							
							thisObj.webSocket.send({
							    action: 'project_init',
							    content: {
							    	id_project: ret.data.task.id_project
							    }
							});
						}
					}, 
					member_project_fetchall: function(ret){
						if(ret.code != '100'){
							thisObj.$message(ret.message);
							return false;
						}else{
							thisObj.members_project = ret.data.members_project;
						}
					}, 
					task_save: function(ret){
						if(ret.code != '100'){
							thisObj.$message(ret.message);
							return false;
						}else{
							thisObj.taskForm.id_project = ret.data.task.id_project;
							thisObj.taskForm.id_task = ret.data.task.id_task;
							thisObj.$message({
								message: '任务编辑成功！',
								type: 'success', 
								onClose: function(){
									//location.assign('/customer/home.html')
								}
							});
						}
					}, 
					project_init: function(ret){
						thisObj.project = ret.data.project;
					}
				}
			}), 
			project: {
				id_project: '', 
				name: ''
			}, 
			taskForm: {
				id_project: '', 
				id_task: '', 
				mine: false, 
				completed: false, 
				name: '', 
				content: '', 
				members_task: [], 
				expire_time: '', 
				priority: '1'
			}, 
			members_project: [], 
			taskRule: {
				name: [
					{ required: true, message: '请输入项目名称', trigger: 'blur' },
					{ min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }, 
				], 
				description: [
					{ max: 1000, message: '长度 1000 个字符以内', trigger: 'blur' }, 
				], 
				members_task: [
					{ required: true, message: '至少选择一个项目成员', trigger: 'change' },
				]
			}
		}
	},
	
	methods: {
		submitForm(taskForm) {
			var thisObj = this;
			this.$refs[taskForm].validate(function(valid){
				if (valid) {
					thisObj.webSocket.send({
					    action: 'task_save',
					    content: {
					    	task: thisObj.taskForm
					    }
					});
				}
			});
		}
	}
}
</script>

<style>
	body {
		background-color: #fff;
		padding: 0;
		margin: 0;
	}
	.project-title {
		display: block;
		border-bottom: solid 1px #cfcfcf;
		position: relative;		
		font-size: 17px;
		font-weight: normal;
		height: 40px;
		line-height: 40px;	
		padding-left: 60px;
		margin-bottom: 0;
	}
	.project-title .icon {
		position: absolute;
		top: 7px;
		left: 20px;
		width: 26px;
		height: 26px;
		z-index: 99;
	}
	.project-users {
		width: 100%;
		padding-left: 30px;	
		box-sizing: border-box;
	}
	.project-users .el-input__inner{	
		padding-right: 0;		
	}	
	.el-form-item .el-input .el-input__inner {
		padding-left: 5px;
	}		
	.el-form-item.fake-label {
		position: relative;
	}
	.el-form-item.fake-label .el-input .el-input__inner {
		padding-left: 40px;
	}	
	.el-form-item.fake-label .el-tag--info {
		background-color: #909399;
	}
	.el-form-item.fake-label .icon {
		position: absolute;
		top: 7px;
		left: 0;
		width: 26px;
		height: 26px;
		z-index: 99;
	}	
	
	.btn-block {
		width: 100%;
	}
	a {
		text-decoration: none;
		color: #66f;
	}
	.project-form .el-input input {
		border-radius: 0;
		border-width: 0;
	}
</style>
