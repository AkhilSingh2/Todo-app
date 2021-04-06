<template>
<div class=" container">
     <h1>Task Tracker</h1>

         <div class="input-box-field">
             <input id="input-box" type="text" v-model="newTodoInput" @keyup.enter="addTodo" placeholder="What you wanna do today?">

         </div>
         <ul class="todos-list">
         <li class="todo-item" v-for="(task,index) in tasks" :key="task.id" :current_task="task">
             <input class="todo-content" type="checkbox" :value="task" v-model="marked">
             <p class="todo-content todo-item" :class="{ done: task.completed }">{{task.title}}</p>
             
             <router-link class="todo-content todo-item"  :to="{ name: 'EditTask', params: {
                 tasks:tasks,
                 id:task.id,
                 title:task.title
              }}">Edit</router-link>
            <div class="btns">
             <button v-if="!task.completed" class="todo-content todo-item complete" @click.self="completeTask(task)">Done</button>
             <button v-if="task.completed" class="todo-content todo-item complete" @click.self="completeTask(task)">Undone</button>
             
             <button class="todo-content del-todo todo-item" @click="removeTask(index)">Remove</button>
            </div>
         </li>
         </ul>
         <div class="action-buttons" v-if="tasks.length > 0">
             <button  @click.self="completeMarked()">Mark as Completed</button>
             <button  @click.self="clearMarked()">Clear Marked</button>
             <button  @click.self="clearCompleted()">Clear Completed</button>
             <button  @click="clearAll()">Clear All</button>
         </div>
         
</div>
 
</template>

<script>
import EditTask from "./EditTask.vue"
import AddTask from"./AddTask.vue"

export default {
    components:{
        "edit-task":EditTask,
        "add-task": AddTask

    },
    props: ['tasks'],

    data(){
        return {
            newTodoInput: '',
            marked: [],
            current_task: [],
            
        }
    },
    methods: {
        addTodo(newTodo) {
      this.$store.commit("addTodo", newTodo);
      this.newTodoInput = '';
      this.$emit("update-number", this.tasks);
    },
        removeTask(index) {
            this.tasks.splice(index, 1);
            this.$emit("update-number", this.tasks);

        },
        completeTask(task) {
            task.completed = ! task.completed;
            this.$emit("update-number", this.tasks);
        },
        clearAll() {
            this.tasks = [];
            console.log(this.current_task);
            this.$emit("update-number", this.tasks);
        },
        clearCompleted() {
            this.tasks = this.tasks.filter(this.inProgress);
            this.$emit("update-number", this.tasks);
        },
    
        inProgress(task) {
            return ! this.isCompleted(task);
        },
        isCompleted(task) {
            return task.completed;
        },
        clearMarked(){
            this.tasks = this.tasks.filter((el) => !this.marked.includes(el)) ;
            this.$emit("update-number", this.tasks);
        },
        completeMarked(){
            var task;
            for(task of this.tasks){
                if (this.marked.includes(task)){
                    task.completed = !task.completed;

                }
            };
            this.$emit("update-number", this.tasks);
        }

    },
    computed: {
        className() {
            let classes = ['tasks__item__toggle'];
            if (this.current_task.completed) {
                classes.push('tasks__item__toggle--completed');
                }
            return classes.join(' ');
        }
    }
}
</script>

<style >

#input-box{
    box-sizing: border-box;
    font-size: 30px;
    border: none;
    border-radius: 0;
    background: transparent;
    border-bottom: 1px solid lightblue;
    padding:12px;
    margin: 1rem auto;
    
    width: 100%;
}
li{
    display: flex;
    flex-direction: row;
    margin: 5px;
    /* padding: .5rem 1rem; */
    align-items: center;
    background-color: hsla(0,0%,100%,.1);
    text-align: left;
    padding-left: 5px;
    width: 100%;
    justify-content: space-between;
}
.tasks__item__toggle--completed{
    text-decoration: line-through;
    background-color: chartreuse;
}
.container{
  width: 80%;
  justify-content: space-between;
  margin: 0 auto;
}
.todos-list{
  list-style: none;
  text-align: left;
  align-items: center;
  justify-content: space-between;
}
.todo-item{
  padding: 10px;
  cursor: pointer;
}
.todo-content{
  font-size: 20px;
  /* line-height: 1.5; */
  transition: font-weight .5s ease-in-out;
}
  .todo-content:hover{
    font-weight: bold;
}

.del-todo{
	color: #ed8060;
	/* font-size: 14px; */
	/* float: right; */
    
}
	.del-todo:hover{
		color: #f84510;
		font-weight: normal;
}
.todos-status{
  display: flex;
  justify-content: space-around;
}
.done{
  text-decoration: line-through;
  color: #dadadc;
}
  .done:hover{
    font-weight: normal;
}
.btns {
    flex-direction: column;
}


</style>


        


