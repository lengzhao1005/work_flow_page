<template>
	<el-container id="app">
		<el-main>
			<el-form :model="projectCreateForm" :rules="registerRule" ref="projectCreateForm" class="project-form">
				<el-form-item prop="name">
					<el-input placeholder="输入项目名称" v-model="projectCreateForm.name" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item prop="description">
					<el-input placeholder="项目描述" v-model="projectCreateForm.description" auto-complete="off" type="text"></el-input>
				</el-form-item>
				
				<!-- <el-form-item prop="partners_selected">
					<el-select v-model=projectCreateForm.partners_selected multiple class="project-users" placeholder="请选择项目成员">
						<el-option
							v-for="item in projectCreateForm.partners"
							:key="item.id_user"
							:label="item.nickname"
							:value="item.id_user">
						</el-option>
					</el-select>
				</el-form-item> -->
				
				<el-form-item style="margin-top: 50px;">
					<el-button class="btn-block" type="primary" @click="submitForm('projectCreateForm')">创建项目</el-button>
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
		
		return {
			webSocket: AppSocket.create({
				url: settings.api_socket_base_url,
				sendMsgsOnInit: [],
				msgProcessors: {
					project_save: function(ret){
						if(ret.code != '100'){
							thisObj.$message(ret.message);
							return false;
						}else{
							thisObj.projectCreateForm.id_project = ret.data.project.id_project;
							thisObj.$message({
								message: '创建成功！正在跳转',
								type: 'success', 
								onClose: function(){
									location.assign('/customer/home.html')
								}
							});
						}
					}
				}
			}), 
			projectCreateForm: {
				id_project: '', 
				name: '', 
				description: '', 
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
	
	methods: {
		submitForm(projectCreateForm) {
			var thisObj = this;		
			this.$refs[projectCreateForm].validate(function(valid){
				if (valid) {
					thisObj.webSocket.send({
					    action: 'project_save',
					    content: thisObj[projectCreateForm]
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
	}
	.project-users {
		width: 100%;
	}

	.el-select .el-tag {
		background-color: #54c992;
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
		border-width: 0 0 1px 0;
	}
</style>
