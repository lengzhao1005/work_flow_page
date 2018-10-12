<template lang="html">
	<div class="projectlist-app-component">
		<h5 class="sm-title">
			项目清单 · 3
			<a href="/customer/project/create.html" class="link">创建新项目</a>	
		</h5>
		<el-menu default-active="2" class="projectlist" @open="handleOpen" @close="handleClose">
			<el-menu-item index="2" v-for="project in dataSource">
				<a :href="'/customer/project/index.html?id_project=' + project.id_project">
					<span slot="title">{{ project.name }}</span> 
					<span v-if="project.mine" style="color: #909399;"> - <em>我的项目</em></span> 
					<i class="el-icon-arrow-right"></i>
				</a>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'

export default {
	name: 'ProjectList',
	data: function(){
		return {
			
		}
	}, 
	props: {
		dataSource: Array, 
	}, 
	methods: {
		handleOpen: function(){}, 
		handleClose: function(){}, 
	}
}
</script>

<style>
.projectlist-app-component .sm-title {
	font-weight: normal;
	font-size: 12px;
	margin: 5px 10px;
}
.projectlist-app-component .link {
	color: #7b7b7b;
	float: right;
}
.projectlist-app-component .projectlist.el-menu {
	border: none;	
	padding: 0;
	margin-bottom: 20px;
}
.projectlist-app-component .projectlist .el-menu-item i{
	font-size: 8px;
	line-height: 31px;	
	float: right;
	margin: 0 0 0 5px;
}
.projectlist-app-component .projectlist .el-menu-item {
	height: 31px;
	line-height: 32px;
	padding: 0 0 0 10px !important;
	border-bottom: solid 1px #eee;
	font-size: 11px;
	border-radius: 0;
	color: #303133;
}
.projectlist-app-component .projectlist .el-menu-item:last-child {
	border: none;
}
.projectlist-app-component .projectlist .el-menu-item.is-active {
	color: #303133;
	background-color: #fff;
}

.projectlist-app-component .projectlist .el-menu-item a{
	display: block;
}
.el-menu-item {
	border-radius: 0;
	background-color: #fff !important;
}

</style>
