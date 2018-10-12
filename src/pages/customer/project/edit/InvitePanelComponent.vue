<template lang="html">
	<div class="invite-component">
		<div style="display: none;" class="invitepanel-page">
			<p style="text-align: center;">扫描二维码加入项目或分享链接邀请成员加入</p>
			
			<p style="text-align: center;">
				<qrcode-vue :value="invite_url" size="190" level="H"></qrcode-vue>
			</p>

			<div style="position: relative;">
				<el-input class="invite_url" placeholder="邀请链接" v-model="invite_url" readonly></el-input>		
				<el-button slot="append" type="primary" style="position: absolute; right: 0; height: 42px; border-radius: 10px;"
					v-clipboard:copy="invite_url"
					v-clipboard:success="onCopySuccess"
					v-clipboard:error="onCopyError">复制链接</el-button>
			</div>
		
			<el-button size="small" type="primary" @click="closeInvitePanel(project)" style="margin: 60px auto 20px auto; display: block; width: 80px;">返回</el-button>
		</div>
		
		<a href="javascript: {}" style="font-size: 17px;" @click="openInvitePanel(project)">邀请新成员</a>
	</div>
</template>

<script>
import Vue from 'vue'
import jquery from 'jquery'
import $ from 'jquery'
import QrcodeVue from 'qrcode.vue';
import VueClipboard from 'vue-clipboard2'
const settings = require('@/../settings.js')

Vue.use(VueClipboard)

export default {
	name: 'InvitePanel',
	data: function(){
		var thisObj = this;
		return {
			invite_url: settings.app_url + '/customer/project/join.html?id_project=' + thisObj.project.id_project
		}
	}, 
	props: {
		project: Object
	}, 
	components: {
		QrcodeVue
	}, 
	methods: {
		'openInvitePanel': function(project){
			$('.invitepanel-page').show();
		}, 
		'closeInvitePanel': function(project){
			$('.invitepanel-page').hide();
		}, 
		'onCopySuccess': function(){
			alert('复制成功');
		}, 
		'onCopyError': function(){
			alert('复制失败');
		}
	}
}
</script>

<style>
.invitepanel-page {
	width: 100%;
	height: 100%;
	background-color: #fff;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 991;
	padding: 20px;
	box-sizing: border-box;
}
.invite_url .el-input__inner{
	box-sizing: border-box;	
	padding: 5px 10px !important;
	border: solid 1px #ccc !important;
	border-radius: 10px !important;
	height: 42px !important;
	padding-right: 100px !important; 
}
</style>
