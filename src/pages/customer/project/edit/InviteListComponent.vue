<template lang="html">
	<div class="invite-component">
		<div style="display: none;" class="invitelist-page">
			<ul  class="member-list">
				<li>
					<div class="member-icon" style="background-color: #3C76D9; font-size: 20px;"><i class="el-icon-plus"></i></div>
					<InvitePanel :project="project" />
				</li>
				<li v-for="(member, k) in members_project">
					<div class="member-icon" :style="'background-color: ' + members_colors[k % members_colors.length]" show-overflow-tooltip>{{ member.nickname }}</div>
					<span style="font-size: 16px;">{{ member.nickname }}</span>
				</li>
			</ul>
		
		
			<el-button size="small" type="primary" @click="closeInviteList(project)" style="margin: 30px auto 20px auto; display: block; width: 80px;">返回</el-button>
		</div>
		
		<el-button type="text" @click="openInviteList(project)">项目成员</el-button>
	</div>
</template>

<script>
import jquery from 'jquery'
import $ from 'jquery'

import InvitePanel from './InvitePanelComponent.vue'

export default {
	name: 'InviteList',
	data: function(){
		return {
			members_colors: [
				'#FFAE00', '#FF8DBE', '#C430B4', '#FE4F4F'
			]
		}
	}, 
	props: {
		project: Object, 
		members_project: Array
	}, 
	components: {
		InvitePanel: InvitePanel
	}, 
	methods: {
		'openInviteList': function(project){
			$('.invitelist-page').show();
		}, 
		'closeInviteList': function(project){
			$('.invitelist-page').hide();
		}
	}
}
</script>

<style>
.invitelist-page {
	width: 100%;
	height: 100%;
	background-color: #fff;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 990;
	padding: 20px;
	box-sizing: border-box;
}
.member-list {
	padding: 0;
}
.member-list li {
	list-style: none;
	height: 40px;
	line-height: 40px;	
	margin-bottom: 10px;
}
.member-icon {
	color: #fff;
	width: 40px;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
	white-space:nowrap;
	text-align: center;
	border-radius: 50%;
	float: left;
	margin-right: 10px;
}
</style>
