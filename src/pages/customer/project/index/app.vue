<template>
	<div id="app">
		<h2 class="project-title">
			{{ project.name }}
			<a :href="'/customer/project/edit.html?id_project=' + project.id_project">
				<img height="22" src="../assets/img/gear-icon.png" class="icon" />
			</a>
		</h2>
		
		<TaskList :dataSource="taskListDataSource" :project="project" />
	</div>
</template>

<script>
const settings = require('@/../settings.js')
import jquery from 'jquery'
import $ from 'jquery'
import AppSocket from '@/appsocket.js'

import TaskList from './TaskListComponent.vue'

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
		
		AppSocket.create({
			url: settings.api_socket_base_url,
			sendMsgsOnInit: [
				{
				    action: 'project_init',
				    content: {
				    	id_project: id_project
				    }
				}, {
				    action: 'tasklist_project_init',
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
						name: ret.data.project.name
					};
				}, 
				tasklist_project_init: function(ret){
				    console.log(ret);
					var taskListDataSource = [];
					$.each(ret.data.tasks, function(k, t){
						taskListDataSource.push({
							id_project: t.id_project, 
							id_task: t.id_task, 
							name: t.name, 
							content: t.content, 
							priority: {type: t.priority.type, txt: t.priority.txt}, 
							mine: t.mine, 
							completed: t.completed
						});
					});

					thisObj.taskListDataSource = taskListDataSource;
				}, 
				task_new: function(ret){
					console.log('task_new');
					thisObj.taskListDataSource.unshift(ret.data);
				},
                task_modify: function(ret){
                    console.log('task_modify');

                    console.log(ret);
                    $.each(thisObj.taskListDataSource, function(k, t){

                        if(ret.data.id_task == t.id_task){
                            // thisObj.taskListDataSource[k] = ret.data;
                            thisObj.taskListDataSource[k].id_project = ret.data.id_project;
							thisObj.taskListDataSource[k].id_task = ret.data.id_task;
							thisObj.taskListDataSource[k].name = ret.data.name;
							thisObj.taskListDataSource[k].content = ret.data.content;
							thisObj.taskListDataSource[k].priority = {type: ret.data.priority.type, txt: ret.data.priority.txt};
                            thisObj.taskListDataSource[k].mine = ret.datamine;
							thisObj.taskListDataSource[k].completed = ret.data.completed;
						}

                    });
                },
			}
		});
		
		return {
			project: {
				id_project: id_project, 
				name: ''
			}, 
			taskListDataSource: []
		}
	},
	components: {
		TaskList: TaskList
	}, 
	methods: {
		
	}
}
</script>


<style>
body {
	margin: 0;
	background-color: #f0f0ef;
}
.project-title {
	margin-top: 0;
	background-color: #fff;
	height: 40px;
	line-height: 40px;
	overflow: hidden;
	font-size: 17px;
	text-align: center;
	position: relative;
	font-weight: normal;
}
.project-title .icon{
	position: absolute;
	width: 22px;
	height: 22px;
	right: 10px;
	top: 9px;
}
</style>


