<template>
	<el-container id="app">
		<el-main>
			<el-form :model="registerForm" :rules="registerRule" ref="registerForm" class="login-form">
				<el-form-item prop="email">
					<el-input placeholder="您的邮箱" v-model="registerForm.email" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item prop="phone">
					<el-input placeholder="您的手机号" v-model="registerForm.phone" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input placeholder="输入密码" v-model="registerForm.password" auto-complete="off" type="password"></el-input>
				</el-form-item>
				<el-form-item prop="password_confirm">
					<el-input placeholder="确认密码" v-model="registerForm.password_confirm" auto-complete="off" type="password"></el-input>
				</el-form-item>
				<el-form-item prop="verifycode">
					<el-input placeholder="输入验证码" v-model="registerForm.verifycode" auto-complete="off" type="text"></el-input>
				</el-form-item>
				
				<el-form-item style="margin-top: 50px;">
					<el-button class="btn-block" type="primary" @click="submitForm('registerForm')">完成</el-button>
				</el-form-item>
				
				<p style="font-size: 14px; color: #939393; text-align: center;">
					已经有账号？
					<a href="/user/login.html">前往登陆</a>
				</p>
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'
import AppSocket from '@/appsocket.js'

export default {
	data() {
		var thisObj = this;
		
		var passwordConfirm = (rule, value, callback) => {
			if (this.registerForm.password_confirm !== this.registerForm.password) {
				callback(new Error('密码确认错误!'));
			} else {
				callback();
			}
		};

		var phoneValidate = (rule, value, callback) => {
			var reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
			if (!reg.test(this.registerForm.phone)) {
				callback(new Error('手机号格式错误!'));
			} else {
				callback();
			}
		};
		
		return {
			webSocket: AppSocket.create({
				url: settings.api_socket_base_url,
				sendMsgsOnInit: [
					
				],
				msgProcessors: {
					user_register: function(ret){
						if(ret.code != '100'){
							thisObj.$message(ret.message);
						}else{
							thisObj.$alert('前往登陆吧。', '注册成功', {
								confirmButtonText: '确定',
								callback: action => {
									location.assign('/user/login.html')
								}
							});
						}
					}
				}
			}), 
			registerForm: {
				email: '',
				phone: '',
				password: '',
				password_confirm: '',
				verifycode: ''
			}, 
			registerRule: {
				email: [
					{ type: 'email',  required: true, message: '请输入有效的邮箱', trigger: 'change' }
				], 
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'change' },
					{ validator: phoneValidate, trigger: 'change' }
				], 
				password: [
					{ required: true, message: '请输入密码', trigger: 'change' },
					{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'change' }, 
				], 
				password_confirm: [
					{ validator: passwordConfirm, trigger: 'blur' }
				], 
				verifycode: [
					{ required: true, message: '请输入验证码', trigger: 'change' },
					{ min: 5, max: 5, message: '长请输入5位数验证码', trigger: 'change' }
				]
			}
		}
	},
	
	methods: {
		submitForm(registerForm) {
			var thisObj = this;			
			this.$refs[registerForm].validate(function(valid){
				if (valid) {
					thisObj.webSocket.send({
					    action: 'user_register',
					    content: thisObj[registerForm]
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
</style>
