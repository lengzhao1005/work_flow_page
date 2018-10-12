<template>
	<el-container id="app">
		<el-main>
			<el-row type="flex" justify="center">
				<img height="35" src="./assets/img/xingye-logo.png" style="margin: 15px 0 40px 0;" />
			</el-row>
		
			<el-form :model="loginForm" :rules="loginRule" ref="loginForm" class="login-form">
				<el-form-item prop="username">
					<el-input placeholder="输入工作邮箱或手机号" v-model="loginForm.username" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input placeholder="密码" v-model="loginForm.password" auto-complete="off" type="password"></el-input>
				</el-form-item>
				<el-form-item style="margin:-10px 0 10px 0;">
					<a class="forgetpass-btn" href="/user/forgetpass">忘记密码？</a>
				</el-form-item>
				<el-form-item>
					<el-button class="btn-block" type="primary" @click="submitForm('loginForm')">提交</el-button>
				</el-form-item>
				
				<p style="font-size: 14px; color: #939393; text-align: center;">
					还没有账号？
					<a href="/user/register.html">注册新账号</a>
				</p>
				
				<div style="margin-bottom: 30px;">
					<p class="with-line wx-logo">其他登陆方式</p>
					<el-row type="flex" justify="center">
						<p>
							<img width="50" height="50" src="./assets/img/wx-logo.png" />
						</p>
					</el-row>
				</div>
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'
import AppUser from '@/appuser.js'
import AppSocket from '@/appsocket.js'

export default {
	data() {
		var thisObj = this;
		
		return {
			webSocket: AppSocket.create({
				url: settings.api_socket_base_url,
				sendMsgsOnInit: [
					
				],
				msgProcessors: {
					user_login: function(ret){console.log(ret);
						if(ret.code != '100'){
							thisObj.$message(ret.message);
							return false;
						}
						AppUser.login({
							auth_token: ret.data.auth_token
						});
						location.assign('/customer/home.html')
					}
				}
			}), 
			loginForm: {
				username: '',
				password: ''
			}, 
			loginRule: {
				username: [
					{ required: true, message: '请输入工作邮箱或手机号', trigger: 'blur' },
					{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
				], 
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
				]
			}
		}
	},
	
	methods: {
		submitForm(loginForm) {
			var thisObj = this;			
			this.$refs[loginForm].validate(function(valid){
				if (valid) {
					thisObj.webSocket.send({
					    action: 'user_login',
					    content: thisObj[loginForm]
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
	.btn-block {
		width: 100%;
	}
	a {
		text-decoration: none;
		color: #66f;
	}
	.login-form .el-input input {
		border-radius: 0;
		border-width: 0 0 1px 0;
	}
	.forgetpass-btn {
		color: #939393;
		float: right;
	}
	
	.with-line.wx-logo {
		font-size: 14px;
		color: #444;
	}
	.with-line.wx-logo:before {
		width: 35%;
	}
	.with-line.wx-logo:after {
		width: 35%;
	}
</style>





















