<template>
	<el-container id="app">
		<el-main>
			<el-form :model="loginForm" :rules="loginRule" ref="loginForm" class="login-form">
				<el-form-item prop="username">
					<el-input placeholder="输入工作邮箱或手机号" v-model="loginForm.username" auto-complete="off" type="text"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input placeholder="密码" v-model="loginForm.password" auto-complete="off" type="password"></el-input>
				</el-form-item>
				<el-form-item>
					<a href="/user/forgetpass">忘记密码？</a>
				</el-form-item>
				
				<el-form-item>
					<el-button class="btn-block" type="primary" @click="submitForm('loginForm')">提交</el-button>
				</el-form-item>
			</el-form>
		</el-main>
	</el-container>
</template>

<script>
export default {
	data() {
		return {
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
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				]
			}
		}
	},
	
	methods: {
		submitForm(loginForm) {
			location.assign('../index.html')
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
	.login-form .el-input input {
		border-radius: 0;
		border-width: 0 0 1px 0;
	}
</style>
