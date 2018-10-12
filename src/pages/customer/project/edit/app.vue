<template>
	<el-container id="app">
		<el-main>
			<!-- <el-form-item prop="partners_selected">
				<el-select v-model=project.partners_selected multiple class="project-users" placeholder="请选择项目成员">
					<el-option
						v-for="item in project.partners"
						:key="item.id_user"
						:label="item.nickname"
						:value="item.id_user">
					</el-option>
				</el-select>
			</el-form-item> -->
			<el-form :model="project" :rules="registerRule" ref="project" class="project-form">
				<el-form-item class="fake-label" prop="name">
					<img class="icon" src="../assets/img/project-form-icon.png" style="height: 26px;" />
					<el-input placeholder="输入项目名称" v-model="project.name" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item class="fake-label" prop="description">
					<img class="icon" src="../assets/img/visible.png" style="height: 16px; width: 24px; top: 18px;" />
					<el-input placeholder="项目描述" v-model="project.description" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item class="fake-label">
					<img class="icon" src="../assets/img/users-add.png" style="height: 24px; width: 23px; top: 13px;" />
					<div class="content">
						<InviteList :project="project" :members_project="members_project" />
					</div>
				</el-form-item>
				
				<!-- 
				<el-form-item style="margin-top: 50px;">
					<el-button class="btn-block" type="primary" @click="submitForm('project')">保存修改</el-button>
				</el-form-item>
				 -->
				
				<el-form-item style="margin: 50px 20px 0 20px; background-color: transparent;">
					<el-button class="btn-block" type="danger" @click="cancelForm('project')">退出项目</el-button>
				</el-form-item>
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'
import AppSocket from '@/appsocket.js'

import InviteList from './InviteListComponent.vue'

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
		var id_project = GetQueryString('id_project');
		
		return {
			webSocket: AppSocket.create({
				url: settings.api_socket_base_url,
				sendMsgsOnInit: [
					{
					    action: 'project_init',
					    content: {
					    	id_project: id_project
					    }
					}, {
					    action: 'member_project_fetchall',
					    content: {
					    	id_project: id_project
					    }
					}
				],
				msgProcessors: {
					project_init: function(ret){
						// 如果id_project无效，提示--->跳转
						thisObj.project = {
							id_project: ret.data.project.id_project, 
							name: ret.data.project.name, 
							description: ret.data.project.description
						};
					}, 
					project_save: function(ret){
						if(ret.code != '100'){
							thisObj.$message(ret.message);
							return false;
						}else{
							thisObj.$message('保存成功！');
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
				}
			}), 
			project: {
				id_project: id_project, 
				name: '', 
				description: ''
				/*
				partners: [
					{id_user: 0, nickname: '所有人'}, 
					{id_user: 1, nickname: '冷朝朝'}, 
					{id_user: 2, nickname: '吴晶晶'}, 
					{id_user: 3, nickname: '范冰冰'}
				], 
				partners_selected: []
				*/
			}, 
			members_project: [], 
			registerRule: {
				name: [
					{ required: true, message: '请输入项目名称', trigger: 'blur' },
					{ min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }, 
				], 
				description: [
					{ max: 1000, message: '长度 1000 个字符以内', trigger: 'blur' }, 
				]
				/* , 
				partners_selected: [
					{ required: true, message: '至少选择一个项目成员', trigger: 'change' },
				] */
			}
		}
	},
	components: {
		InviteList: InviteList
	}, 
	
	methods: {
		submitForm(project) {
			var thisObj = this;		
			this.$refs[project].validate(function(valid){
				if (valid) {
					thisObj.webSocket.send({
					    action: 'project_save',
					    content: thisObj[project]
					});
				}
			});
		}, 
		cancelForm(project) {
			
		}
	}
}
</script>

<style>
	body {
		background-color: #f2f2f2;
		padding: 0;
		margin: 0;
	}
	.el-main {
		padding: 0;
	}
	.el-form-item {
		margin-bottom: 12px;
		background-color: #fff;
		height: 52px;		
	}
	.el-form-item .el-input .el-input__inner {
		padding-left: 5px;
		border-radius: 0;
		border-width: 0;
		height: 52px;
	}		
	.el-form-item.fake-label {
		position: relative;
	}
	.el-form-item.fake-label .el-input .el-input__inner, .el-form-item.fake-label .content {
		padding-left: 50px;
		line-height: 52px;
	}	
	.el-form-item.fake-label .el-tag--info {
		background-color: #909399;
	}
	.el-form-item.fake-label .icon {
		position: absolute;
		top: 14px;
		left: 10px;
		width: 22px;
		height: 22px;
		z-index: 99;
	}	
	
	.btn-block {
		width: 100%;
	}
	a {
		text-decoration: none;
		color: #66f;
	}
</style>
