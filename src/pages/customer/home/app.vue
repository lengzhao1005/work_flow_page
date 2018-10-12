<template>
	<div id="app">
		<TaskList :dataSource="taskListDataSource"/>
		<ProjectList :dataSource="projectListDataSource"/>
	</div>
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'
import AppSocket from '@/appsocket.js'

import TaskList from './TaskListComponent.vue'
import ProjectList from './ProjectListComponent.vue'

export default {
	data() {
		var thisObj = this;
		AppSocket.create({
			url: settings.api_socket_base_url,
			sendMsgsOnInit: [
				{
				    action: 'tasklist_init',
				    content: null
				}, {
				    action: 'projectlist_init',
				    content: null
				}
			],
			msgProcessors: {
				projectlist_init: function(ret){
					var projectListDataSource = [];
					$.each(ret.data.projects, function(k, p){
						projectListDataSource.push({
							id_project: p.id_project, 
							name: p.name, 
							mine: p.mine
						});
					});

					thisObj.projectListDataSource = projectListDataSource;
				}, 
				tasklist_init: function(ret){
					var taskListDataSource = [];
					$.each(ret.data.tasks, function(k, t){
						taskListDataSource.push({
							id_task: t.id_task, 
							name: t.name, 
							content: t.content, 
							priority: {type: t.priority.type, txt: t.priority.txt}, 
							project_name: t.project_name, 
							mine: t.mine, 
							completed: t.completed
						});
					});
					
					thisObj.taskListDataSource = taskListDataSource;
				}
			}
		});
		
		return {
			taskListDataSource: [], 
			projectListDataSource: [], 
		}
	},
	components: {
		TaskList: TaskList, 
		ProjectList: ProjectList
	}, 
	methods: {
		
	}
}
</script>


<style>
body {
	background-color: #f0f0ef;
}
</style>