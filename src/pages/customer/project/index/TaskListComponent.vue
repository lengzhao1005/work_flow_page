<template lang="html">
	<div class="tasklist-app-component">
		<h5 class="sm-title">
			全部任务 · {{ dataSource.length }}
			<a :href="'/customer/task/create.html?id_project=' + project.id_project" class="link">添加任务</a>
		</h5>
		<el-table class="tasklist" ref="multipleTable" :data="dataSource" row-key="getRowKeys" tooltip-effect="dark" style="width: 100%" @selection-change="handleTaskListSelectionChange" @row-click="handleTaskListRowClick">
			<!-- <el-table-column type="selection" label="是否完成" width="30"></el-table-column> -->
			<el-table-column label="任务标题" prop="name" show-overflow-tooltip></el-table-column>
			<el-table-column label="任务内容" prop="content" show-overflow-tooltip></el-table-column>
			<el-table-column label="优先级" prop="priority" width="70">
				<template slot-scope="scope">
					<el-tag size="mini" :type="scope.row.priority.type">{{scope.row.priority.txt}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="布置人确定" prop="compeleted" width="60">
				<template slot-scope="scope">
					<el-checkbox v-if="scope.row.mine" v-model="scope.row.completed"></el-checkbox>
					<el-checkbox v-else="!scope.row.mine" disabled="disabled" v-model="scope.row.completed"></el-checkbox>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'TaskList',
	data: function(){
		return {
			getRowKeys(row) {
                return row.id_task;
            }
		}
	}, 
	props: {
		project: Object, 
		dataSource: Array, 
	}, 
	methods: {
		handleTaskListSelectionChange: function(){
			alert(11);
		}, 
		handleTaskListRowClick: function(row, event, column){
			location.assign('/customer/task/edit.html?id_task='+row.id_task)
		}
	}
}
</script>

<style>
.tasklist-app-component .sm-title {
	font-weight: normal;
	font-size: 12px;
	margin: 5px 10px;
}
.tasklist-app-component .link {
	color: #7b7b7b;
	float: right;
}
.tasklist-app-component h5 {
	font-weight: normal;	
	font-size: 12px;
	margin: 5px 10px;
}
.tasklist-app-component .tasklist {
	padding-top: 5px;
	margin-bottom: 20px;
}
.tasklist-app-component .tasklist th.is-leaf {
	border: none;
}
.tasklist-app-component .el-table::before {
	height: 0;
}
.tasklist-app-component .tasklist th{
	font-weight: normal;
	font-size: 8px;	
	text-align: center;
	padding: 2px 0;
}
.tasklist-app-component .tasklist td{
	font-weight: normal;
	font-size: 9px;
	text-align: center;	
	padding: 3px 0;
	border: none;
}
.tasklist-app-component .tasklist .cell{
	padding: 0;
}
</style>
